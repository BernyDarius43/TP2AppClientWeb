<template>
  <div class="container">
      <div
      class="section"
      v-if="videoEpisode">
    <video width="1000" height="500" controls>
        <source :src="videoEpisode.Video"/>
    </video>
    </div>
    <div class="section"
    v-if="!videoEpisode">
        <div id="divError" v-if="ErrorMsg" class="notification is-danger is-light">
            {{this.ErrorMsg}}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewEpisode',
  props: {
    EpisodeId: Number,
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  data() {
    return {
      videoEpisode: '',
      token: this.$store.state.token,
      bearerToken: '',
      ErrorMsg: '',
    };
  },
  methods: {
    async RefreshDataViewEpisode() {
      this.bearerToken = `bearer ${this.token}`;
      if (this.loggedIn) {
        const response = await fetch(`https://tvshowapi.apis.redirectme.net/api/viewepisode?EpisodeId=${this.EpisodeId}`,
          {
            method: 'Get',
            headers: {
              Authorization: this.bearerToken,
            },
          });
        if (response.ok) {
          this.videoEpisode = await response.json();
        } else {
          this.ErrorMsg = `You need to be connected or you need be an admin and/or a donator code: ${response.status}`;
          console.log(response.statusText);
        }
      } else {
        this.ErrorMsg = 'you need to be connected or you need be an admin and/or a donator';
      }
    },
  },
  mounted() {
    this.RefreshDataViewEpisode();
  },

};
</script>

<style>

</style>
