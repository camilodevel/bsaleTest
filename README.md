# bsaleTest

- Para usar la app en local, solo se debe abrir la carpeta index.html en el navegador

- La aplicacion para llamar a los datos usa esta peticion http:

En caso de estar local usar http://localhost:5000/bsaletest/v1/products/
si esta en produccion usar https://backend-bsaletest.herokuapp.com/bsaletest/v1/products/ -- tipo GET

la cual debe devolver este json: 

[
    {
        "id": identificador unico,
        "name": "Nombre",
        "url_image": "URL de la imagen",
        "price": precio,
        "discount": descuento,
        "category": categoria en numero
    },{etc}...
]
