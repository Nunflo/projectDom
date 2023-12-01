import './style.css'
import Swal from 'sweetalert2'

let todos = []

document.querySelector('#app').innerHTML = `
<nav class="navbar bg-body-tertiary">
<div class="container-fluid">
 <form class="d-flex" role="search">
  <input class="form-control me-2" type="search" placeholder="Palabras magicas..." aria-label="Search">
   <button class="btn btn-outline-success" type="submit">Buscar</button>
 </form>
</div>
</nav>

<!-- Contenido principal -->
<div class="container mt-4">
<div class="row" id="commentGrid">
 <h1>Bienvenido a Blog Post</h1>
 <p>Selecciona el modo de vista que mas te agrade!</p>
 <button id="darkMode">Dark Mode</button>
 <button id="lightMode">Ligth Mode</button>
 <button id="pokeMode">Pokemon Mode</button>
</div>
</div>

<!-- Formulario para agregar comentarios -->
  <div class="card mt-5 container" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Agrega tu nuevo Post aqui!</h5>
 
    <form id="form">
      <div class="mb-3">
        <input type="text" id="title" class="form-control" placeholder="Ingresa el Titulo">
        <p class="text-danger" id="error-title"></p>
      </div>
 
      <div class="mb-3">
        <textarea id="description" class="form-control" placeholder="Describe o dejame tu Post"></textarea>
        <p class="text-danger" id="error-description"></p>
      </div>
 
      <div class="d-grid gap-2">
        <button type="submit" class="btn btn-primary">Add new to do</button>
      </div>
    </form>
 
  </div>
  </div>
 
 
  <section class="row container mt-5" id="todos">
 
  </section>

  <!-- Footer -->
<footer class="bg-dark text-light text-center py-3">
 <p>&copy;Equipo 5 Kodigo</p>
</footer> 
 
`

  //Interaccion del modo backgroud
document.querySelector("#darkMode").addEventListener("click",  ( ) =>{
document.documentElement.className = "dark"
console.log(modedark)
})

document.querySelector("#lightMode").addEventListener("click",  ( ) =>{
document.documentElement.className = "light"
})

document.querySelector("#pokeMode").addEventListener("click",  ( ) =>{
document.documentElement.className = "Pokemon"
})

//
document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault()
 
  // Obtener los datos
  const title = document.querySelector('#title').value
  const description = document.querySelector('#description').value
 
// Requisito para continuar con el envio de formulario
  if(title === ''){
    document.querySelector('#error-title').innerHTML = 'Title is required'
    return
  } else if (description === ''){
    document.querySelector('#error-description').innerHTML = 'Description is required'
    return
  }
 
  // Agregar una nueva tarea al arreglo de objetos
  todos.push({
    title,
    description,
    'status': 'pending'
  })
 
  // Limpiar el formulario
  document.querySelector('#title').value = ''
  document.querySelector('#description').value = ''
 
  // 
  Swal.fire({
    icon: 'Enviado',
    title: 'Enviado correctamente',
    text: 'Post Enviado',
  })
 
  showTodos()
 
})
 
const showTodos = () => {
  document.querySelector('#todos').innerHTML = ''
 
  todos.map((todo)=>{
    document.querySelector('#todos').innerHTML += `
      <div class="col-sm-12 col-md-4">
      <div class="card">
          <div class="card-body">
              <h5 class="card-title">${todo.title}</h5>
              <p>${todo.description}</p>
          </div>
        </div>
      </div>
    `
  })
}


// LISTA DE TAREAS

// Seleccionar los elementos
const input = document.querySelector('input')
const addBtn = document.querySelector('.btn-add')
const ul = document.querySelector('ul')
const empty = document.querySelector('.empty')

addBtn.addEventListener('click', (e) => { //Agrego evento al boton
  e.preventDefault()// Evita que el form recargue la pagina
  const text = input.value //Toma el valor de la tarea y la guarda en la variable

  const li = document.createElement('li') //Creamos variables para agregar a las funciones del index
  const p = document.createElement('p')
  p.textContent = text

  li.appendChild(p)//Agregando el parrafo al li y el li al ul
  ul.appendChild(li)
  li.appendChild(addDeleteBtn()) // llama a la funcion, crea el boton, agrega el listener y lo agrega al li

  input.value = "" //Eliminar el texto ya escrito
  empty.style.display = "none"
})

  function addDeleteBtn() { //Boton que borra
  const deleteBtn = document.createElement('button') //crea el boton
  
  deleteBtn.textContent = "X"
  deleteBtn.id = "btn-delete"

  deleteBtn.addEventListener('Click', (e) => { 
    const item = e.target.parentElement //Del elemento selecciona la variable del boton y elimina el papa
    ul.removeChild(item) // borra el element desde la ul
  
  //que vuelva a aparecer cuando no haya elementos
    const items = document.querySelectorAll('li')

    if (items.length === 0){ //verifica que haya li
      empty.style.display = "block"
    }
  })
  return deleteBtn
  }