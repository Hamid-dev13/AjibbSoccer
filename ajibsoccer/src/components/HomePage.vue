<template>
  <div class="container mx-auto p-5">
    <h1 class="text-5xl font-bold text-center">Ajib Soccer</h1>
  </div>

  <div class="container mx-auto p-4">
    <h2 class="text-3xl font-bold text-center">Ajouter un match</h2>
    <form @submit.prevent="submitMatch" class="mt-5">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="matchName">Nom du match</label>
        <input v-model="matchName" id="matchName" type="text" placeholder="Entrez le nom du match" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ajouter le Match</button>
    </form>

    <div class="mt-10">
      <h2 class="text-3xl font-bold text-center">Liste des matchs</h2>
      <ul class="mt-5">
        <li v-for="(match, index) in matches" :key="index" class="mb-2 text-xl text-center">
          {{ match.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { addMatch, getMatches } from '../services/matchService';

export default {
  data() {
    return {
      matchName: '',
      matches: []
    };
  },
  methods: {
    async submitMatch() {
      if (!this.matchName) {
        alert('Veuillez entrer un nom de match.');
        return;
      }

      try {
        const result = await addMatch(this.matchName);

        if (result.success) {
          alert(result.message);
          this.matchName = '';
          await this.loadMatches();
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout du match :", error);
        alert("Erreur lors de l'ajout du match.");
      }
    },
    async loadMatches() {
      try {
        const result = await getMatches();
        this.matches = result;
      } catch (error) {
        console.error("Erreur lors de la récupération des matchs :", error);
      }
    }
  },
  async mounted() {
    await this.loadMatches();
  }
};
</script>
