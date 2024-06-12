
  
  // Creation des projet

  let allWorks = []; // Variable globale pour stocker les projets
  let allCategories = []; // Variable globale pour stocker les catégories

  async function callApiWorks(){

    const url = 'http://localhost:5678/api/works'
    const fetcher = await fetch(url)
    const json = await fetcher.json();
    allWorks = json // Stocke les projets dans la variable globale
    displayWorks(allWorks); // Affiche tous les projets au chargement initial
    displayWorksModale(allWorks); // Affiche tous les projets dans la modale au chargement initial 
    console.log(json);

  }

  // Afficher les projets dans la galerie

  function displayWorks(works){
    const gallery = document.querySelector("#gallery");
    
    if (gallery) {
      gallery.innerHTML = ''; // Efface le contenu précédent de la galerie
      works.forEach(element => {
        const figureElement = document.createElement('figure')
        const imgElement = document.createElement('img');
        const titreElement = document.createElement('figcaption');
        
        figureElement.setAttribute('class', `work-item category-id-0 category-id-${element.categoryId}`);
        figureElement.setAttribute('id', `work-item-${element.id}`);
        
        imgElement.src = element.imageUrl;
        titreElement.innerText = element.title;
        
        gallery.appendChild(figureElement)
        figureElement.appendChild(imgElement);
        figureElement.appendChild(titreElement);
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




// JAVASCRIPT DE LA PARTIE ADMIN//



// Fonction pour recuperer le token de la page de connexion
function getToken(){
  return localStorage.getItem('authToken');
}

//function pour verifier la presence du token lors d'une connexion et appliquer les changement si 'admin'
function checkToken(){
  const token = getToken()
  
  if (!token) {
    // Si pas de token, redirigez l'utilisateur vers la page de connexion
  } else{
    AdminUserChanges()
    // Token présent, vous pouvez ajouter des vérifications supplémentaires ici si nécessaire
    console.log('Token présent :',token);  
  }
}

// Fonction qui reset la page 'admin' par default
function resetPage(){
  
  const loginLink = document.getElementById('login');
  if (loginLink) {
    loginLink.textContent = 'Log In';
    loginLink.href = '/login.html';
    loginLink.removeEventListener('click', logoutHandler); // Supprimer l'événement de déconnexion
  }

  const filtres = document.querySelector("#filters");
  if (filtres) {
    // Supprimer tous les boutons de filtres
    filtres.style.display ='flex';
  }

  const ajoutBtn = document.querySelector("#text-btnModifier");
  if (ajoutBtn) {
    // Supprimer le bouton modifier si présent
    const boutonModifier = ajoutBtn.querySelector('button');
    if (boutonModifier) {
      ajoutBtn.removeChild(boutonModifier);
    }
  }

}
// Fonction qui va appliquer la fonction de 'reset' lorsque l'ont appuie sur "logout"
function logoutHandler(e) {
  e.preventDefault(); // Empêcher le comportement par défaut du lien
  console.log('Logout handler called'); // Log pour débogage
  // Supprimer le token et réinitialiser l'état de la page sans redirection
  localStorage.removeItem('authToken');
  resetPage();
}


// Fonction pour effectuer des changement si l'utilisateur est 'admin'
function AdminUserChanges() {
  const loginLink = document.getElementById('login');
  if (loginLink){
    loginLink.textContent = 'Log Out';
    loginLink.href = '#';
    //Ajout d'evenement lorsque l'ont click sur 'logout' par appliquer la fonction du bouton "logout" qui remet la page par default
    loginLink.addEventListener('click',logoutHandler)
  }
  const filtres = document.querySelector("#filters");
  if (filtres) {
    // Supprimer tous les boutons de filtres
    filtres.style.display ='none';
  }
  const ajoutBtn = document.querySelector("#text-btnModifier")
  if(ajoutBtn){
    const boutonModifier = document.createElement('button');
    const iconModifier = document.createElement('i')
    iconModifier.classList.add('fa-regular', 'fa-pen-to-square');
    boutonModifier.appendChild(iconModifier)
    boutonModifier.appendChild(document.createTextNode(' modifier')); 
    ajoutBtn.appendChild(boutonModifier);

    boutonModifier.addEventListener('click', function() {
      // Actions à effectuer lors du clic sur le bouton
      console.log('Bouton modifier cliqué');
      const afficherModale = document.querySelector('.modal-overlay');
        
      if (afficherModale) {
          afficherModale.style.display = 'flex';
          afficherModale.setAttribute('aria-hidden', 'false'); // Optionnel, pour l'accessibilité
      } else {
          console.error('Aucun élément avec la classe .modal-overlay trouvé.');
      }
    });
  }
  // Changement des diplay en fonction des 'click' dans la modale
  const ajoutPhoto = document.getElementById('Ajout-projet')
  const afficherModaleworks = document.getElementById('Modale-works')
  const afficherModaleAjout = document.getElementById('ModaleAjoutPhoto')
  if(ajoutPhoto){
    ajoutPhoto.addEventListener('click',function() {
      console.log('Bouton ajouter cliqué');
      afficherModaleworks.style.display = 'none'
      afficherModaleAjout.style.display = 'block'
    })
  }
  // Fermer la modale avec le bouton 'croix' 
  const fermerModale = document.querySelectorAll("button[name='boutonFermer']");
  if (fermerModale.length > 0) {
    fermerModale.forEach(fermerModale => {
        fermerModale.addEventListener('click', function() {
            console.log('Bouton fermé cliqué');
            const afficherModale = document.querySelector('.modal-overlay');
            afficherModale.style.display = 'none';
            afficherModale.setAttribute('aria-hidden', 'true'); // Optionnel, pour l'accessibilité
        });
    });
  } 
  // retour en arriere avec le bouton 'fleche'
  const retourModale = document.getElementById('flecheRetour')
  if(retourModale){
    retourModale.addEventListener('click', function(){
      console.log('bouton retour cliquer')
      afficherModaleAjout.style.display ='none'
      afficherModaleworks.style.display = 'block'
    })
  }

}
 // affichage des projet dans la gallerie de la modale
function displayWorksModale(works){
  const galleryModale = document.querySelector("#Modale-content");
  
  if (galleryModale) {
    galleryModale.innerHTML = ''; // Efface le contenu précédent de la galerie
    works.forEach(element => {
      const figureElement = document.createElement('figure')
      const imgElement = document.createElement('img');
      const logoSuppr = document.createElement('i');

      figureElement.setAttribute('class', `work-item category-id-0 category-id-${element.categoryId}`);
      figureElement.setAttribute('id', `work-item-${element.id}`);

      imgElement.src = element.imageUrl;
      logoSuppr.classList.add('fa-solid', 'fa-trash-can', 'trash')

      galleryModale.appendChild(figureElement);
      figureElement.appendChild(imgElement);
      figureElement.appendChild(logoSuppr);

      // Configurer le bouton de suppression
      logoSuppr.addEventListener('click', () => {
        console.log('Deleting work with ID:', element.id);
        deleteWorkById(element.id);
      });
    });
  } else {
    console.error('Gallery element not found');
  }

}

checkToken()

// Fonction pour ajouter ou supprimer un projet de l'api avec la modale

async function deleteWorkById(workId) {
  const url = `http://localhost:5678/api/works/${workId}`;
  const token = getToken();

  console.log('Token récupéré depuis le localStorage:', token);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      }
    });

    if (response.ok) {
      // Supprime le projet de la liste globale allWorks
      allWorks = allWorks.filter(work => work.id !== workId);
      
      // Met à jour l'affichage après la suppression
      displayWorks(allWorks);
      displayWorksModale(allWorks);
      
      console.log(`Project with ID ${workId} deleted successfully.`);
    } else {
      console.error(`Failed to delete project with ID ${workId}:`, response.statusText);
    }
  } catch (error) {
    console.error('Error deleting project:', error);
  }
}


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
