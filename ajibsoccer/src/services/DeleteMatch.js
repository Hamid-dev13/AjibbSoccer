// services/DeleteMatch.js
const apiUrl = "http://localhost:3000/matches";

export async function deleteMatch(matchName) {
    try {
        const response = await fetch(`${apiUrl}/${matchName}`, {
            method: "DELETE"
     
            
        });


        if (!response.ok) {
            throw new Error("Une erreur est survenue lors de la suppression du match");
        }

        return response;
    
    } catch (error) {
        console.log(error);
        throw error;
    }
}
