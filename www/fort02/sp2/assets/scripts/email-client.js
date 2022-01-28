// Google Gmail API init
var GoogleAuth;
var gmailScope = 'https://mail.google.com/';

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        'apiKey': '',
        'clientId': '',
        'scope': gmailScope
    }).then(function() {
        GoogleAuth = gapi.auth2.getAuthInstance();

        gapi.client.load('gmail', 'v1', function() {
            getExistingEmails();
        });

        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        setSigninStatus();

        $('#sign-in-or-out-button').click(function() {
            handleAuthClick();
        });
    });
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
        GoogleAuth.signOut();
        $('#existing-emails').empty();
    } else {
        GoogleAuth.signIn();
    }
    updateSigninStatus();
}

function setSigninStatus() {
    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(gmailScope);
    if (isAuthorized) {
        $('#sign-in-or-out-button').html('Odhlásit se');
        $('#email-status').text(user.getBasicProfile().nv)
        $('#email-status').removeClass('text-red');
    } else {
        $('#sign-in-or-out-button').html('Přihlásit se');
        $('#email-status').text('Žádný e-mail není připojený')
        $('#email-status').addClass('text-red');
    }
}

function updateSigninStatus() {
    setSigninStatus();
    getExistingEmails();
}



// Send email - use gmail or local storage
function sendMail(id, recipientEmail, subject, emailBody, inReplyTo, references) {
    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(gmailScope);
    if (App.internetConnectionOnline && isAuthorized) {
        let user = GoogleAuth.currentUser.get();

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
            removeFromStorage(id);
            showUnsentEmails();

            gapi.client.gmail.users.messages.modify({
                'userId': 'me',
                'id': res.id,
                'removeLabelIds': ['INBOX']
            }).execute(res => {
                alert('Email odeslaný');
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
        addToStorage(email);
    }
}



// Unsent emails in local storage
function addToStorage(email) {
    if (getFromStorage(email.id)) {
        removeFromStorage(email.id);
    }

    let existingUnsentEmails = window.localStorage.getItem('UnsentEmails');
    if (!existingUnsentEmails) {
        existingUnsentEmails = [];
    } else {
        existingUnsentEmails = JSON.parse(existingUnsentEmails);
    }
    existingUnsentEmails.push(email);
    window.localStorage.setItem('UnsentEmails', JSON.stringify(existingUnsentEmails));
}

function getFromStorage(id) {
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

function removeFromStorage(id) {
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

function hasUnsentEmails() {
    if (window.localStorage.getItem('UnsentEmails')) {
        let existingUnsentEmails = JSON.parse(window.localStorage.getItem('UnsentEmails'));
        if (existingUnsentEmails.length > 0) {
            return true;
        }
    }
    return false;
}

function showUnsentEmails() {
    $('#unsent-emails').empty();
    if (window.localStorage.getItem('UnsentEmails')) {
        let existingUnsentEmails = JSON.parse(window.localStorage.getItem('UnsentEmails'));

        if (existingUnsentEmails.length == 0) {
            $('#unsent-container').addClass('hidden');
        } else {
            $('#unsent-container').removeClass('hidden');
            for (let i in existingUnsentEmails) {
                $('#unsent-emails').prepend(`
                    <div id='unsent-${existingUnsentEmails[i].id}' class='unsent-email' onclick='loadUnsentEmail(${existingUnsentEmails[i].id});'>
                        <div class='unsent-email-text'>
                            <h4>Pro: ${existingUnsentEmails[i].recipientEmail}</h4>
                            <span>Předmět: ${existingUnsentEmails[i].subject}</span>
                        </div>
                        <span class='delete-unsent' onclick='removeUnsentEmail(${existingUnsentEmails[i].id});'>X</span>
                    </div>
                `)
            }
        }
    } else {
        $('#unsent-container').addClass('hidden');
    }
}

function loadUnsentEmail(id) {
    $('.new-email').removeClass('hidden');
    $('.read-email').addClass('hidden');
    $('.unsent-email').removeClass('active');
    $('.existing-email').removeClass('active');

    let email = getFromStorage(id);
    if (email) {
        $('#email-id').val(email.id);
        $('#email-in-reply-to').val(email.inReplyTo);
        $('#email-references').val(email.references);
        $('#recipient').val(email.recipientEmail);
        $('#subject').val(email.subject);
        $('#email-body').summernote('code', email.emailBody);
        $('#unsent-' + id).addClass('active');
    }
}

function sendAllUnsentEmails() {
    try {
        if (window.localStorage.getItem('UnsentEmails')) {
            let user = GoogleAuth.currentUser.get();
            let isAuthorized = user.hasGrantedScopes(gmailScope);
            if (isAuthorized) {
                let existingUnsentEmails = JSON.parse(window.localStorage.getItem('UnsentEmails'));
                for (let i in existingUnsentEmails) {
                    let mail = existingUnsentEmails[i];
                    sendMail(mail.id, mail.recipientEmail, mail.subject, mail.emailBody);
                }
            }
        }
    } catch {}
}

function removeUnsentEmail(id) {
    event.preventDefault();
    event.stopPropagation();

    if ($('#email-id').val() == id) {
        $('#email-id').val(new Date().getTime());
        $('#recipient').val('');
        $('#subject').val('');
        $('#email-body').summernote('code', '');
        $('.unsent-email').removeClass('active');
    }

    removeFromStorage(id);
    $('#unsent-' + id).remove();
    if ($('.unsent-email').length == 0) {
        showUnsentEmails();
    }
}



// Button clicks
$('#send-email').click(function() {
    if ($('#email-id').val() == '') {
        $('#email-id').val(new Date().getTime());
    }
    sendMail(
        $('#email-id').val(),
        $('#recipient').val(),
        $('#subject').val(),
        $('#email-body').summernote('code'),
        $('#email-in-reply-to').val(),
        $('#email-references').val()
    );

    $('#email-id').val('');
    $('#recipient').val('');
    $('#subject').val('');
    $('#email-body').summernote('code', '');
    $('#email-in-reply-to').val('');
    $('#email-references').val('');
    showUnsentEmails()
})

$('#new-email').click(function() {
    $('#email-id').val(new Date().getTime());
    $('#email-in-reply-to').val('');
    $('#email-references').val('');
    $('#recipient').val('');
    $('#subject').val('');
    $('#email-body').summernote('code', '');
    $('.unsent-email').removeClass('active');
    $('.existing-email').removeClass('active');
    $('.new-email').removeClass('hidden');
    $('.read-email').addClass('hidden');
})

$('#reply-email').click(function() {
    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(gmailScope);
    if (isAuthorized) {
        $('.new-email').removeClass('hidden');
        $('.read-email').addClass('hidden');
        gapi.client.gmail.users.messages.get({
            'userId': 'me',
            'id': $('#read-email-id').val()
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

            $('#email-id').val(new Date().getTime());
            $('#email-in-reply-to').val(inReplyTo);
            $('#email-references').val(references);
            $('#recipient').val(from);
            $('#subject').val(subject);
            $('#email-body').summernote('code', '');
        });
    }
})



// Google Gmail Inbox
function getExistingEmails() {
    $('#existing-emails').empty();

    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(gmailScope);
    if (isAuthorized) {
        gapi.client.gmail.users.messages.list({
            'userId': 'me',
            'maxResults': 10,
            'labelIds': ['INBOX']
        }).execute(res => {
            for (let i in res.messages) {
                user = GoogleAuth.currentUser.get();
                isAuthorized = user.hasGrantedScopes(gmailScope);
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

                        $('#existing-emails').append(`
                    <div id='existing-${resExisting.id}' class='existing-email' onclick='readEmail("${resExisting.id}");'>
                        <h4>Od: ${from}</h4>
                        <span>${subject}</span>
                    </div>
                `)
                    });
                }
            }
        });
    }
}

function readEmail(id) {
    $('.new-email').addClass('hidden');
    $('.read-email').removeClass('hidden');
    $('.unsent-email').removeClass('active');
    $('.existing-email').removeClass('active');
    $('#existing-' + id).addClass('active');

    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(gmailScope);
    if (isAuthorized) {
        $('#read-email-id').val('');
        $('#read-from').val('');
        $('#read-subject').val('');
        $('#read-body').html('');

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

            $('#read-email-id').val(id);
            $('#read-from').val(from);
            $('#read-subject').val(subject);
            $('#read-body').html(b64DecodeUnicode(data.replace(/-/g, '+').replace(/_/g, '/')));
        });
    } else {
        $('#existing-emails').empty();
    }
}

// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}