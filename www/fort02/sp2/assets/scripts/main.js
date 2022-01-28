const App = {
    internetConnectionOnline: true
}

function clientSetInternetStatus(online) {
    let lastStatus = App.internetConnectionOnline;
    App.internetConnectionOnline = online;

    let text = App.internetConnectionOnline ? 'Připojení k internetu je dostupné' : 'Připojení k internetu není dostupné';
    $('#connection-status').text(text)
    if (App.internetConnectionOnline == true) {
        $('#connection-status').removeClass('text-red');
        if (lastStatus == false && hasUnsentEmails()) {
            if (window.confirm('Připojení k internetu je opět k dispozici. Mám odeslat neodeslané e-maily?')) {
                sendAllUnsentEmails();
            }
        }
    } else {
        $('#connection-status').addClass('text-red');
    }
}