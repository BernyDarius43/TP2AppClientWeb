<template>
    <nav class="navbar is-light" role="navigation"
    aria-label="main navigation" style="margin-bottom: 20px;">
      <div class="navbar-brand">
        <a href="/" class="navbar-item">
        <div>
          TP2
        </div>
        </a>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
        data-target="navbarBasicExample"
        @click="showNav = !showNav" :class="{ 'is-active': showNav }">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showNav }"
      v-if="!loggedIn">
        <div class="navbar-start">
          <router-link class="navBar-link navbar-item" to="/">
          <div>
            Library
          </div>
          </router-link>
        </div>

        <div class="navbar-end">
          <router-link class="navBar-link navbar-item" to="/About">
          <div>
            About
          </div>
          </router-link>
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="navBar-link" to="/SignUp">
              <li class="button is-primary">
                 Sign up
              </li>
              </router-link>
              <router-link class="navBar-link" to="/Login" style="margin-left: 10px;">
              <li class="button is-info">
                Log in
              </li>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showNav }"
      v-if="loggedIn">
        <div class="navbar-start">
          <router-link class="navBar-link navbar-item" to="/">
          <div>
            Library
          </div>
          </router-link>
        </div>

        <div class="navbar-end">
          <router-link class="navBar-link navbar-item" to="/Profile">
          <div>
              Profile
          </div>
          </router-link>
          <router-link class="navBar-link navbar-item" to="/FavoriteTvShows">
          <div>
              Favorite Shows
          </div>
          </router-link>
          <router-link class="navBar-link navbar-item" to="/About">
          <div>
          About
          </div>
          </router-link>
            <div class="navbar-item">
              <div class="buttons">
                <button class="button is-danger" v-on:click="logout">
                  Logout
                </button>
              </div>
            </div>
        </div>
      </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      showNav: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },

    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('deleteToken');
      if (this.currentRouteName !== 'Home') {
        this.$router.push('/');
      }
    },
  },
};
</script>
