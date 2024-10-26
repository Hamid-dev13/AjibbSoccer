const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('backend online');
});

const players = [];
const matches = [];

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

// Route pour ajouter un match
app.post('/matches', (req, res) => {
  const match = req.body;
  
  if (!match.name) {
    return res.status(400).send({ message: 'Veuillez fournir un nom de match.' });
  }

  matches.push(match);
  res.status(201).send({ message: 'Match ajouté', match });
});

// Route pour récupérer la liste des matchs
app.get('/matches', (req, res) => {
  res.send(matches);
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

// route pour supprimer un match
app.delete('/matches/:name', (req, res) => {
  const matchName = req.params.name; 
  const matchIndex = matches.findIndex(match => match.name === matchName); 

  if (matchIndex === -1) {
    return res.status(404).send({ message: 'Match non trouvé' }); 
  }

  matches.splice(matchIndex, 1);
  res.status(204).send(); 
});


//modifier le nom du match
app.put('/matches/:name', (req, res) => {
  const matchName = req.params.name; 
  const matchIndex = matches.findIndex(match => match.name === matchName); 

  if (matchIndex === -1) {
    return res.status(404).send('Match not found');
  }

  // Vérifiez si req.body contient des données valides
  if (!req.body || !req.body.name) {
    return res.status(400).send('Invalid data provided');
  }

  // Mise à jour du match
  matches[matchIndex] = { ...matches[matchIndex], ...req.body };

  res.status(204).send();
});
