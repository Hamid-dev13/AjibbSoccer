<template>
  <div class="container mx-auto p-5">
    <h1 class="text-5xl font-bold text-center">Ajib Soccer</h1>
  </div>

  <div class="container mx-auto p-4 flex flex-col items-center">
    <h2 class="text-3xl font-bold text-center">Ajouter un match</h2>
    <form @submit.prevent="submitMatch" class="mt-5 w-full flex flex-col items-center">
      <div class="mb-4 w-full flex flex-col gap-5 items-center">
        <input v-model="matchName" id="matchName" type="text" placeholder="Entrez le nom du match" class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ajouter le Match</button>
      </div>
    </form>

    <div class="mt-10 w-full flex flex-col items-center">
      <h2 class="text-3xl font-bold text-center">Matchs à venir</h2>
      <ul class="mt-5 w-full flex flex-col gap-5 items-center">
        <li v-for="(match, index) in matches" :key="index" class="text-xl bg-gray-300 rounded border-solid p-5 w-1/2 flex items-center justify-between">
          {{ match.name }}
          <div class="flex gap-2">
            <button><i class="fa-solid fa-pen"></i></button>
            <button @click="deleteMatch(match.name)"><i class="fa-solid fa-trash-can"></i></button>
       
          </div>
          
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { addMatch, getMatches } from '../services/matchService';
import { deleteMatch as deleteMatchService } from '../services/DeleteMatch';


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
        console.log("Match à l'index 1 :", this.matches[1]);
      
         
      } catch (error) {
        console.error("Erreur lors de la récupération des matchs :", error);
      }
    },
    async deleteMatch(matchName) { 
      try {
        await deleteMatchService(matchName); 
        alert("Match supprimé avec succès"); // Alerte de succès
        await this.loadMatches(); 
      } catch (error) {
        console.error("Erreur lors de la suppression du match :", error);
        alert("Erreur lors de la suppression du match.");
      }
    }
  },
  async mounted() {
    await this.loadMatches(); // Charge les matchs lors du montage du composant
  }
};
</script>

