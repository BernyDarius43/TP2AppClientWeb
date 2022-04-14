<template>
<div class="container">
<div class="section">
  <div class="row columns is-multiline">
    <div
    class="column is-3-desktop is-4-tablet is-12-mobile"
      v-for="Episode in Season.Episodes"
      v-bind:key="Episode.EpisodeId"
      v-bind:value="Episode.EpisodeId">
        <Episode :Episode="Episode" />
      </div>
  </div>
  </div>
  </div>
</template>

<script>
import Episode from '@/components/Episode.vue';

export default {
  name: 'Episodes',
  components: {
    Episode,
  },
  props: {
    SeasonId: Number,
  },
  data() {
    return {
      Season: [],
    };
  },
  methods: {
    async RefreshDataEpisodes() {
      const response = await fetch(`https://tvshowapi.apis.redirectme.net/api/episodes?SeasonId=${this.SeasonId}`);
      if (response.ok) {
        this.Season = await response.json();
      } else {
        console.log(response.statusText);
      }
    },
  },
  mounted() {
    this.RefreshDataEpisodes();
  },

};
</script>

<style>

</style>
