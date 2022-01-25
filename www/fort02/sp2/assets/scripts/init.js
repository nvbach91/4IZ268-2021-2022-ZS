$(document).ready(function() {
    $('#email-body').summernote();
    $('#recipient').on('change', checkEmailExists);

    clientSetInternetStatus(window.navigator.onLine);
    window.addEventListener('online', () => clientSetInternetStatus(true));
    window.addEventListener('offline', () => clientSetInternetStatus(false));

    showUnsentEmails();
});