# 🦷 Clínica Dental - Frontend

Interfaz de usuario moderna y responsiva para la gestión de servicios odontológicos, desarrollada con React y Vite.

## 💻 Características Principales
- **Autenticación Segura:** Registro e inicio de sesión de usuarios con manejo de tokens JWT.
- **Gestión de Entidades:** CRUD completo para la administración de Pacientes y Turnos, conectado a la API.
- **Diseño Responsivo:** UI adaptada para visualizarse correctamente en cualquier dispositivo (desde monitores de 2000px hasta celulares de 320px).
- **Consumo de API:** Integración total con el backend mediante fetch/axios, manejando estados de carga y errores de forma centralizada.

## 🚀 Tecnologías Utilizadas
- React + Vite
- React Router DOM (Navegación)
- CSS3 Puro (Media Queries para Responsive Design)

## ⚙️ Instalación y Ejecución Local
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Crear un archivo `.env` en la raíz y configurar la variable de entorno apuntando al backend: `VITE_API_URL=http://localhost:8080` (o la URL de producción).
4. Ejecutar `npm run dev` para iniciar el entorno de desarrollo.

## 🌐 Despliegue
- **URL Web:** [https://clinica-dental-frontend-five.vercel.app]