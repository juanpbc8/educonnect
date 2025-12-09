# EduConnect - Plataforma Educativa Universitaria

**EduConnect** es una plataforma web moderna diseñada para conectar a estudiantes universitarios peruanos con recursos académicos, tutores y una comunidad activa. Desarrollada con **React 18 + Vite**, ofrece una experiencia rápida, interactiva y responsive.

---

## 🚀 Características Principales

### 1. 🏠 **Home - Landing Page**

- Hero section con llamadas a la acción
- Tarjetas de características principales
- Estadísticas en tiempo real
- Testimonios de estudiantes
- Footer completo con enlaces sociales

### 2. 📚 **Recursos Académicos**

- Catálogo de 50+ recursos (guías, videos, libros, herramientas)
- Filtrado avanzado por tipo, materia y universidad
- Búsqueda en tiempo real
- Cards interactivas con etiquetas de tipo
- Enlaces externos a recursos educativos

### 3. 💬 **Foro Comunitario**

- Sistema de posts con categorías (Dudas, Recursos, Eventos)
- Ordenamiento (Recientes, Populares, Sin Respuesta)
- Votación (upvote/downvote)
- Sistema de etiquetas/tags
- Modal para crear nuevos posts
- Contadores de respuestas y vistas

### 4. 👨‍🏫 **Tutorías**

- 8 tutores verificados de universidades peruanas (UTP, UNMSM, UPC, PUCP, UNI, USMP)
- Filtrado por materia, universidad, precio, calificación, modalidad
- Sistema de calificaciones con estrellas (0-5)
- Badges de verificación para tutores confiables
- Modal de contacto con validación de formulario
- Avatares con fallback a UI Avatars API
- Precios en Soles (S/. 25-50 por hora)

---

## 🛠️ Stack Tecnológico

### Frontend

- **React 18.3.1**: Biblioteca JavaScript para interfaces de usuario
- **React Router DOM 7.1.1**: Navegación SPA con enrutamiento
- **Vite 6.0.5**: Build tool ultrarrápido con HMR
- **Bootstrap 5.3.2**: Framework CSS para diseño responsive
- **Bootstrap Icons 1.11.3**: Iconos vectoriales

### Herramientas de Desarrollo

- **ESLint 9.18.0**: Linter para calidad de código
- **Vite Plugin React**: Fast Refresh con Babel

### APIs Externas

- **UI Avatars API**: Generación de avatares dinámicos
- **Google Fonts**: Fuente Inter para tipografía moderna

---

## 📂 Estructura del Proyecto

```
educonnect/
├── public/                      # Archivos estáticos
├── src/
│   ├── assets/
│   │   └── data.json           # Datos de recursos, posts, tutores
│   ├── components/
│   │   ├── common/             # Componentes reutilizables
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Navbar.jsx
│   │   ├── home/               # Componentes del Home
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Stats.jsx
│   │   │   └── Testimonials.jsx
│   │   ├── forum/              # Componentes del Foro
│   │   │   ├── ForumSidebar.jsx
│   │   │   ├── ForumPostCard.jsx
│   │   │   └── CreatePostModal.jsx
│   │   ├── tutors/             # Componentes de Tutorías
│   │   │   ├── TutorFilters.jsx
│   │   │   ├── TutorCard.jsx
│   │   │   └── ContactModal.jsx
│   │   └── ui/                 # Componentes UI genéricos
│   ├── layouts/
│   │   └── MainLayout.jsx      # Layout principal con Navbar
│   ├── pages/
│   │   ├── Home.jsx            # Página de inicio
│   │   ├── Resources.jsx       # Página de recursos
│   │   ├── Forum.jsx           # Página del foro
│   │   └── Tutors.jsx          # Página de tutorías
│   ├── styles/
│   │   └── Studio.css          # Estilos globales y personalizados
│   ├── App.jsx                 # Componente raíz con router
│   ├── App.css                 # Estilos del App
│   ├── main.jsx                # Punto de entrada
│   └── index.css               # Estilos base
├── package.json
├── vite.config.js
└── README.md                   # Este archivo
```

---

## 🚦 Instalación y Uso

### Prerrequisitos

- **Node.js**: v18+ (recomendado v20)
- **npm**: v9+ o **yarn** / **pnpm**

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd edu-connect/educonnect
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

### 4. Build para producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### 5. Previsualizar build de producción

```bash
npm run preview
```

---

## 📄 Scripts Disponibles

| Comando           | Descripción                                     |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Inicia servidor de desarrollo con HMR           |
| `npm run build`   | Genera build de producción optimizado           |
| `npm run preview` | Previsualiza el build de producción             |
| `npm run lint`    | Ejecuta ESLint para verificar calidad de código |

---

## 🎨 Características de Diseño

### Paleta de Colores (CSS Variables)

```css
--primary: #2563eb        /* Azul principal */
--primary-dark: #1d4ed8   /* Azul oscuro */
--primary-light: #dbeafe  /* Azul claro */
--secondary: #7c3aed      /* Morado */
--accent: #06b6d4         /* Cyan */
--success: #10b981        /* Verde */
--warning: #f59e0b        /* Amarillo */
--danger: #ef4444         /* Rojo */
```

### Tipografía

- **Fuente principal**: Inter (Google Fonts)
- **Tamaños**: Sistema de escalado con rem
- **Pesos**: 400 (regular), 600 (semibold), 700 (bold)

### Responsive Breakpoints

- **Mobile**: < 768px (diseño de 1 columna)
- **Tablet**: 768px - 991px (diseño de 2 columnas)
- **Desktop**: ≥ 992px (diseño de 3 columnas)

---

## 🌟 Características Técnicas Avanzadas

### 1. URL State Management

Los filtros y búsquedas se sincronizan con la URL usando `useSearchParams`:

```javascript
// Ejemplo: /recursos?tipo=Video&materia=Matemáticas
// Ejemplo: /tutorias?university=UTP&minRating=4.5
```

**Beneficios**:

- URLs compartibles
- Navegación del navegador (atrás/adelante)
- Bookmarks de búsquedas

### 2. Performance Optimizations

- **useMemo**: Filtrado eficiente sin re-renders innecesarios
- **Lazy Loading**: Componentes cargados bajo demanda
- **Code Splitting**: Chunks separados por página
- **Vite HMR**: Hot Module Replacement ultrarrápido

### 3. Fallback Systems

- **Avatares**: UI Avatars API para imágenes faltantes
- **Datos**: Arrays vacíos por defecto para prevenir crashes
- **Imágenes**: Placeholders para recursos sin imagen

### 4. Form Validation

- **Modal de Contacto**: Validación de email, campos requeridos, longitud mínima
- **Modal de Crear Post**: Validación de título, contenido, categoría
- **Feedback visual**: Estados is-invalid con mensajes de error

---

## 📊 Datos de la Aplicación

### Recursos Académicos

- **Total**: 50+ recursos
- **Tipos**: Guías de Estudio, Videos, Libros, Herramientas Online
- **Universidades**: UTP, UNMSM, UPC, PUCP, USIL
- **Materias**: Matemáticas, Programación, Física, Química, Inglés, etc.

### Foro Comunitario

- **Posts iniciales**: 5 posts de ejemplo
- **Categorías**: Dudas Académicas, Recursos, Eventos
- **Funcionalidades**: Votación, respuestas, tags, búsqueda

### Tutores

- **Total**: 8 tutores verificados
- **Tipos**:
  - 3 Estudiantes Avanzados
  - 3 Egresados
  - 2 Profesores
- **Universidades**: UTP, UNMSM, UPC, PUCP, UNI, USMP
- **Rango de precios**: S/. 25 - S/. 50 por hora
- **Promedio de rating**: 4.6 estrellas

---

## 🔧 Configuración Adicional

### Vite Config (vite.config.js)

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
```

### ESLint Config (eslint.config.js)

- Reglas de React Hooks habilitadas
- Warnings para console.log en producción
- Auto-fix de problemas de formato

---

## 🚧 Roadmap - Futuras Mejoras

### Fase 1: Backend Integration

- [ ] API REST con Node.js + Express
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Sistema de autenticación (JWT)
- [ ] Almacenamiento de archivos (AWS S3)

### Fase 2: Funcionalidades Avanzadas

- [ ] Sistema de notificaciones en tiempo real
- [ ] Chat entre estudiantes y tutores
- [ ] Calendario de sesiones de tutoría
- [ ] Sistema de pagos (Culqi/Niubiz)
- [ ] Reviews y calificaciones de tutores

### Fase 3: Social Features

- [ ] Perfiles de usuario personalizables
- [ ] Sistema de seguimiento de tutores
- [ ] Foro con threads anidados
- [ ] Gamificación (puntos, badges)
- [ ] Recomendaciones personalizadas (ML)

### Fase 4: Mobile & PWA

- [ ] Progressive Web App (PWA)
- [ ] Aplicación móvil nativa (React Native)
- [ ] Notificaciones push
- [ ] Modo offline

---

## 🤝 Contribución

Las contribuciones son bienvenidas! Para contribuir:

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guidelines de Contribución

- Seguir la estructura de componentes existente
- Usar camelCase para nombres de variables
- Comentar código complejo
- Mantener consistencia con estilos CSS
- Actualizar documentación si es necesario

---

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor abre un **Issue** con:

- Descripción detallada del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Navegador y versión

---

## 📜 Licencia

Este proyecto es un desarrollo académico para demostración de habilidades en React y desarrollo web moderno.

---

## 👨‍💻 Autor

**EduConnect Development Team**  
Proyecto de migración de HTML legacy a React + Vite  
Enero 2025

---

## 🙏 Agradecimientos

- **React Team**: Por la increíble biblioteca
- **Vite Team**: Por el mejor build tool del mercado
- **Bootstrap Team**: Por el framework CSS
- **UI Avatars**: Por la API gratuita de avatares
- **Comunidad de desarrolladores peruanos**: Por la inspiración

---

## 📞 Soporte

Para preguntas o soporte:

- Email: support@educonnect.pe (simulado)
- GitHub Issues: [Abrir issue](https://github.com/tu-repo/issues)
- Documentación: Ver archivos .md en el repositorio

---

**Estado del Proyecto**: ✅ **Migración Completa**  
**Versión**: 1.0.0  
**Última actualización**: Enero 2025
