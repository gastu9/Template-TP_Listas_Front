/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;
    mostrarComidaConForEach(); 
    actualizarFiltros()                 // Asignar el JSON a la variable comidas
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];



const agregarIngredientesBtn = document.getElementById("buton-agregar-ingredientes")
const ingredienteConteiner = document.querySelector(".contenedor-ingredientes")

agregarIngredientesBtn.addEventListener("click", () =>{

  ingredienteConteiner.innerHTML += '  <input  id="ingredientes" class="Ingrediente" type="text"  placeholder="ingredientes de la comida" required>'

})



function mostrarComidaConForEach(){

  const container = document.getElementById('comidaContainer');

  container.innerHTML = "" ;

  comidas.forEach( comida => {
    container.innerHTML +=
    `
    <article class="card">
      <h2  class="titulo">${comida.nombre}</h2>
      <p class="provincia">${comida.provincia}</p>
      <span>${comida.categoria}</span>
      <ul>
       ${comida.ingredientes.map(ingredientes=>`<li>${ingredientes}</li>`).join(``)}
       </ul>
    </article>  
    `
  })


}

//agregar comida:

const agregarcomidaform = document.getElementById('agregar-comida-form');
agregarcomidaform.addEventListener("submit",(event) => {  
  //alert("Comida agregada: " + event.target.nombre.value)
  event.preventDefault()

  const ingredientesInputs = document.querySelectorAll(".ingrediente")
  let ingredientes = []

  ingredientesInputs.forEach(input => {
    ingredientes.push(input.value);
  })

  let comidanueva = {
    nombre: event.target.nombre.value,
    provincia: event.target.provincia.value,
    categoria: event.target.categoria.value,
    ingredientes: ingredientes,

  }
  comidas.push(comidanueva)
  mostrarComidaConForEach(comidas)
  console.log(comidanueva)
  ingredienteConteiner.innerHTML = `<input  id="ingredientes" type="text" class="Ingrediente" placeholder="ingredientes de la comida" required>` 
  event.target.reset()
})

const filtrocategoria = document.getElementById("filtrocategoria")
const filtroprovincia = document.getElementById("filtroprovincia")
const busqueda = document.getElementById("buscador")


//buscador

function filtrar () {
  let comidasFiltradas = comidas.filter ( comida => {
    return comida.categoria.includes(filtrocategoria.value)
        && comida.provincia.includes(filtroprovincia.value)
  })
  mostrarComidaConForEach(comidasFiltradas)

}

filtrocategoria.addEventListener("change", filtrar)
filtroprovincia.addEventListener("change", filtrar)
busqueda.addEventListener("input", buscar)


//buscador

function buscar (){
   let comidasFiltradas = comidas.filter( comida => {
    return comida.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
        || comida.provincia.toLowerCase().includes(busqueda.value.toLowerCase())
        || comida.categoria.toLowerCase().includes(busqueda.value.toLowerCase())
   })
   
   mostrarComidaConForEach (comidasFiltradas)
}



function actualizarFiltros(){

  let categorias = []

  comidas.forEach(comida => {
    if( !categorias.includes(comida.categoria)){
      categorias.push(comida.categoria)
    }

  })
   categorias.forEach(categoria => {

    filtrocategoria.innerHTML += `<option value="${categoria}">${categoria}</option>`

   })

}