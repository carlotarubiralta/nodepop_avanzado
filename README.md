# Nodepop

Nodepop es una aplicación para la venta de artículos de segunda mano. Esta aplicación permite a los usuarios buscar artículos por nombre, tipo de anuncio (venta o búsqueda), rango de precio y etiquetas. También proporciona una API para interactuar con los anuncios.

## Características

- Listar anuncios con paginación.
- Filtrar anuncios por nombre, tipo (venta o búsqueda), rango de precio y etiquetas.
- Documentación de API con Swagger.

## Requisitos

- Node.js (v14.x o superior)
- MongoDB

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/carlotarubiralta/nodepop.git
    cd nodepop
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Configura las variables de entorno:
    Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:
    ```
    PORT=3000
    DB_URI=mongodb://localhost:27017/nodepop
    ```

4. Inicia la aplicación:
    ```sh
    npm start
    ```

    Esto iniciará el servidor en `http://localhost:3000`.

## Estructura del Proyecto
nodepop/
│
├── config/
│ └── db.js
│
├── controllers/
│ └── anunciosController.js
│
├── models/
│ └── Anuncio.js
│
├── routes/
│ ├── index.js
│ └── anuncios.js
│
├── public/
│ ├── images/
│ ├── javascripts/
│ └── stylesheets/
│ └── style.css
│
├── views/
│ ├── _header.ejs
│ ├── _footer.ejs
│ ├── error.ejs
│ └── index.ejs
│
├── .env
├── app.js
├── package.json
└── README.md

## Uso

### Página Principal

La página principal lista todos los anuncios con opciones de filtro. Puedes filtrar por:

- Nombre
- Tipo (venta o búsqueda)
- Rango de precio
- Etiquetas

### API

La API permite interactuar con los anuncios mediante los siguientes endpoints:

#### Obtener lista de anuncios

GET /apiv1/anuncios


Parámetros opcionales de consulta:
- `nombre` - Filtrar por nombre.
- `venta` - Filtrar por tipo de anuncio (true para venta, false para búsqueda).
- `precioMin` - Precio mínimo.
- `precioMax` - Precio máximo.
- `tag` - Filtrar por etiqueta.
- `start` - Índice de inicio para la paginación.
- `limit` - Número máximo de resultados.
- `sort` - Orden de los resultados.

Ejemplo:
GET /apiv1/anuncios?nombre=iphone&venta=true&precioMin=100&precioMax=500&tag=mobile


### Documentación de la API

La documentación de la API está disponible en:

http://localhost:3000/api-docs


## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube los cambios a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.