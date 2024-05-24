
  
  // Creation des projet

  async function callApiWorks(){
       //  Affichage des projet 
    const url = 'http://localhost:5678/api/works'
    const fetcher = await fetch(url)
    const json = await fetcher.json();
    const gallery = document.querySelector("#gallery");

    if (gallery){
      json.forEach(element => {
        const imgElement = document.createElement('img')
        const titreElement = document.createElement('p')
        imgElement.src = element.imageUrl;
        titreElement.innerText = element.title
        
        gallery.appendChild(imgElement);
        gallery.appendChild(titreElement)
        
      });
    } else{
      console.error('Gallery element not found');
    }
} 

callApiWorks()

// creation des filtres

async function callApiCategories(){
  const url = 'http://localhost:5678/api/categories'
  const fetcher = await fetch(url);
  const json = await fetcher.json();
  console.log(json);
  const filtres = document.querySelector("#filters");

  if (filtres){
    json.forEach(element=>{
      const FiltresCategories = document.createElement('button')
      FiltresCategories.innerText = element.name

      filtres.appendChild(FiltresCategories)
    });
  } else{
    console.error('filtres element not found');
  }
}

callApiCategories()


  
