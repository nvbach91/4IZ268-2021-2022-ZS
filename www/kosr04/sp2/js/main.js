(function () {
    // Vytvoření audio-contextového containeru
    var audioCtx = new (AudioContext || webkitAudioContext)();
    // Audio se musí povolit uživatelem
    document.querySelector('button').addEventListener('click', function (event) {
        audioCtx.resume().then(() => {
            event.target.innerText = "Sound enabled";
            console.log('Playback resumed successfully');
        });
    });
    // Deklarace tónů s korespondujícími kódy kláves, jejich frekvence je v Hertz, doplněn mapping na klávesy z důvodu lepšího debugování kodu do budoucna.
    var notesByKeyCode = {
        65: { noteName: 'c4', frequency: 261.6, keyName: 'a' },
        83: { noteName: 'd4', frequency: 293.7, keyName: 's' },
        68: { noteName: 'e4', frequency: 329.6, keyName: 'd' },
        70: { noteName: 'f4', frequency: 349.2, keyName: 'f' },
        71: { noteName: 'g4', frequency: 392, keyName: 'g' },
        72: { noteName: 'a4', frequency: 440, keyName: 'h' },
        74: { noteName: 'b4', frequency: 493.9, keyName: 'j' },
        75: { noteName: 'c5', frequency: 523.3, keyName: 'k' },
    };
    function Key(keyCode, noteName, keyName, frequency) {
        var keyHTML = document.createElement('div');
        var keySound = new Sound(frequency, 'sine');
    };
    });