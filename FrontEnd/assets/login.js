// Validation du formulaire de connexion 

const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const form = document.getElementById("formConnexion" )

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const emailValue = inputEmail.value.trim();
    const passwordValue = inputPassword.value.trim();
    let message ="";

    if (emailValue === "") {
        message = "Veuillez entrer votre email.";
    } else if (passwordValue === "") {
        message = "Veuillez entrer votre mot de passe.";
    }

    if (message) {
        // Affiche le message d'erreur dans la div 'error-message'
        document.getElementById('error-message').textContent = message;
    }
    else {
        // Soumettre le formulaire ou continuer le traitement
        console.log('Formulaire soumis avec succès');
    }


})
  
// Envoie des données vers l'API avec "post"

const url = 'http://localhost:5678/api/users/login'
const data = {
    email: "sophie.bluel@test.tld",
    password: "S0phie"
};

fetch (url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then( Response=> Response.json())
.then(data =>{
    console.log('Success:', data)
})
.catch((error) => {
    console.error('Error:', error);
}); 
