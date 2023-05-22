//
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
  //cuando agregas un curso presionando 'click'
  listaCursos.addEventListener("click", agregarCurso);
  //elimina cursos del carrito
  carrito.addEventListener("click", eleiminaCurso);

  vaciarCarrito.addEventListener("click", () => {
    console.log("vaciar carrito");
    articulosCarrito = []; //reseteamos el carrito
    limpiarCarrito(); //eliminamos todo el html
  });
}

//funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSelect = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSelect);
  }
}

// elimina un cusdo del carrito
function eleiminaCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    //  console.log(e.target.getAttribute("data-id"));
    const cursoId = e.target.getAttribute("data-id");

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    console.log(articulosCarrito);
    carritoHTML(); // volvemos a iterar sobre el carrito y mostrar su html
  }
}

//lee el contenido del html
function leerDatosCurso(curso) {
  //console.log(curso);

  //crear un objeto con el contenido del curso
  const infCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //revisa si un elemento existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infCurso.id);
  if (existe) {
    //actualizar la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infCurso.id) {
        curso.cantidad++;
        return curso; //retorna el objeto actualizado
      } else {
        return curso; //retorna el resto de cursos
      }
    });
  } else {
    articulosCarrito = [...articulosCarrito, infCurso];
  }
  //agrega elementos al arreglo de carritos

  console.log(articulosCarrito);
  carritoHTML();
}

//muestra el carrito en el html
function carritoHTML() {
  // limpiar el html
  limpiarCarrito();
  //recorre el carrito y genera el html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
        <img src='${imagen}' with='100'/>
        </td>
        <td>${titulo} </td>
        <td>${precio}</td>
        <td> ${cantidad}</td>
        <td>
        <a href='#' class='borrar-curso' data-id=${id}> X </a>
        </td>
    `;
    //agrega contenedor de carrito
    contenedorCarrito.appendChild(row);
  });
}

//elimina los cursos del tbody
function limpiarCarrito() {
  //forma lenta
  //contenedorCarrito.innerHTML = "";
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
