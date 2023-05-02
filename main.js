
// se crea un nuevo array para el carrito
let carritoDeCompras = []

// Constantes globales que ire usando en el proyecto.
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecNft = document.getElementById('selecNft')
const buscador = document.getElementById('search')


// filtro para buscar por talle
selecNft.addEventListener('change',()=>{
    console.log(selecNft.value);
    if (selecNft.value == 'all') {
        mostrarProductos(stockProductos)
    } else {
        mostrarProductos(stockProductos.filter(el => el.nft == selecNft.value))
        console.log(stockProductos.filter(el => el.nft == selecNft.value));
    }
})


//Buscador
buscador.addEventListener('input', ()=>{
    if (buscador.value == "") {
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(el => el.nombre.toLowerCase().includes(buscador.value.toLowerCase())))
    }
})



// Logica Ecommerce

mostrarProductos(stockProductos)
// funcion donde uso DOM y el for of para mostrar los productos con su div e hijos.
function mostrarProductos (array) {
    contenedorProductos.innerHTML ='';
    for (const producto of array) {
        let div = document.createElement('div')
        div.className = 'producto'
        div.innerHTML += `<div class="card">
                            <div class="card-image">
                                <img src=${producto.img}>
                                <span class="card-title">${producto.nombre}</span>
                                <a id="botonAgregar${producto.id}" class="btn-floating halfway-fab waves-effect waves-light green"><i class="small material-icons">add_shopping_cart</i></a>
                            </div>
                            <div class="card-content">
                                <p>${producto.nft}</p>
                                <p> $${producto.precio}</p>
                            </div>
                        </div>`
        contenedorProductos.appendChild(div);

        // llama a cada boton del producto a medida que hace el for of.
        let btnAgregar = document.getElementById(`botonAgregar${producto.id}`)
        // se queda escuchando cual de todos los productos hace "click".
        btnAgregar.addEventListener('click',()=>{
            agregarAlCarrito(producto.id);
            Swal.fire({
                title: 'Agregado al carrito',
                icon:'success'
                })
        })
    }
}



function agregarAlCarrito(id) {
    let repetido = carritoDeCompras.find(item => item.id == id)
    if(repetido){
        console.log(repetido);
        repetido.cantidad = repetido.cantidad + 1
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id= cantidad${repetido.id}>Cantidad:${repetido.cantidad}</p>`
        actualizarCarrito()
    }else{

        let productoAgregar = stockProductos.find(elemento => elemento.id == id)
        carritoDeCompras.push(productoAgregar)
        actualizarCarrito()
        let div = document.createElement('div')
        div.className = 'productoEnCarrito'
        div.innerHTML =`
                        <p>${productoAgregar.nombre}</p>
                        <p>Precio: $${productoAgregar.precio}</p>
                        <p id= cantidad${productoAgregar.id}>Cantidad: ${productoAgregar.cantidad}</p>
                        <button id=botonEliminar${productoAgregar.id} class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

        let btnEliminar = document.getElementById(`botonEliminar${productoAgregar.id}`)
        btnEliminar.addEventListener('click',()=>{
            console.log(productoAgregar.id);
            btnEliminar.parentElement.remove()                         
            carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id != productoAgregar.id)
            actualizarCarrito()
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
        })
    }
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))   
}


function actualizarCarrito () {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc,el)=> acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)

}


function recuperar() {
    let recuperarLS = JSON.parse(localStorage.getItem('carrito'))
    console.log(recuperarLS);
    if(recuperarLS){
        recuperarLS.forEach(element => {
            agregarAlCarrito(element.id)
        });
    }
}

recuperar()







