<template>
  <section
    id="donate"
    class="section-donate"
  >
    <div class="container">
      <div class="donate">
        <div class="donate__content">
          <h2>Chcete nás podpořit?</h2>
          <div class="paragraphs">
            <p>
              Baví Vás náš podcast a chcete nás podpořit?
            </p>
            <p>
              Můžete tak udělat na <a
                class="link"
                href="https://herohero.co/algormortis"
              >HeroHero</a>, kde coby
              poděkování najdete naše bonusové epizody, komentáře a další obsah.
            </p>
            <p>
              Můžete nás podpořit i jednorázově na <a
                class="link"
                href="http://paypal.me/algormortis"
              >PayPal</a>.
            </p>
            <p>
              Pokud nás nechcete, nebo nemůžete podpořit finančně, sdílejte nás!
              <br>Za veškerou podporu moc děkujeme.
            </p>
          </div>
        </div>
        <div class="donate__buttons">
          <a
            class="btn btn--lg"
            href="https://herohero.co/algormortis"
            target="_blank"
          >HeroHero</a>
          <a
            class="btn btn--lg"
            href="http://paypal.me/algormortis"
            target="_blank"
          >PayPal</a>
        </div>
      </div>
    </div>
  </section>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <div class="footer__contact">
          <div class="social-media">
            <a
              href="https://www.facebook.com/algor.mortis.podcast"
              title="Facebook"
              target="_blank"
            >
              <i class="fab fa-facebook" />
            </a>
            <a
              href="https://www.instagram.com/algor.mortis.podcast"
              title="Instagram"
              target="_blank"
            >
              <i class="fab fa-instagram" />
            </a>
            <a
              href="https://open.spotify.com/show/2dZHHCnymSIyPqCa0bPPXt?si=6c629a30a3224723"
              title="Spotify"
              target="_blank"
            >
              <i class="fab fa-spotify" />
            </a>
            <a
              href="https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS82ODY0ODkucnNz"
              title="Google"
              target="_blank"
            >
              <i class="fab fa-google" />
            </a>
            <a
              href="https://podcasts.apple.com/us/podcast/algor-mortis/id1485571173"
              title="Apple"
              target="_blank"
            >
              <i class="fab fa-apple" />
            </a>
          </div>
          <a
            class="email-link"
            href="mailto:algormortis.podcast@gmail.com"
          >
            <i class="fas fa-envelope" />
            <span>algormortis.podcast@gmail.com</span>
          </a>
        </div>
        <div>
          <p class="footer__copyright">
            © 2021 <router-link
              :to="{name: 'home'}"
              class="underline"
              title="Algor Mortis"
            >
              Algor Mortis
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
