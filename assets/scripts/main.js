App.clientSetInternetStatus = function() {
    let lastStatus = App.internetConnectionOnline;
    App.internetConnectionOnline = Offline.state == 'up';

    let text = App.internetConnectionOnline ? 'Připojení k internetu je dostupné' : 'Připojení k internetu není dostupné';
    App.connectionStatus.text(text)
    if (App.internetConnectionOnline == true) {
        App.connectionStatus.removeClass('text-red');
        if (lastStatus == false && App.hasUnsentEmails()) {
            Swal.fire({
                title: 'Připojení k internetu je opět k dispozici. Mám odeslat neodeslané e-maily?',
                showCancelButton: true,
                confirmButtonText: 'Odelsat vše',
                cancelButtonText: 'Neodesílat',
            }).then((result) => {
                if (result.isConfirmed) {
                    App.sendAllUnsentEmails();
                }
            })
        }
    } else {
        App.connectionStatus.addClass('text-red');
    }
}