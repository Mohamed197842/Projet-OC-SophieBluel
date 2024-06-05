
  
  // Creation des projet

  let allWorks = []; // Variable globale pour stocker les projets
  let allCategories = []; // Variable globale pour stocker les catégories

  async function callApiWorks(){

    const url = 'http://localhost:5678/api/works'
    const fetcher = await fetch(url)
    const json = await fetcher.json();
    allWorks = json // Stocke les projets dans la variable globale
    displayWorks(allWorks); // Affiche tous les projets au chargement initial

  }

  // Afficher les projets dans la galerie

  function displayWorks(works){
    const gallery = document.querySelector("#gallery");
    
    if (gallery) {
      gallery.innerHTML = ''; // Efface le contenu précédent de la galerie
      works.forEach(element => {
        const imgElement = document.createElement('img');
        const titreElement = document.createElement('p');
        imgElement.src = element.imageUrl;
        titreElement.innerText = element.title;
        gallery.appendChild(imgElement);
        gallery.appendChild(titreElement);
      });
    } else {
      console.error('Gallery element not found');
    }

  }



// creation des filtres

async function callApiCategories(){
  const url = 'http://localhost:5678/api/categories'
  const fetcher = await fetch(url);
  const json = await fetcher.json();
  allCategories = json; // Stocke les catégories dans la variable globale
  createFilterButtons(allCategories); // Crée les boutons de filtre
}

function createFilterButtons(categories) {
  
  const filtres = document.querySelector("#filters");
  if (filtres) {
    filtres.innerHTML = ''; // Efface le contenu précédent des filtres
    // Ajouter un bouton pour afficher tous les projets
    const allButton = document.createElement('button');
    allButton.innerText = 'Tous';
    allButton.addEventListener('click', () => displayWorks(allWorks));
    filtres.appendChild(allButton);

    // creation des bouton pour chaque filtres
    categories.forEach(element => {
      const filterButton = document.createElement('button');
      filterButton.innerText = element.name;
      filterButton.addEventListener('click', () => filterWorks(element.id));
      filtres.appendChild(filterButton);
    });
  } else {
    console.error('Filters element not found');
  }

}

// Filtrer les projets en fonction de la catégorie sélectionnée
function filterWorks(categoryId) {
  const filteredWorks = allWorks.filter(work => work.categoryId === categoryId);
  displayWorks(filteredWorks);
}

callApiWorks()

callApiCategories()



// Fonction pour recuperer le token de la page de connexion
function getToken(){
  return localStorage.getItem('authToken');
}

// Fonction pour effectuer des changement si l'utilisateur est 'admin'
function AdminUserChanges() {
  const loginLink = document.getElementById('login');
  if (loginLink){
    loginLink.textContent = 'Log Out';
    loginLink.href = '#';
    //Ajout d'evenement lorsque l'ont click sur 'logout'
    loginLink.addEventListener('click',(e)=>{
      e.preventDefault;
      // Supprimer le token et rediriger vers la page de connexion
      localStorage.removeItem('authToken');
      window.location.href = '/login.html';
    })
  }

  const portfolio = document.querySelector("#porfolio");
  if (portfolio){
    const modifier = document.createElement('button');
    modifier.innerText='modifier';
    portfolio.appendChild(modifier)
  }else {
    console.error('Filters element not found');
  }
}


//function pour verifier la presence du token lors d'une connexion et appliquer les changement si 'admin'
function checkToken(){
  const token = getToken()
  
  if (!token) {
    // Si pas de token, redirigez l'utilisateur vers la page de connexion
    window.location.href = '/login.html';
  } else{
    AdminUserChanges() 
    // Token présent, vous pouvez ajouter des vérifications supplémentaires ici si nécessaire
    console.log('Token présent :',token);  
  }
}

checkToken()
