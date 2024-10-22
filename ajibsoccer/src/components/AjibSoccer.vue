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
export default {
  data() {
    return {
      players: [], // Liste des joueurs
      newPlayer: "" // Nouveau joueur à ajouter
    };
  },
  methods: {
    async fetchPlayers() {
      try {
        const response = await fetch("http://localhost:3000/players");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.players = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération des joueurs:', error);
      }
    },
    async addPlayer() {
      if (this.newPlayer) {
        try {
          const response = await fetch("http://localhost:3000/players", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: this.newPlayer })
          });

          if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout du joueur');
          }

          this.newPlayer = ""; // Réinitialiser le champ
          await this.fetchPlayers(); // Recharger la liste des joueurs
        } catch (error) {
          console.error('Erreur lors de l\'ajout du joueur:', error);
        }
      }
    },
    async deletePlayer(name) {
      try {
        const response = await fetch(`http://localhost:3000/players/${name}`, {
          method: "DELETE"
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du joueur');
        }

        await this.fetchPlayers(); // Recharger la liste des joueurs après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression du joueur:', error);
      }
    }
  },
  mounted() {
    this.fetchPlayers(); // Récupérer la liste des joueurs à l'initialisation
  }
};
</script>

<style scoped>
.form-control:focus {
  border-color: grey;
  box-shadow:none;
}
.player-form {
  margin-bottom: 20px;
}

button {
  margin-left: 10px; /* Ajoute un peu d'espace entre le nom et le bouton */
}

a {
  color: #42b983;
}
</style>
