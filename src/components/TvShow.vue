<template>
    <router-link :to="{ name: 'DetailsTvShow', params: { TvShowId: tv.TvShowId }}">
        <div class="card">
            <img class="card-image" v-bind:src="tv.Image"/>
            <div class="card-content has-text-centered" style="max-heigth:210px;">
                <strong style="min-height:50px;max-height:50px;">
                    {{tv.Title}}
                </strong>
                <div>
                    <span class="subtitle" v-if="tv.SeasonCount === 1">
                        {{tv.SeasonCount}} season
                    </span>
                </div>
                <div>
                    <span class="subtitle" v-if="tv.SeasonCount > 1">
                        {{tv.SeasonCount}} seasons
                    </span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
  name: 'TvShow',
  props: {
    tv: Object,
  },
};
</script>
