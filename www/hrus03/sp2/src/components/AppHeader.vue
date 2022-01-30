<template>
  <header>
    <div class="header-wrapper">
      <div
        class="header"
        :class="{'navbar-visible': showNav}"
      >
        <div class="container">
          <div class="header__content">
            <router-link
              :to="{name: 'home'}"
              class="header__logo"
              title="Algor Mortis"
              @click="showNav = false"
            >
              <img
                class="logo"
                src="/images/logo.png"
                alt="Algor Mortis"
              >
            </router-link>
            <nav class="navbar">
              <router-link
                v-for="(item, i) in navigation"
                :key="`NavItem-${i}`"
                :to="item.to"
                activeClass="active"
                @click="showNav = false"
              >
                {{ item.label }}
              </router-link>
              <a
                href="#donate"
                class="btn header__donate"
                @click="showNav = false"
              >Podpořit</a>
            </nav>
            <router-link
              to="#donate"
              class="btn header__donate"
            >
              Podpořit
            </router-link>
            <button
              class="burger"
              @click="showNav = !showNav"
            >
              <span />
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const showNav = ref(false)
    const navigation = [
      {
        label: 'Epizody podcastu',
        to: { name: 'episodes' }
      },
      {
        label: 'O podcastu',
        to: { name: 'about-podcast' }
      },
      {
        label: 'O nás',
        to: { name: 'about-us' }
      },
      {
        label: 'Doporučujeme',
        to: { name: 'recommended' }
      },
    ]

    return { navigation, showNav }
  }
});
</script>

