const EmailSender = {
    host: "smtp.sendgrid.net",
    userName: "apikey",
    apiKey: "",
    from: "matj27@vse.cz",
    subject: "Počasí v lokalitě",
    lastRecipient: ''
};

/**
 * Prepares email form and handles email form submitting
 */
EmailSender.init = () => {
    if (!App.weatherDivRendered) {
        return;
    }

    App.renderEmailForm();

    EmailSender.emailForm = $('#email-form');
    EmailSender.emailInput = $('input[name="email"]');

    if (EmailSender.lastRecipient !== '') {
        EmailSender.emailInput.val(EmailSender.lastRecipient);
    }

    EmailSender.emailForm.submit((e) => {
        e.preventDefault();

        EmailSender.sendMail(EmailSender.prepareEmailBodyHtml());
    });
}

/**
 * Prepares html of an email form to be rendered onto screen
 * @returns {string} html code of an email form
 */
EmailSender.prepareEmailFormHtml = () => {
    const html = `
        <div class="panel-name">
            <h1 class="email-header">E-mail</h1>
        </div>
        <form id="email-form">
            <label>
                <input id="email-input"
                    name="email"
                    placeholder="Zadejte e-mailovou adresu"/>
            </label>
            <button>Odeslat</button>
        </form>
    `;

    return html;
}

/**
 * Method sends a prepared email
 * @param html code of an email to be sent
 */
EmailSender.sendMail = (html) => {
    if (html === 'ERR') {
        alert('Chyba pri generovani tela zpravy!');
    }

    const recipients = EmailSender.emailInput.val().split(",").map(recipient => recipient.trim());
    const recipientsString = recipients.toString();

    EmailSender.lastRecipient = recipientsString;

    // SmtpJS method
    Email.send({
        Host: EmailSender.host,
        Username: EmailSender.userName,
        Password: EmailSender.apiKey,
        To: recipientsString,
        From: EmailSender.from,
        Subject: EmailSender.subject,
        Body: html
    }).then((message) => {
            if (message === 'OK') {
                alert('E-mail byl odeslán na adresu/y: ' + recipientsString + '. Pokud e-mail nepřišel, zkontrolujte SPAM složku.');
            } else {
                alert(message);
            }
        }
    );
};

/**
 * Method prepares an html code of an email message to be send as an app notification
 * @returns {string} html code of an email to be sent
 */
EmailSender.prepareEmailBodyHtml = () => {
    let tempUnit = '';
    let windUnit = '';

    switch (App.weatherUnits) {
        case 'metric':
            tempUnit = '°C';
            windUnit = 'm/s';
            break;
        case 'imperial':
            tempUnit = '°F';
            windUnit = 'mph'
            break;
        case 'standard':
            tempUnit = 'K';
            windUnit = 'm/s';
            break;
        default:
            return '';
    }

    const weatherJson = OpenWeather.weather;

    const html = `
        <html lang="cs">
        <head>
            <style>
                * { font-family: sans-serif; }
            </style>
            <title>Počasí v lokalitě</title>
        </head>
        <body>
            <h1>Ahoj,</h1>
            <p>
                vyžádal sis zaslání infomrací o počasí ve zvolené lokalitě. Tady jsou:
            </p>
            <p>
                Lokalita: <strong>${weatherJson.name}</strong>
            </p>
            <p>
                Zeměpisná šířka: ${weatherJson.coord.lat}°<br>
                Zeměpisná délka: ${weatherJson.coord.lon}°
            </p>
            <p>
                V této lokalitě je <strong>${weatherJson.weather[0].description}</strong>.<br>
                Teplota je <strong>${weatherJson.main.temp} ${tempUnit}</strong>, a pocitově je <strong>${weatherJson.main.temp} ${tempUnit}</strong>.<br>
                Fouká vítr o rychlosti <strong>${weatherJson.wind.speed} ${windUnit} ze směru ${weatherJson.wind.deg}°</strong>.<br>
                Atmosferický tlak je <strong>${weatherJson.main.pressure} hPa</strong> a vlhkost vzduchu dosahuje <strong>${weatherJson.main.humidity} %</strong>.
            </p>
            <p>
                Tak se vhodně obleč!
            </p>
            <p>
                Zdraví tě Jirka Matějka, vývojář aplikace.
            </p>
        </body>
        </html>
    `;

    return html;
}
