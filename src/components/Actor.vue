<template>
    <div class="card large">
        <img v-bind:src="role.Image" v-bind:alt="role.Character"
        class="card-img-top mx-auto rounded role-img"/>
        <div class="card-body text-center">
            <p class="card-title small" style="font-weight: bold">{{role.Name}}</p>
            <p class="small">{{role.Character}}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Actor',
  props: {
    role: Object,
  },
};
</script>
