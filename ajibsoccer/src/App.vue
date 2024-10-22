<template>
  <div id="app">
    <AjibSoccer /> <!-- Utilisez le nom de composant avec une première lettre en majuscule -->
  </div>
</template>

<script>
import AjibSoccer from './components/AjibSoccer.vue'; // Assurez-vous que le chemin est correct
import 'bootstrap/dist/css/bootstrap.min.css';
export default {
  components: {
    AjibSoccer // Utilisation de AjibSoccer ici
  }
};
</script>

<style>
/* Ajoutez ici vos styles si nécessaire */
</style>
