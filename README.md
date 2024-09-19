# FlatFinder

FlatFinder es una aplicación web desarrollada con React y Vite que permite a los usuarios crear y publicar departamentos disponibles en su país. La aplicación facilita la búsqueda de departamentos para aquellos que están en busca de un nuevo hogar y cuenta con un sistema de chat en tiempo real que permite la comunicación directa entre usuarios y propietarios.

## Características

- **Publicación de Departamentos**: Los usuarios pueden crear y publicar anuncios de departamentos.
- **Búsqueda Eficiente**: Facilita a los usuarios encontrar departamentos disponibles según sus preferencias.
- **Chat en Tiempo Real**: Comunicación instantánea entre usuarios y propietarios para resolver dudas o coordinar visitas.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida y optimizada.
- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor utilizado para gestionar dependencias.
- **Tailwind CSS**: Framework de CSS para estilos modernos y responsivos.
- **Firebase**: Plataforma de desarrollo que proporciona base de datos y autenticación.
- **Valibot**: Herramienta para validaciones en formularios.
- **Tailwind Scrollbar Hide**: Para ocultar las barras de desplazamiento en Tailwind.
- **Iconify**: Para incluir iconos de manera sencilla.

## Configuraciones necesarias

- **Instala las dependencias:** Asegúrate de tener Node.js instalado en tu máquina, luego ejecuta: npm install
- **Configura las credenciales de Firebase:** Crea un archivo **.env** en la raíz del proyecto y añade tus claves de Firestore:
  VITE_FIREBASE_API_KEY= tu_api_key
  VITE_FIREBASE_AUTH_DOMAIN= tu_auth_domain
  VITE_FIREBASE_PROJECT_ID= tu_project_id
  VITE_FIREBASE_STORAGE_BUCKET= tu_storage_bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID= tu_messaging_sender_id
  VITE_FIREBASE_APP_ID= tu_app_id
