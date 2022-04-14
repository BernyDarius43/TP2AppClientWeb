<template>
  <div class="container">
      <div id="divSuccess" v-if="successMessage" class="notification is-success is-light">
        {{successMessage}}
      </div>
    <div class="section">
    <div class="columns is-centered">
      <div class="field is-horizontal" style="padding-left:20px">
        <div class="field-label is-normal">
          <label class="label" for="titleFilter">Titre</label>
        </div>
        <div class="field-body">
                <input id="titleFilter"
                v-model="titleFilter" placeholder="Title filter" type="text"/>
        </div>
      </div>
      <div class="field is-horizontal" style="padding-left:20px">
        <div class="field-label is-normal">
          <label class="label" for="genreFilter">Genre</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control" style="min-width: 200px">
              <div class="select is-fullwidth">
                <select id="genreFilter"
                        v-model="genreFilter">
                  <option></option>
                  <option v-for="g in genre"
                          v-bind:key="g.GenreId"
                          v-bind:value="g.GenreId">{{ g.Name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal" style="padding-left:20px">
        <div class="field-label is-normal">
          <label class="label" for="studioFilter">studio</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control" style="min-width: 200px">
              <div class="select is-fullwidth">
                <select id="studioFilter"
                        v-model="studioFilter">
                  <option></option>
                  <option v-for="s in studio"
                          v-bind:key="s.StudioId"
                          v-bind:value="s.StudioId">{{ s.Name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section" v-if="tvShowsFilter != null">
    <div class="row columns is-multiline">
      <div class="column is-3-desktop is-4-tablet is-12-mobile"
      v-for="tv in tvShowsFilter" v-bind:key="tv.TvShowId" v-bind:value="tv.TvShowId">
        <TvShow v-bind:tv="tv"/>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import TvShow from '@/components/TvShow.vue';

export default {
  name: 'Home',
  components: {
    TvShow,
  },
  props: {
    dataSuccessMessage: {
      type: String,
    },
  },
  computed: {
    tvShowsFilter() {
      let series = this.tvShows;
      if (this.titleFilter !== '') {
        series = series.filter((s) => s.Title.toLowerCase()
          .includes(this.titleFilter.toLowerCase()));
      }

      if (this.genreFilter !== '') {
        series = series
          .filter(({ Genres }) => (Genres.some(({ GenreId }) => GenreId === this.genreFilter)));
      }
      if (this.studioFilter !== '') {
        series = series.filter((s) => s.Studio.StudioId === this.studioFilter);
      }
      return series;
    },
  },
  data() {
    return {
      genre: null,
      studio: null,
      tvShows: null,
      genreFilter: '',
      titleFilter: '',
      studioFilter: '',
      successMessage: this.dataSuccessMessage,
    };
  },
  methods: {
    async RefreshDataTvShows() {
      // Obtenir les valeurs actuelles des zones de liste titre, studio et genre
      const response = await fetch(`https://tvshowapi.apis.redirectme.net/api/tvshows?titleFilter=${this.titleFilter}&studioFilter=${this.studioFilter}&genreFilter=${this.genreFilter}`);
      if (response.ok) {
        this.tvShows = await response.json();
      } else {
        console.log(response.statusText);
      }
    },
    async RefreshDataGenres() {
      // Obtenir les valeurs actuelles des zones de liste genre
      const response = await fetch('https://tvshowapi.apis.redirectme.net/api/genres');
      if (response.ok) {
        this.genre = await response.json();
      } else {
        console.log(response.statusText);
      }
    },
    async RefreshDataStudio() {
      // Obtenir les valeurs actuelles des zones de liste studio
      const response = await fetch('https://tvshowapi.apis.redirectme.net/api/studios');
      if (response.ok) {
        this.studio = await response.json();
      } else {
        console.log(response.statusText);
      }
    },
  },
  mounted() {
    this.RefreshDataTvShows();
    this.RefreshDataGenres();
    this.RefreshDataStudio();
  },
};
</script>

<style scoped>
</style>
