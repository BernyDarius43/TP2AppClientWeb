<template>
  <div class="container">
    <div v-if="favoriteTvShows">
        <div class="row columns is-multiline">
          <div
          v-for="tvshow in favoriteTvShows"
          :key="tvshow.TvShowId"
          :value="tvshow.TvShowId"
          class="column is-3">
              <TvShow :tv="tvshow" />
          </div>
        </div>
    </div>
    <div v-if="favoriteTvShows.length === 0">
         <span class="title">
           You need to add some Tv Shows to your favorites to see them here.
          </span>
    </div>
  </div>
</template>

<script>
import TvShow from '@/components/TvShow.vue';

export default {
  name: 'FavoriteTvShows',
  components: {
    TvShow,
  },
  data() {
    return {
      favoriteTvShows: [],
      token: this.$store.state.token,
      bearerToken: '',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  methods: {
    async RefreshDataFavoriteTvShows() {
      this.bearerToken = `bearer ${this.token}`;
      if (this.loggedIn) {
        const response = await fetch('https://tvshowapi.apis.redirectme.net/api/favorites',
          {
            method: 'Get',
            headers: {
              Authorization: this.bearerToken,
            },
          });
        if (response.ok) {
          this.favoriteTvShows = await response.json();
        } else {
          console.log(response.statusText);
        }
      }
    },
  },
  mounted() {
    this.RefreshDataFavoriteTvShows();
  },
};
</script>

<style>

</style>
