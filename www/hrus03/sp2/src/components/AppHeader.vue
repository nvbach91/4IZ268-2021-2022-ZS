<template>
  <header>
    <div class="header-wrapper">
      <div class="header">
        <div class="container">
          <div class="header__content">
            <router-link
              :to="{name: 'home'}"
              class="header__logo"
              title="Algor Mortis"
            >
              <img
                class="logo"
                src="/images/logo.png"
                alt="Algor Mortis"
              >
            </router-link>
            <nav class="navbar">
              <nav class="navbar">
                <router-link :to="{name: 'episodes'}">
                  Epizody podcastu
                </router-link>
                <a href="about-podcast.html">O podcastu</a>
                <a href="about-us.html">O nás</a>
                <a href="recommended/podcasts.html">Doporučujeme</a>
                <a
                  href="#donate"
                  class="btn header__donate"
                >Podpořit</a>
              </nav>
            </nav>
            <a
              href="#donate"
              class="btn header__donate"
            >Podpořit</a>
            <button class="burger">
              <span />
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
