let API_URL = 'http://localhost:5000/bsaletest/v1/products/';
const HTMLResponse = document.querySelector("#cardsTemplate");

let productos = []

function buscar(e){
    const palabra = document.getElementById("palabra").value

    const newArray = []

    for(let producto of productos){
        let nombre = producto.name.toLowerCase();
        if( nombre.indexOf(palabra) !== -1){
            newArray.push(producto);
            imprimirCards(newArray);
        }else{
            imprimirCards(newArray);
        }
    }

}

function imprimirCards(data){

    if(data.length === 0){
        const mensaje = `<div>No se ha encontrado productos con ese nombre</div>`;
        HTMLResponse.innerHTML = mensaje; 
    }else{
        const cards = [];
        for(let prod of data){
            if(prod.url_image == null){
                console.log(prod);
                cards.push( 
                    `<div class="cards" id="cards">
                    <div class="cardSuperior">
                    <img class="img" src="https://sipp-pinturerias.com.ar/img/404.png">
                        <div class="nombre">${prod.name}</div>
                    </div>
                    <hr>
                    <div class="cardInferior">
                        <div class="precio">$${prod.price}.-</div>
                        <i class="iconoCarrito fa-solid fa-cart-plus"></i>
                    </div>
                </div>`)
            }else{
                cards.push( 
                    `<div class="cards" id="cards">
                    <div class="cardSuperior">
                    <img class="img" src="${prod.url_image}">
                        <div class="nombre">${prod.name}</div>
                    </div>
                    <hr>
                    <div class="cardInferior">
                        <div class="precio">$${prod.price}.-</div>
                        <i class="iconoCarrito fa-solid fa-cart-plus"></i>
                    </div>
                </div>`)
            }
        }

        // const cards = data.map((prod) => 
        
        // // if(prod.url_image == null){}
        
        // `<div class="cards" id="cards">
        //     <div class="cardSuperior">
        //     <img class="img" src="${prod.url_image}">
        //         <div class="nombre">${prod.name}</div>
        //     </div>
        //     <hr>
        //     <div class="cardInferior">
        //         <div class="precio">$${prod.price}.-</div>
        //         <i class="iconoCarrito fa-solid fa-cart-plus"></i>
        //     </div>
        // </div>`
        // );
        // https://sipp-pinturerias.com.ar/img/404.png
        HTMLResponse.innerHTML = cards;
    }

}

function mostrarProductos(){
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {

            imprimirCards(data);
            productos = data;
            
    });
}

mostrarProductos();