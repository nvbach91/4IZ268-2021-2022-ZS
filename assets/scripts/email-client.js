$(document).ready(function() {
    App.unsentEmails = $('#unsent-emails');
    App.existingEmails = $('#existing-emails');
    App.emailStatus = $('#email-status');
    App.signInOutButton = $('#sign-in-or-out-button');
    App.unsentContainer = $('#unsent-container');
    App.newEmailContainer = $('.new-email');
    App.readEmailContainer = $('.read-email');

    App.emailId = $('#email-id');
    App.emailInReplyTo = $('#email-in-reply-to');
    App.emailReferences = $('#email-references');
    App.emailSubject = $('#subject');

    App.readEmailId = $('#read-email-id');
    App.readFrom = $('#read-from');
    App.readSubject = $('#read-subject');
    App.readBody = $('#read-body');

    // Google Gmail API init
    App.initClient = function() {
        gapi.client.init({
            'apiKey': '',
            'clientId': '',
            'scope': App.gmailScope
        }).then(function() {
            App.googleAuth = gapi.auth2.getAuthInstance();

            gapi.client.load('gmail', 'v1', function() {
                App.getExistingEmails();
            });

            App.googleAuth.isSignedIn.listen(updateSigninStatus);

            App.setSigninStatus();

            App.signInOutButton.click(function() {
                App.handleAuthClick();
            });
        });
    }

    App.handleAuthClick = function() {
        if (App.googleAuth.isSignedIn.get()) {
            App.googleAuth.signOut();
            App.existingEmails.empty();
            App.newEmailContainer.addClass('hidden');
            App.readEmailContainer.addClass('hidden');
        } else {
            App.googleAuth.signIn();
        }
        updateSigninStatus();
    }

    App.setSigninStatus = function() {
        let user = App.googleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(App.gmailScope);
        if (isAuthorized) {
            App.signInOutButton.html('Odhlásit se');
            App.emailStatus.text(user.getBasicProfile().zv);
            App.emailStatus.removeClass('text-red');
        } else {
            App.signInOutButton.html('Přihlásit se');
            App.emailStatus.text('Žádný e-mail není připojený');
            App.emailStatus.addClass('text-red');
        }
    }

    function updateSigninStatus() {
        App.setSigninStatus();
        App.getExistingEmails();
    }



    // Send email - use gmail or local storage
    App.sendMail = function(id, recipientEmail, subject, emailBody, inReplyTo, references) {
        let user = App.googleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(App.gmailScope);
        if (App.internetConnectionOnline && isAuthorized) {
            let user = App.googleAuth.currentUser.get();

            let to = 'To: ' + recipientEmail;
            let from = 'From: ' + user.getBasicProfile().nv;
            let subjectFormatted = 'Subject: ' + subject;
            let inReplyToFormatted = 'In-Reply-To: ' + inReplyTo;
            let referencesFormatted = 'References: ' + references;
            let contentType = 'Content-Type: text/html; charset=utf-8';
            let mime = 'MIME-Version: 1.0';

            let message = '';
            message += to + '\r\n';
            message += from + '\r\n';
            message += subjectFormatted + '\r\n';
            message += inReplyToFormatted + '\r\n';
            message += referencesFormatted + '\r\n';
            message += contentType + '\r\n';
            message += mime + '\r\n';
            message += '\r\n' + emailBody;
            let base64EncodedEmail = btoa(unescape(encodeURIComponent(message))).replace(/\+/g, '-').replace(/\//g, '_');

            gapi.client.gmail.users.messages.send({
                'userId': 'me',
                'resource': {
                    'raw': base64EncodedEmail
                }
            }).execute(res => {
                App.removeFromStorage(id);
                App.showUnsentEmails();

                gapi.client.gmail.users.messages.modify({
                    'userId': 'me',
                    'id': res.id,
                    'removeLabelIds': ['INBOX']
                }).execute(res => {
                    Swal.fire(
                        'Odesláno!',
                        'E-mail byl úspěšně odeslaný',
                        'success'
                    )
                });
            });
        } else {
            let email = {
                'id': id,
                'inReplyTo': inReplyTo,
                'references': references,
                'recipientEmail': recipientEmail,
                'subject': subject,
                'emailBody': emailBody
            }
            App.addToStorage(email);
        }
    }



    // Unsent emails in local storage
    App.addToStorage = function(email) {
        if (App.getFromStorage(email.id)) {
            App.removeFromStorage(email.id);
        }

        let existingUnsentEmails = window.localStorage.getItem('UnsentEmails');
        if (!existingUnsentEmails) {
            existingUnsentEmails = [];
        } else {
            existingUnsentEmails = JSON.parse(existingUnsentEmails);
        }
        existingUnsentEmails.push(email);
        window.localStorage.setItem('UnsentEmails', JSON.stringify(existingUnsentEmails));

        Swal.fire(
            'Uloženo na později',
            'E-mail byl uložen jako neodeslaný. Připojte se k internetu a přihlašte se ke svému gmailu.',
            'success'
        )
    }

    App.getFromStorage = function(id) {
        if (window.localStorage.getItem('UnsentEmails')) {
            let existingUnsentEmails = JSON.parse(window.localStorage.getItem('UnsentEmails'));
            for (let i in existingUnsentEmails) {
                if (existingUnsentEmails[i].id == id) {
                    return existingUnsentEmails[i];
                }
            }
        }
        return null;
    }

    App.removeFromStorage = function(id) {
        if (window.localStorage.getItem('UnsentEmails')) {
            let existingUnsentEmails = JSON.parse(window.localStorage.getItem('UnsentEmails'));
            for (let i in existingUnsentEmails) {
                if (existingUnsentEmails[i].id == id) {
                    existingUnsentEmails.splice(i, 1);
                    window.localStorage.setItem('UnsentEmails', JSON.stringify(existingUnsentEmails))
                }
            }
        }
        return 'Email nenalezen';
    }

    App.hasUnsentEmails = function() {
        if (window.localStorage.getItem('UnsentEmails')) {
            let existingUnsentEmails = JSON.parse(window.localStorage.getItem('UnsentEmails'));
            if (existingUnsentEmails.length > 0) {
                return true;
            }
        }
        return false;
    }

    App.showUnsentEmails = function() {
        App.unsentEmails.empty();
        if (window.localStorage.getItem('UnsentEmails')) {
            let existingUnsentEmails = JSON.parse(window.localStorage.getItem('UnsentEmails'));

            if (existingUnsentEmails.length == 0) {
                App.unsentContainer.addClass('hidden');
            } else {
                App.unsentContainer.removeClass('hidden');
                let unsentEmailsToAdd = [];
                for (let i in existingUnsentEmails) {
                    let unsentEmailEl = $(`
            <div id='${existingUnsentEmails[i].id}' class='unsent-email'>
                <div class='unsent-email-text'>
                    <h4>Pro: ${existingUnsentEmails[i].recipientEmail}</h4>
                    <span>Předmět: ${existingUnsentEmails[i].subject}</span>
                </div>
                <span id='${existingUnsentEmails[i].id}' class='delete-unsent'>X</span>
            </div>
        `);

                    unsentEmailEl.click(App.loadUnsentEmail);
                    unsentEmailEl.find('.delete-unsent').click(App.removeUnsentEmail);

                    unsentEmailsToAdd.push(unsentEmailEl);
                }

                App.unsentEmails.append(unsentEmailsToAdd);
            }
        } else {
            App.unsentContainer.addClass('hidden');
        }
    }

    App.loadUnsentEmail = function() {
        App.newEmailContainer.removeClass('hidden');
        App.readEmailContainer.addClass('hidden');
        $('.unsent-email').removeClass('active');
        $('.existing-email').removeClass('active');

        let id = $(this).attr('id');

        let email = App.getFromStorage(id);
        if (email) {
            App.emailId.val(email.id);
            App.emailInReplyTo.val(email.inReplyTo);
            App.emailReferences.val(email.references);
            App.emailRecipient.val(email.recipientEmail);
            App.emailSubject.val(email.subject);
            App.emailBody.summernote('code', email.emailBody);
            $('#' + id).addClass('active');
        }
    }

    App.sendAllUnsentEmails = function() {
        try {
            if (window.localStorage.getItem('UnsentEmails')) {
                let user = App.googleAuth.currentUser.get();
                let isAuthorized = user.hasGrantedScopes(App.gmailScope);
                if (isAuthorized) {
                    let existingUnsentEmails = JSON.parse(window.localStorage.getItem('UnsentEmails'));
                    for (let i in existingUnsentEmails) {
                        let mail = existingUnsentEmails[i];
                        App.sendMail(mail.id, mail.recipientEmail, mail.subject, mail.emailBody);
                    }
                }
            }
        } catch {}
    }

    App.removeUnsentEmail = function() {
        event.preventDefault();
        event.stopPropagation();

        let id = $(this).attr('id');

        if (App.emailId.val() == id) {
            App.emailId.val(new Date().getTime());
            App.emailRecipient.val('');
            App.emailSubject.val('');
            App.emailBody.summernote('code', '');
            $('.unsent-email').removeClass('active');
        }

        App.removeFromStorage(id);
        $('#' + id).remove();
        if ($('.unsent-email').length == 0) {
            App.showUnsentEmails();
        }
    }



    // Button clicks
    $('#send-email').click(function() {
        if (App.emailId.val() == '') {
            App.emailId.val(new Date().getTime());
        }
        App.sendMail(
            App.emailId.val(),
            App.emailRecipient.val(),
            App.emailSubject.val(),
            App.emailBody.summernote('code'),
            App.emailInReplyTo.val(),
            App.emailReferences.val()
        );

        App.emailId.val('');
        App.emailRecipient.val('');
        App.emailSubject.val('');
        App.emailBody.summernote('code', '');
        App.emailInReplyTo.val('');
        App.emailReferences.val('');
        App.showUnsentEmails()
    })

    $('#new-email').click(function() {
        App.emailId.val(new Date().getTime());
        App.emailInReplyTo.val('');
        App.emailReferences.val('');
        App.emailRecipient.val('');
        App.emailSubject.val('');
        App.emailBody.summernote('code', '');
        $('.unsent-email').removeClass('active');
        $('.existing-email').removeClass('active');
        App.newEmailContainer.removeClass('hidden');
        App.readEmailContainer.addClass('hidden');
    })

    $('#reply-email').click(function() {
        let user = App.googleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(App.gmailScope);
        if (isAuthorized) {
            App.newEmailContainer.removeClass('hidden');
            App.readEmailContainer.addClass('hidden');
            gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': App.readEmailId.val()
            }).execute(resExisting => {
                let from = '',
                    subject = '',
                    inReplyTo = '',
                    references = '';

                for (let k in resExisting.payload.headers) {
                    if (resExisting.payload.headers[k].name == 'From') {
                        from = resExisting.payload.headers[k].value;
                    }
                    if (resExisting.payload.headers[k].name == 'Subject') {
                        subject = resExisting.payload.headers[k].value;
                    }
                    if (resExisting.payload.headers[k].name == 'References') {
                        references = resExisting.payload.headers[k].value;
                    }
                    if (resExisting.payload.headers[k].name == 'In-Reply-To') {
                        inReplyTo = resExisting.payload.headers[k].value;
                    }
                }

                App.emailId.val(new Date().getTime());
                App.emailInReplyTo.val(inReplyTo);
                App.emailReferences.val(references);
                App.emailRecipient.val(from);
                App.emailSubject.val(subject);
                App.emailBody.summernote('code', `<br><br><br><hr><br>` + App.readBody.html());
            });
        }
    })



    // Google Gmail Inbox
    App.getExistingEmails = function() {
        App.existingEmails.empty();

        let user = App.googleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(App.gmailScope);
        if (isAuthorized) {
            gapi.client.gmail.users.messages.list({
                'userId': 'me',
                'maxResults': 10,
                'labelIds': ['INBOX']
            }).execute(res => {
                for (let i in res.messages) {
                    user = App.googleAuth.currentUser.get();
                    isAuthorized = user.hasGrantedScopes(App.gmailScope);
                    if (isAuthorized) {
                        gapi.client.gmail.users.messages.get({
                            'userId': 'me',
                            'id': res.messages[i].id
                        }).execute(resExisting => {
                            let from = '',
                                subject = '';

                            for (let k in resExisting.payload.headers) {
                                if (resExisting.payload.headers[k].name == 'From') {
                                    from = resExisting.payload.headers[k].value;
                                }
                                if (resExisting.payload.headers[k].name == 'Subject') {
                                    subject = resExisting.payload.headers[k].value;
                                }
                            }

                            let existingEmailEl = $(`
                    <div id='${resExisting.id}' class='existing-email'>
                        <h4>Od: ${from}</h4>
                        <span>${subject}</span>
                    </div>
                `);

                            existingEmailEl.click(App.readEmail);

                            App.existingEmails.append(existingEmailEl);
                        });
                    }
                }
            });
        }
    }

    App.readEmail = function() {
        let id = $(this).attr('id');

        App.newEmailContainer.addClass('hidden');
        App.readEmailContainer.removeClass('hidden');
        $('.unsent-email').removeClass('active');
        $('.existing-email').removeClass('active');
        $('#' + id).addClass('active');

        let user = App.googleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(App.gmailScope);
        if (isAuthorized) {
            App.readEmailId.val('');
            App.readFrom.val('');
            App.readSubject.val('');
            App.readBody.html('');

            gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': id
            }).execute(resExisting => {
                let from = '',
                    subject = '';

                for (let k in resExisting.payload.headers) {
                    if (resExisting.payload.headers[k].name == 'From') {
                        from = resExisting.payload.headers[k].value;
                    }
                    if (resExisting.payload.headers[k].name == 'Subject') {
                        subject = resExisting.payload.headers[k].value;
                    }
                }

                if (resExisting.payload.body != null && typeof(resExisting.payload.body.data) !== 'undefined') {
                    data = resExisting.payload.body.data;
                } else {
                    for (let k in resExisting.payload.parts) {
                        if (resExisting.payload.parts[k].mimeType == 'text/html') {
                            data = resExisting.payload.parts[k].body.data;
                        }
                    }
                    if (data == '') {
                        for (let k in resExisting.payload.parts) {
                            if (resExisting.payload.parts[k].mimeType == 'text/plain') {
                                data = resExisting.payload.parts[k].body.data;
                            }
                        }
                    }
                }

                App.readEmailId.val(id);
                App.readFrom.val(from);
                App.readSubject.val(subject);
                App.readBody.html(App.b64DecodeUnicode(data.replace(/-/g, '+').replace(/_/g, '/')));
            });
        } else {
            App.existingEmails.empty();
        }
    }

    // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
    App.b64DecodeUnicode = function(str) {
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    gapi.load('client:auth2', App.initClient);
    App.showUnsentEmails();
})