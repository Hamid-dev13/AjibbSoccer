const apiUrl = "http://localhost:3000/matches";

export async function modifyMatch(matchName, updates) {
    try {
        const response = await fetch(`${apiUrl}/${matchName}`, { // Ajout de matchName dans l'URL
            method: "PUT",
            headers: {
                'Content-Type': 'application/json' // Spécifie le type de contenu
            },
            body: JSON.stringify(updates) 
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la modification du match');
        }

        if (response.status === 204) {
            return; // La mise à jour a réussi, rien à retourner
        }

        // Si le serveur retourne autre chose que 204, essayez de renvoyer le JSON
        return await response.json(); 
    } catch (error) {
        console.log(error);
        throw error; 
    }
}

