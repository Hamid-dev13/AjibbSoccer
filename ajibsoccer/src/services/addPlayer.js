const apiURL = "http://localhost:3000/players";

export async function addPlayer(playerName) {
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: playerName })
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout du joueur");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur:", error); 
    throw error; 
  }
}
