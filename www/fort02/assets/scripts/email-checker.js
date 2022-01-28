App.checkEmailExists = function() {
    App.checkingRecipient.removeClass('hidden');
    App.recipientOk.addClass('hidden');
    App.recipientNotFound.addClass('hidden');

    $.ajax({
        type: 'GET',
        url: 'https://app.verify-email.org/api/v1/l9QsFaDjhHfja8rtwnuHaZtps2ni1sYSWrDBUDG5lopd2X5QLA/verify/' + App.recipient.val(),
        success: function(result) {
            if (result['status_description'] == 'OK email') {
                App.checkingRecipient.addClass('hidden');
                App.recipientOk.removeClass('hidden');
            } else {
                App.checkingRecipient.addClass('hidden');
                App.recipientNotFound.removeClass('hidden');
            }
        },
        error: function() {
            App.checkingRecipient.addClass('hidden');
            App.recipientNotFound.removeClass('hidden');
        }
    })
}