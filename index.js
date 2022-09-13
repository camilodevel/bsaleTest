// let API_URL = 'http://localhost:5000/bsaletest/v1/products/';
let API_URL = 'https://backend-bsaletest.herokuapp.com/bsaletest/v1/products/';
const HTMLResponse      = document.querySelector("#cardsTemplate");
const optionsTemplate   = document.querySelector("#optionsTemplate");


let productos = []

// Funcion para llamar los productos
function mostrarProductos(){
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            imprimirCards(data);
            productos = data;
            
    });
}

// Funcion para llamar las categorias
function mostrarCatgorias(){
    fetch(API_URL+"todas/categorias/")
        .then(response => response.json())
        .then(data => {
            llenarSelect(data);
                        
    });
}

// funcion para llenar select

function llenarSelect(data){
    optionsTemplate.innerHTML = "";

    if(data.length === 0){
        const mensaje = '<option value="vacio">No se encuentran las categorias</option>'
        optionsTemplate.innerHTML = mensaje;
    }else{
        optionsTemplate.innerHTML +=  `<option value="10">Todas</option>`
        for(let cat of data){
            tplOption(cat)
        }
    }
}

// Funcion para validar como llegan los productos
function imprimirCards(data){
    HTMLResponse.innerHTML = "";
    // Si no se encuentran productos manda este mensaje
    if(data.length === 0){
        const mensaje = `<div class="noEncontrado">No se han encontrado productos con ese nombre</div>`;
        HTMLResponse.innerHTML = mensaje; 
    }else{
        // Aqui se valida si el arreglo trae la imgagen, si no la trae muestra una la url por defecto
        const cards = [];
        for(let prod of data){
            if(prod.url_image == null || prod.url_image == ""){
                prod.url_image="https://sipp-pinturerias.com.ar/img/404.png";
                    tplCard(prod)
            }else{
                    tplCard(prod)
            }
        }
    }

}

// Aqui se crea la card de forma dinamica
function tplCard(prod){
    HTMLResponse.innerHTML +=  `<div class="cards" id="cards">
                    <div class="cardSuperior">
                        <div class="imgContain">
                            <img class="img" src="${prod.url_image}">
                        </div>
                        <div class="nombre">${prod.name}</div>
                    </div>
                    <hr>
                    <div class="cardInferior">
                        <div class="precio">$${prod.price}.-</div>
                        <i class="iconoCarrito fa-solid fa-cart-plus"></i>
                    </div>
                </div>`
}

// Aqui se crean las opciones de forma dinamica
function tplOption(cat){
    optionsTemplate.innerHTML +=  `<option value="${cat.id}">${cat.name}</option>`
}

function cargarPorCategoria(e){
    var select = document.getElementById('optionsTemplate');
    const id = parseInt(select.value);
    if(id ===10){
        mostrarProductos();
        return;
    }
    fetch(API_URL+"buscar/categoria/"+id)
        .then(response => response.json())
        .then(data => {
            imprimirCards(data);
                        
    });

}


// Funcion para buscar productos.
function buscar(e){
    const palabra = document.getElementById("palabra").value
    if(!palabra){
        mostrarProductos();
        return;
    }
    fetch(API_URL+"buscar/texto/"+palabra)
        .then(response => response.json())
        .then(data => {
            imprimirCards(data.resultado);
        });
}

mostrarProductos();
mostrarCatgorias();