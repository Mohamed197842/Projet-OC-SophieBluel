
fetch('http://localhost:5678/api/categories')
  .then(response=>{
    return response.json()
  })
  .then(json =>{
    console.log(json)
  })
