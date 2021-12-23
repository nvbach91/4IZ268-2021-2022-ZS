const EmailSender = {};

EmailSender.sendMail = (recipients) => {
    if ($.isArray(recipients)) {

    } else {

    }
};

EmailSender.init = () => {
    if (!App.weatherDivRendered) {
        return;
    }

    App.renderEmailForm();

    EmailSender.emailForm = $('#email-form');
    EmailSender.emailInput = $('input[name="email"]');

    EmailSender.emailForm.submit((e) => {
        e.preventDefault();

        EmailSender.sendMail()

        EmailSender.emailInput.val('');
    });
}

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
