<template>
  <div>
    <!-- router-view est la balise où sera placée la vue en fonction de l'url -->
    <!-- initialement, le chemin racine (/) est chargé. -->
    <div id="App">
    <Menu/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue';

export default {
  name: 'App',
  components: {
    Menu,
  },
};
</script>
