/**
 * @Author: Your name
 * @Date:   2023-08-11 19:09:46
 * @Last Modified by:   Your name
 * @Last Modified time: 2023-09-02 14:55:09
 */


/* -------------------------------------------- */
const botonCarrito = document.querySelector('.container-cart-icon');
const containerCarritoProductos = document.querySelector('.container-cart-products');

botonCarrito.addEventListener('click', () => {
	containerCarritoProductos.classList.toggle('hidden-cart');
});

/* ========================= */
const carritoInfo = document.querySelector('.cart-product');/* const cartInfo = document.querySelector('.cart-product'); */
const menuProducto = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const listaDeProductos = document.querySelector('.container-items');

////////////



let carrito;

const productoEnLS = JSON.parse(localStorage.getItem("carrito"));
if (productoEnLS){
carrito = productoEnLS;

} else {
    
    carrito = [];  
  }


  // Variable de arreglos de Productos

const valorTotal = document.querySelector('.total-pagar');
const contarProductos = document.querySelector('#contador-productos');
const carritoVacio = document.querySelector('.cart-empty');
const carritoTotal = document.querySelector('.cart-total');
const finalizarLaCompra = document.querySelector("#finalizarCompra");

/* ---------------------------------------------------------------------- */


listaDeProductos.addEventListener('click', e => {/* ('.container-items') */
	if (e.target.classList.contains('btn-add-cart')) {/* si cargo una materia */
 /*  estadoAcademico();  */
 		const producto = e.target.parentElement;	
    const infoProductos = {
			cantidad: 1,
			titulo: producto.querySelector('h2').textContent,
			precio: producto.querySelector('p').textContent,
		};

		const estaPresente = carrito.some(
			producto => producto.titulo === infoProductos.titulo/* recorro el carrito buscando si ya cargue la mat que elijo 
      funcion me fijo  si producto.titulo === infoProductos.titulo */
		);
		        if (estaPresente) {
		        	const products = carrito.map(producto => {
		        		if (producto.titulo === infoProductos.titulo) {
		        			
				
							return producto;  
					
		        		} else {			
		        			return producto;				
							
                }
		        	});
					Swal.fire({
						icon: "error",
						title: "Ya estás anotado en esta materia",
						text: "Podes anotarte en otra materia pero no en la misma"
					  });

	carrito = [...products]; 
		} else {
			Swal.fire({
				icon: "success",
				title: "Producto agregado",
			   text: `Se ha agregado el producto "${infoProductos.titulo}" a la lista.`,
				timer: 3000 // Tiempo en milisegundos para cerrar la ventana automáticamente
			  });
	carrito = [...carrito, infoProductos];
			 					}
		showHTML();
  
    
  }
});


/* MENUProducto......es el card con los  productos que aparecen al seleccionarlos */
 menuProducto.addEventListener('click', e => {

	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const titulo = product.querySelector('p').textContent;

		carrito = carrito.filter(
			product => product.titulo !== titulo
		);
		console.log(carrito);
		showHTML();
	}
});



// Funcion para mostrar  HTML
const showHTML = () => {
	if (!carrito.length) {
		carritoVacio.classList.remove('hidden');
		menuProducto.classList.add('hidden');
		carritoTotal.classList.add('hidden');
	} else {
		carritoVacio.classList.add('hidden');
		menuProducto.classList.remove('hidden');
		carritoTotal.classList.remove('hidden');
	}



  // Limpiar HTML
	menuProducto.innerHTML = '';

	let total = 0;
	let totaldeProductos = 0;

  carrito.forEach(producto => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${producto.cantidad}</span>
                <p class="titulo-producto-carrito">${producto.titulo}</p>
                <span class="precio-producto-carrito">${producto.precio}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;


		menuProducto.append(containerProduct);	
		total = total + parseInt(producto.cantidad * producto.precio.slice(1));
    totaldeProductos = totaldeProductos + producto.cantidad;
  
 
    localStorage.setItem("carrito",JSON.stringify(carrito));    
	});
	valorTotal.innerText = `$${total}`;
	const carritoJSON = JSON.stringify(carrito);
	localStorage.setItem("carrito", carritoJSON);
	contarProductos.innerText =  totaldeProductos;  

};







 function recuperarLocalStorage () {  
  const productoEnLS = JSON.parse(localStorage.getItem ("carrito"));
  console.log(productoEnLS)

    Swal.fire({
      title: "Lista de Productos",
      html: `<h3>Lista de Materias</h3>
      <ul>${carrito.map(producto => `<li> -${producto.titulo}-${producto.precio}-</li>`).join("")}</ul>`,
      confirmButtonText: "Cerrar"
    }); 
  }

const agregarBtn = document.getElementById("recuperarLS");
agregarBtn.addEventListener("click", () => {
  recuperarLocalStorage ();
});




/* FINALIZA COMPRA-BORRA LO QUE HAY EN EL CARRITO Y EN EL LS */
finalizarLaCompra.addEventListener("click",vaciarCarrito);
function vaciarCarrito(){
	
if(carrito.length > 0){
	carrito.length = 0;
	localStorage.setItem("carrito",JSON.stringify(carrito));
	carritoVacio.classList.remove('hidden');
	menuProducto.classList.add('hidden');
	carritoTotal.classList.add('hidden');
	Swal.fire({
		icon: "success",
		title: "Gracias por tu compra",
	   text: `Si te olvidaste algún producto puedes volver a sumarlo al carrito`,
		timer: 3000 // Tiempo en milisegundos para cerrar la ventana automáticamente
	  });
	} else {

		Swal.fire({
			icon: "error",
			title: "El carrito está vacío",
			text: "Ingresa algún producto"
		  });
	}
}


