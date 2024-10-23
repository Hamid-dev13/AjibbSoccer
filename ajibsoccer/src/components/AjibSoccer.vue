<template>
  <div class="container">
    <h2 class="mt-4">Ajouter un joueur</h2>
    <div class="input-group mb-3">
      <input v-model="newPlayer" class="form-control rounded" placeholder="Nom du joueur" />
      <button class="btn btn-primary ml-2 rounded" @click="addPlayer">Ajouter</button>
    </div>
    <h1 class="text-center">Liste des joueurs</h1>
    <ul class="list-group">
      <li v-for="player in players" :key="player.name" class="list-group-item d-flex justify-content-between align-items-center">
        {{ player.name }}
        <button class="btn btn-danger btn-sm" @click="deletePlayer(player.name)">Supprimer</button>
      </li>
    </ul>
    <button class="btn btn-secondary mt-3">Faire les équipes</button>
  </div>
</template>

<script>
import { fetchPlayers } from '../services/fetchPlayers';  // Fichier pour récupérer les joueurs
import { addPlayer } from '../services/addPlayer';        // Service pour ajouter un joueur
import { deletePlayer } from '../services/deletePlayer';  // Service pour supprimer un joueur

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
        this.players = await fetchPlayers();  // Récupérer la liste des joueurs via le service
      } catch (error) {
        console.error('Erreur lors de la récupération des joueurs:', error);
      }
    },
    async addPlayer() {
      if (this.newPlayer) {
        try {
          await addPlayer(this.newPlayer);    // Ajouter un joueur via le service
          this.newPlayer = "";                // Réinitialiser le champ après ajout
          this.loadPlayers();                 // Recharger la liste après ajout
        } catch (error) {
          console.error('Erreur lors de l\'ajout du joueur:', error);
        }
      }
    },
    async deletePlayer(name) {
      try {
        await deletePlayer(name);             // Supprimer un joueur via le service
        this.loadPlayers();                   // Recharger la liste après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression du joueur:', error);
      }
    }
  },
  mounted() {
    this.loadPlayers(); // Charger la liste des joueurs lors du montage du composant
  }
};
</script>

<style scoped>
.form-control:focus {
  border-color: grey;
  box-shadow: none;
}
</style>
