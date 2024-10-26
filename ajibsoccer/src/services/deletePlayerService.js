const apiUrl = "http://localhost:3000/players";

export async function deletePlayer(playerName) {
  try {
    const response = await fetch(`${apiUrl}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du joueur");
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
