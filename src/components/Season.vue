<template>
<router-link :to="{name: 'Episodes', params: { SeasonId: season.SeasonId}}">
            <div class="card">
                <img v-bind:src="season.Image" v-bind:alt="season.ShortSeasonName"
                class="card-img-top mx-auto rounded"/>
                <div class="card-body text-center">
                    <h5 class="card-title">Season {{season.Number}}</h5>
                    <p >{{season.EpisodeCount}} episodes</p>
                </div>
            </div>
</router-link>
</template>

<script>
export default {
  name: 'Season',
  props: {
    season: Object,
  },
};
</script>
