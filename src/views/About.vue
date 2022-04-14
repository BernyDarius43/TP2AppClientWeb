<template>
    <div class="container">
      <div style="margin-bottom: 20px;">
        <h1 class="title is-1 has-text-centered" >This is an about page</h1>
      </div>
        <label class="label" for="titleFilter"></label>
        <h1 class="title is-1 has-text-centered">Name : {{ this.nomComplet }} </h1>
        <h1 class="title is-1 has-text-centered">Matricule : {{ this.monMatricule }} </h1>
    </div>
</template>

<script>
export default {
  name: 'About',
  computed: {
    nomComplet() {
      return `${this.prenom} ${this.nom}`;
    },
    monMatricule() {
      return `${this.matricule}`;
    },
  },
  data() {
    return {
      matricule: 'e1769264',
      nom: 'Darius',
      prenom: 'Berny',
    };
  },
};
</script>
