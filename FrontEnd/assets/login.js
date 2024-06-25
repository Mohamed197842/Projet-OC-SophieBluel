async function Login() {
  const inputEmail = document.getElementById("email");
  const inputPassword = document.getElementById("password");
  const form = document.getElementById("formConnexion");
  const url = "http://localhost:5678/api/users/login";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailValue = inputEmail.value.trim();
    const passwordValue = inputPassword.value.trim();
    let message = "";

    if (emailValue === "") {
      message = "Veuillez entrer votre email.";
    } else if (passwordValue === "") {
      message = "Veuillez entrer votre mot de passe.";
    } else if (
      emailValue != "sophie.bluel@test.tld" ||
      passwordValue != "S0phie"
    ) {
      message = "identifiants ou mots de passe incorrecte";
    }

    if (message) {
      // Affiche le message d'erreur dans la div 'error-message'
      document.getElementById("error-message").textContent = message;
    } else {
      // Validation des identifiants
      const data = {
        email: emailValue,
        password: passwordValue,
      };

      // Appel d'API
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Problème de connexion");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // Gerer la reponse de l'api
          if (data.token) {
            // Stocker le token
            localStorage.setItem("authToken", data.token);
            // Rediriger vers une autre page ou afficher un message de succès
            console.log("Connexion réussie");
            // Redirection exemple
            window.location.href = "http://127.0.0.1:5501/index.html";
          } else {
            // Afficher le message d'erreur de l'API
            document.getElementById("error-message").textContent =
              data.message || "Erreur de connexion";
          }
        })
        .catch((error) => {
          // Gérer les erreurs de l'appel API
          document.getElementById("error-message").textContent = error.message;
        });
    }
  });
}

Login();
