# Nodepop

Nodepop es una aplicación para la venta de artículos de segunda mano. Esta aplicación permite a los usuarios buscar y publicar anuncios de artículos en venta.

## Requisitos

- [Node.js](https://nodejs.org/) (v14.x o superior)
- [MongoDB](https://www.mongodb.com/) (v4.x o superior)

## Instalación

Sigue estos pasos para clonar el repositorio, instalar las dependencias y configurar el entorno.

### 1. Clonar el repositorio

```sh
git clone https://github.com/tuusuario/nodepop.git
cd nodepop

```

### 2. Instalar las dependencias

```sh
npm install
```

### 3. Configurar las variables de entorno

```sh
MONGODB_URI=mongodb://localhost:27017/nodepop
```

### 4. Inicializar la base de datos

```sh
npm run initDB
```

### 4. Iniciar la aplicación

```sh
npm start
```

### Uso de la API
La documentación completa de la API está disponible en http://localhost:3000/api-docs.

### Estructura del Proyecto

app.js - Configuración principal de la aplicación.
bin/www - Configuración del servidor.
routes/ - Rutas de la aplicación.
models/ - Modelos de datos de Mongoose.
public/ - Archivos estáticos (CSS, JavaScript, imágenes).
views/ - Plantillas EJS.
Scripts Disponibles
npm start - Inicia la aplicación.
npm run initDB - Inicializa la base de datos con datos de ejemplo.

### Contribuir

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

Haz un fork del proyecto.
Crea una rama con tu nueva característica (git checkout -b feature/nueva-caracteristica).
Haz commit de tus cambios (git commit -am 'Añadir nueva característica').
Sube tus cambios a tu rama (git push origin feature/nueva-caracteristica).
Abre un Pull Request.