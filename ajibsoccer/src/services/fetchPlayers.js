const apiUrl = "http://localhost:3000/players";

export async function fetchPlayers() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des joueurs");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}


