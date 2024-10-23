<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mt-4">Ajouter un joueur</h2>
    <div class="flex mb-3">
      <input v-model="newPlayer" class="border rounded p-2 flex-1" placeholder="Nom du joueur" />
      <button class="bg-blue-500 text-white rounded ml-2 p-2 hover:bg-blue-600" @click="addPlayer">Ajouter</button>
    </div>
    <h1 class="text-center text-3xl font-bold">Liste des joueurs</h1>
    <ul class="list-group">
      <li v-for="player in players" :key="player.name" class="flex justify-between items-center border-b py-2">
        {{ player.name }}
        <button class="bg-red-500 text-white rounded p-1 hover:bg-red-600" @click="deletePlayer(player.name)">Supprimer</button>
      </li>
    </ul>
   
  </div>
</template>

<script>
import { fetchPlayers } from '../services/fetchPlayers'; 
import { addPlayer } from '../services/addPlayer';       
import { deletePlayer } from '../services/deletePlayerService'; 

export default {
  data() {
    return {
      players: [], 
      newPlayer: "" 
    };
  },
  methods: {
    async loadPlayers() {
      try {
        this.players = await fetchPlayers();  
      } catch (error) {
        
        console.error('Erreur lors de la récupération des joueurs:', error);
      }
    },
    async addPlayer() {
      if (this.newPlayer) {
        try {
          await addPlayer(this.newPlayer);   
          this.newPlayer = "";                // Réinitialiser le champ de saisie
          this.loadPlayers();                 // Recharger la liste des joueurs
        } catch (error) {
          console.error('Erreur lors de l\'ajout du joueur:', error);
        }
      }
    },
    async deletePlayer(name) {
      try {
        await deletePlayer(name);             // Supprimer le joueur
        this.loadPlayers();                   // Recharger la liste des joueurs
      } catch (error) {
        console.error('Erreur lors de la suppression du joueur:', error);
      }
    }
  },
  mounted() {
    this.loadPlayers(); 
  }
};
</script>

<style scoped>
/* Styles spécifiques peuvent être ajoutés ici */
</style>
