<template>
  <div class="container">
        <div class="columns">
            <router-link :to="{name: 'ViewEpisode', params: {EpisodeId: detailsEpisode.EpisodeId}}">
            <div class="column">
                <img v-bind:src="detailsEpisode.Image" v-bind:alt="detailsEpisode.Title">
            </div>
            </router-link>
            <div class="column">
              <div class="column">
                  <p>
                      {{detailsEpisode.Season.ShortSeasonName}} -
                      {{detailsEpisode.E00Format}} - {{detailsEpisode.Title}}
                 </p>
              </div>
              <div class="column">
                  <span>
                      <p>{{detailsEpisode.Runtime}}
                          {{detailsEpisode.Season.TvShow.TVParentalGuideline}}</p>
                  </span>
              </div>
              <div class="column">
                <p>{{detailsEpisode.Plot}} </p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'DetailsEpisode',
  data() {
    return {
      detailsEpisode: null,
    };
  },
  props: {
    EpisodeId: Number,
  },
  methods: {
    async RefreshDataDetailsEpisode() {
      const response = await fetch(`https://tvshowapi.apis.redirectme.net/api/episode?EpisodeId=${this.EpisodeId}`);
      if (response.ok) {
        this.detailsEpisode = await response.json();
      } else {
        console.log(response.statusText);
      }
    },
  },
  mounted() {
    this.RefreshDataDetailsEpisode();
  },

};
</script>

<style>

</style>
