function checkEmailExists() {
    $('#checking-recipient').removeClass('hidden');
    $('#recipient-ok').addClass('hidden');
    $('#recipient-not-found').addClass('hidden');
    $.ajax({
        type: 'GET',
        url: "https://app.verify-email.org/api/v1/l9QsFaDjhHfja8rtwnuHaZtps2ni1sYSWrDBUDG5lopd2X5QLA/verify/" + $('#recipient').val(),
        success: function(result) {
            if (result['status_description'] == 'OK email') {
                $('#checking-recipient').addClass('hidden');
                $('#recipient-ok').removeClass('hidden');
            } else {
                $('#checking-recipient').addClass('hidden');
                $('#recipient-not-found').removeClass('hidden');
            }
        },
        error: function() {
            $('#checking-recipient').addClass('hidden');
            $('#recipient-not-found').removeClass('hidden');
        }
    })
}