// matchService.js

// Fonction pour ajouter un match
export async function addMatch(matchName) {
  try {
    const response = await fetch('http://localhost:3000/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: matchName }),
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, message: 'Match ajouté avec succès !' };
    } else {
      return { success: false, message: data.message || 'Erreur lors de l’ajout du match.' };
    }
  } catch (error) {
    return { success: false, message: 'Erreur réseau ou problème serveur.' };
  }
}

// Fonction pour récupérer la liste des matchs
export async function getMatches() {
  try {
    const response = await fetch('http://localhost:3000/matches');
    const data = await response.json();
    if (response.ok) {
      return data; // Retourne la liste des matchs
    } else {
      throw new Error('Erreur lors de la récupération des matchs');
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
    throw error;
  }
}
