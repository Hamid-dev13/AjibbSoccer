import { createRouter, createWebHistory } from 'vue-router';

import Homepage from './components/HomePage.vue'; // Composant pour la page d'accueil
import PlayerPage from './components/PlayersPage.vue'; // Composant pour la page des joueurs

const routes = [
  {
    path: '/', // Chemin pour la page d'accueil
    name: 'Home',
    component: Homepage,
  },
  {
    path: '/players', // Chemin pour la page des joueurs
    name: 'Players',
    component: PlayerPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
