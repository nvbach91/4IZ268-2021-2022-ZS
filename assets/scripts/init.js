const App = {
    internetConnectionOnline: true,
    gmailScope: 'https://mail.google.com/'
}

$(document).ready(function() {
    App.emailRecipient = $('#recipient');
    App.emailBody = $('#email-body');

    App.emailBody.summernote();
    App.emailRecipient.on('change', App.checkEmailExists);

    Offline.options = { checks: { xhr: { url: 'assets/scripts/init.js' } } };
    Offline.check();

    App.connectionStatus = $('#connection-status');

    App.checkingRecipient = $('#checking-recipient');
    App.recipientOk = $('#recipient-ok');
    App.recipientNotFound = $('#recipient-not-found');
    App.recipient = $('#recipient');

    App.clientSetInternetStatus();
    Offline.on('up', App.clientSetInternetStatus);
    Offline.on('down', App.clientSetInternetStatus);
});