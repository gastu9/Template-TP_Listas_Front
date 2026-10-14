/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;
    mostrarComidaConForEach();                  // Asignar el JSON a la variable comidas
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const container = document.getElementById('comidaContainer');

function mostrarComidaConForEach(){
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
  alert("Comida agregada: " + event.target.nombre.value)
  event.preventDefault()
  let comidanueva = {
    nombre: event.target.nombre.value,
    provincia: event.target.nombre.value,
    categoria: event.target.nombre.value,
    ingredientes: event.target.nombre.value.split(","),

  }
  comidas.push(comidanueva)
  mostrarComidaConForEach(comidas)
  console.log(comidanueva)
  event.target.reset()
})

const filtrocategoria = document.getElementById("filtrocategoria")
const filtroprovincia = document.getElementById("filtroprovincia")


function filtrar () {
  let comidasFiltradas = comidas.filter ( comida => {
    return comida.categoria.includes(filtrocategoria.value)
        && comida.provincia.includes(filtroprovincia.value)
      



  })
}