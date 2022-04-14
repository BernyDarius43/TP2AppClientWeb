<template>
    <div class="container" v-if="TvShow != null">
        <div class="columns">
            <div class="column">
                <img v-bind:src="TvShow.Image" v-bind:alt="TvShow.Title">
            </div>
            <div class="column">
              <div class="column">
                <h1>{{TvShow.Title}}</h1>
                <div>
                  <button
                  v-if="this.loggedIn && !checkUserFavorites.IsFavorite"
                  class="button is-success"
                  @click="addFavorites">
                    Add to Favorites
                  </button>
                </div>
                <div>
                  <button
                  v-if=" this.loggedIn && checkUserFavorites.IsFavorite"
                  class="button is-danger"
                  @click="removeFavorites">
                    Remove from Favorites
                  </button>
              </div>
              </div>
              <div class="column">
                  <h5>{{TvShow.Year}}</h5>
              </div>
              <div class="column">
                  <span>
                      <p>{{TvShow.EpisodeCount}} episodes {{TvShow.TVParentalGuideline}}</p>
                  </span>
              </div>
              <div class="column">
                <p>Genre:
                  <span
                  v-for="g in TvShow.Genres"
                  v-bind:value="g.GenreId"
                  v-bind:key="g.GenreId">
                    {{g.Name}},
                  </span>
                </p>
              </div>
              <div class="column">
                <p><span>Studio: {{TvShow.Studio.Name}}</span></p>
              </div>
              <div class="column">
                <p>{{TvShow.Plot}} </p>
              </div>
            </div>
        </div>
    <div class="section scrolling-wrapper">
        <div v-for="role in TvShow.Roles" v-bind:value="role.RoleId"
        v-bind:key="role.RoleId" class="column is-3">
            <Actor v-bind:role="role" />
        </div>
    </div>
    <div class="section scrolling-wrapper">
        <div v-for="season in TvShow.Seasons" v-bind:value="season.SeasonId"
        v-bind:key="season.SeasonId" class="column is-3">
            <Season v-bind:season="season" />
        </div>
    </div>
    </div>
</template>

<script>
import Actor from '@/components/Actor.vue';
import Season from '@/components/Season.vue';

export default {
  name: 'DetailsTvShow',
  components: {
    Actor,
    Season,
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  props: ['TvShowId'],
  data() {
    return {
      TvShow: null,
      token: this.$store.state.token,
      bearerToken: '',
      checkUserFavorites: null,
    };
  },
  methods: {
    async GetTvShow() {
      const reponse = await fetch(`https://tvshowapi.apis.redirectme.net/api/tvshow?TvShowId=${this.TvShowId}`);
      if (reponse.ok) {
        this.TvShow = await reponse.json();
      } else {
        console.log(reponse.statusText);
      }
    },
    async getUserFavorites() {
      if (this.loggedIn) {
        this.bearerToken = `bearer ${this.token}`;
        const response = await fetch(`https://tvshowapi.apis.redirectme.net/api/favorites?TvShowId=${this.TvShowId}`,
          {
            method: 'GET',
            headers: {
              Authorization: this.bearerToken,
            },
          });
        if (response.ok) {
          this.checkUserFavorites = await response.json();
        } else {
          console.log(response.statusText);
        }
      }
    },
    async addFavorites() {
      if (this.loggedIn) {
        this.bearerToken = `bearer ${this.token}`;
        const response = await fetch(`https://tvshowapi.apis.redirectme.net/api/favorites?TvShowId=${this.TvShowId}`,
          {
            method: 'POST',
            headers: {
              Authorization: this.bearerToken,
              'Content-Type': 'application/json',
            },
          });
        if (response.ok) {
          this.getUserFavorites();
        } else {
          console.log(response.statusText);
        }
      }
    },
    async removeFavorites() {
      if (this.loggedIn) {
        this.bearerToken = `bearer ${this.token}`;
        const response = await fetch(`https://tvshowapi.apis.redirectme.net/api/favorites?TvShowId=${this.TvShowId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: this.bearerToken,
              'Content-Type': 'application/json',
            },
          });
        if (response.ok) {
          this.getUserFavorites();
        } else {
          console.log(response.statusText);
        }
      }
    },
  },
  mounted() {
    this.getUserFavorites();
    this.GetTvShow();
  },

};
</script>

<style scoped>
a {
    text-decoration: none !important;
    color: black;
}
h1 {
    font-size: 40px;
    color: black;
    text-shadow: 0px 1px 0px #f2f2f2;
}
.section {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
}
</style>
