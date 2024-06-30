# Nodepop

Nodepop es una aplicación de anuncios clasificados que permite a los usuarios buscar, vender y comprar artículos. La aplicación está construida con Node.js, Express y MongoDB, y proporciona un API que puede ser utilizado por otros desarrolladores para construir aplicaciones móviles o web.

## Características

- Autenticación JWT
- Internacionalización (Español e Inglés)
- Subida de imágenes con generación de thumbnails en background
- API para crear, listar y filtrar anuncios

## Requisitos

- Node.js v14.17.0 o superior
- MongoDB v4.4 o superior

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/carlotarubiralta/nodepop_avanzado.git
   cd nodepop_avanzado

2. Instala las dependencias:
```bash
npm install
```
3. Configura las variables de entorno:
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
```bash
PORT=3000
DB_URI=mongodb://localhost:27017/nodepop
JWT_SECRET=your_jwt_secret
```
4. Inicializa la base de datos:

```bash
npm run initDB
```
5. Inicia la aplicación:

```bash
npm start
```
# Uso

1. Endpoints

Autenticación
POST /api/authenticate: Autentica al usuario y devuelve un token JWT.
```json
{
  "email": "user@example.com",
  "password": "1234"
}
````

Anuncios
- GET /apiv1/anuncios: Lista de anuncios con filtros y paginación.
Parámetros: tag, venta, precio, nombre, start, limit, sort
- POST /apiv1/anuncios: Crea un nuevo anuncio.
Campos: nombre, venta, precio, tags, foto

2. Internacionalización
La aplicación soporta Español e Inglés. Puedes cambiar el idioma usando el parámetro lang en las URLs.

3. Subida de Imágenes
Las imágenes subidas se procesan para generar thumbnails de 100x100 píxeles.

# Estructura del Proyecto
/bin: Contiene el archivo de inicio del servidor.

/controllers: Contiene los controladores de la aplicación.

/lib: Contiene configuraciones y utilidades (conexión a MongoDB, configuración de i18n, colas).

/middlewares: Contiene middlewares para el manejo de archivos.

/models: Contiene los modelos de datos.

/public: Contiene archivos estáticos (imágenes, CSS).

/routes: Contiene las rutas de la API.

/tests: Contiene los archivos de pruebas.

/views: Contiene las vistas y plantillas EJS.

app.js: Configuración principal de la aplicación.

package.json: Configuración del proyecto y dependencias.


# Pruebas
Para ejecutar las pruebas:
```bash
npm test
```
# Despliegue
Para desplegar la aplicación en producción, asegúrate de configurar correctamente las variables de entorno y usa un gestor de procesos como PM2:

```bash
npm run devPM2
```
# Contribución
Haz un fork del proyecto.
Crea una nueva rama (git checkout -b feature-nueva-funcionalidad).
Haz commit de tus cambios (git commit -am 'Añade nueva funcionalidad').
Empuja la rama (git push origin feature-nueva-funcionalidad).
Abre un Pull Request.
