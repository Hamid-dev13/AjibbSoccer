<template>
  <div class="container mx-auto p-5">
    <h1 class="text-5xl font-bold text-center">Ajib Soccer</h1>
    

    <div class="container mx-auto p-4 flex flex-col items-center">
      
      <h2 class="text-3xl font-bold text-center">Ajouter un match</h2>
      <form @submit.prevent="submitMatch" class="mt-5 w-full flex flex-col items-center">
        <div class="mb-4 w-full flex flex-col gap-10 items-center">
          <input v-model="matchName" id="matchName" type="text" placeholder="Entrez le nom du match" class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700">
          <div v-if="alertMessage" :class="`alert ${alertType}`" class="p-2 text-sm rounded-lg bg-red-500 " role="alert">
      {{ alertMessage }}
      <button type="button" class="ml-2 text-gray-500 hover:text-gray-700" @click="closeAlert">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-left">Ajouter le Match</button>
        </div>
      </form>
      
    
      <div class="mt-10 w-full flex flex-col items-center">
        <h2 class="text-3xl font-bold text-center">Matchs à venir</h2>
        <ul class="mt-5 w-full flex flex-col gap-5 items-center">
          <li v-for="(match, index) in matches" :key="index" class="text-xl bg-gray-300 rounded border-solid p-5 w-1/2 flex items-center justify-between">
            {{ match.name }}
            <div class="flex gap-2">
              <button @click="openModifyModal(match)"><i class="fa-solid fa-pen"></i></button>
              <button @click="deleteMatch(match.name)"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal pour modifier le match -->
    <div v-if="isModifyModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="isModifyModalOpen = false">&times;</span>
        <h2>Modifier le match</h2>
        <input v-model="newMatchName" type="text" placeholder="Nouveau nom du match" class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700">
        <button @click="modifyMatch">Modifier</button>
      </div>
    </div>
  </div>
</template>

<script>
import { addMatch, getMatches } from '../services/matchService';
import { deleteMatch as deleteMatchService } from '../services/DeleteMatch';
import { modifyMatch as modifyMatchService } from '../services/modifyMatch';

export default {
  data() {
    return {
      matchName: '',
      matches: [],
      isModifyModalOpen: false, 
      matchToModify: null, 
      newMatchName: '',
      alertMessage: '',
      alertType: '', // 'success', 'error', etc.
      alertTitle: ''
    };
  },
  methods: {
    async submitMatch() {
      if (!this.matchName) {
        this.showAlert('Veuillez entrer un nom de match.', 'error', 'Erreur!');
        return;
      }

      try {
        const result = await addMatch(this.matchName);

        if (result.success) {
          this.showAlert(result.message, 'success', 'Succès!');
          this.matchName = ''; 
          await this.loadMatches(); 
        } else {
          this.showAlert(result.message, 'error', 'Erreur!');
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout du match :", error);
        this.showAlert("Erreur lors de l'ajout du match.", 'error', 'Erreur!');
      }
    },
    async loadMatches() {
      try {
        const result = await getMatches();
        this.matches = result;
      } catch (error) {
        console.error("Erreur lors de la récupération des matchs :", error);
      }
    },
    async deleteMatch(matchName) { 
      try {
        await deleteMatchService(matchName); 
        this.showAlert("Match supprimé avec succès", 'success', 'Succès!');
        await this.loadMatches(); 
      } catch (error) {
        console.error("Erreur lors de la suppression du match :", error);
        this.showAlert("Erreur lors de la suppression du match.", 'error', 'Erreur!');
      }
    },
    async openModifyModal(match) {
      this.matchToModify = match; 
      this.newMatchName = match.name; 
      this.isModifyModalOpen = true;
    },
    async modifyMatch() {
      if (!this.newMatchName) {
        this.showAlert('Veuillez entrer un nouveau nom de match.', 'error', 'Erreur!');
        return;
      }

      try {
        await modifyMatchService(this.matchToModify.name, { name: this.newMatchName });
        this.showAlert("Match modifié avec succès", 'success', 'Succès!');
        this.isModifyModalOpen = false; 
        await this.loadMatches(); 
      } catch (error) {
        console.error("Erreur lors de la modification du match :", error);
        this.showAlert("Erreur lors de la modification du match.", 'error', 'Erreur!');
      }
    },
    showAlert(message, type, title) {
      this.alertMessage = message;
      this.alertType = type;
      this.alertTitle = title;
  
    },
    closeAlert() {
      this.alertMessage = ''; // Ferme l'alerte
    }
  },
  async mounted() {
    await this.loadMatches();
  }
};
</script>

<style>
.modal {
  display: block; /* Affiche la modal */
  position: fixed; 
  z-index: 1000; 
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); /* Couleur de fond avec transparence */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 80%; 
}
.alert {
  width: 90%; 
  max-width: 400px;
  margin: 10px auto; 
  padding: 10px;
  border-radius: 5px; 
  transition: opacity 0.3s ease; 
  opacity: 1; 
  display: flex; 
  justify-content: space-between;
  z-index: 50; 
  position: fixed; 
  left: 50%; 
  transform: translateX(-50%); 
}


</style>
