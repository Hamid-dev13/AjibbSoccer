<!-- TeamPage.vue -->
<template>
    <div class="container">
      <h1>Faire les équipes</h1>
      <h2>Équipe 1</h2>
      <ul>
        <li v-for="player in team1" :key="player.name">{{ player.name }}</li>
      </ul>
      
      <h2>Équipe 2</h2>
      <ul>
        <li v-for="player in team2" :key="player.name">{{ player.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        team1: [], 
        team2: []  
      };
    },
    mounted() {
     
    }
  };
  </script>
  