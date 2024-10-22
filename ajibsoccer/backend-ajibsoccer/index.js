const express = require('express');
const cors = require('cors'); // Ajoute ceci
const app = express();
const port = 3000;

app.use(cors()); // Ajoute ceci pour autoriser les requêtes CORS
app.use(express.json());

app.get('/', (req, res) => {
  res.send('backend online');
});

const players = [];

// Route pour ajouter un joueur
app.post('/players', (req, res) => {
  const player = req.body;
  players.push(player);
  res.status(201).send({ message: 'Joueur ajouté', player });
});

// Route pour obtenir la liste des joueurs
app.get('/players', (req, res) => {
  res.send(players);
});

// Route pour supprimer un joueur
app.delete('/players/:name', (req, res) => {
  const { name } = req.params;
  const index = players.findIndex(p => p.name === name);
  if (index !== -1) {
    players.splice(index, 1);
    res.send({ message: 'Joueur supprimé' });
  } else {
    res.status(404).send({ message: 'Joueur non trouvé' });
  }
});

app.listen(port, () => {
  console.log('serveur ecoute 3000');
});

 
