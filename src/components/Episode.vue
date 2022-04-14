<template>
<router-link :to="{name: 'DetailsEpisode', params: {EpisodeId: Episode.EpisodeId}}">
  <div class="card">
      <img
      class="card-image"
      :src="Episode.Image"
      />
      <div class="card-content has-text-centered">
            <strong>
                {{Episode.Title}}
            </strong>
            <div>
                <span class="subtitle">
                    Episode {{Episode.Number}}
                </span>
            </div>
      </div>
  </div>
  </router-link>
</template>

<script>
export default {
  name: 'Episode',
  props: {
    Episode: Object,
  },
};
</script>

<style>

</style>
