# PSN Trophies — Planning Document

> Proyecto portfolio para demostrar nivel senior en React y Next.js.\
> Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion

---

## Objetivo

Construir una web app que consuma la API oficial de PlayStation Network y permita explorar trofeos, progreso y estadísticas de una cuenta PSN. El proyecto sirve como demostración técnica de patrones avanzados de React y Next.js para un entorno profesional.

---

## Páginas y rutas

| Ruta | Página | Estado |
|------|--------|--------|
| `/` | Dashboard — últimos juegos con progreso | ✅ Construido (iterar) |
| `/profile` | Perfil del usuario — nivel, stats, resumen | 🔲 Pendiente |
| `/games/[titleId]` | Detalle de trofeos de un juego | 🔲 Pendiente |
| `/compare` | Comparativa de progreso entre dos usuarios | 🔲 Pendiente |

---

## Detalle por página

### `/` — Dashboard

**Qué muestra:**
- Grid responsive de los últimos juegos con actividad de trofeos
- Portada, nombre, plataforma, % de progreso y última actividad
- Enlace a la página de detalle de cada juego

**Mejoras planificadas:**
- Filtros por plataforma (PS5, PS4, PS3, PS Vita) y por estado (completos, en progreso)
- Barra de búsqueda por nombre de juego
- Skeleton loading via `Suspense` + `loading.tsx`
- Streaming del grid (los juegos cargan progresivamente)

---

### `/profile` — Perfil

**Qué muestra:**
- Avatar y nombre del usuario PSN
- Nivel de trofeo con barra de XP
- Contador de trofeos por tipo: 🏆 Platinum · 🥇 Gold · 🥈 Silver · 🥉 Bronze
- Total de juegos jugados

**Aspectos técnicos:**
- Server Component con fetch paralelo (perfil + resumen de trofeos)
- `generateMetadata` dinámico con el nombre del usuario
- Animación de entrada de los contadores (count-up con Framer Motion)

---

### `/games/[titleId]` — Detalle de trofeos

**Qué muestra:**
- Cabecera con portada, nombre y progreso general del juego
- Lista de todos los trofeos con: nombre, descripción, tipo, rareza y estado (obtenido/pendiente)
- Filtro por tipo de trofeo y por estado (obtenido/pendiente)

**Aspectos técnicos:**
- Ruta dinámica con `params.titleId`
- `generateMetadata` con el nombre del juego
- `Suspense` con skeleton por sección (cabecera y lista independientes)
- Animación escalonada de los trofeos al cargar (stagger con Framer Motion)

---

### `/compare` — Comparativa

**Qué muestra:**
- Tabla de juegos en común entre dos usuarios PSN
- Barra de progreso dual (yo vs. el otro usuario) por juego
- Resumen: quién tiene más platinos, juegos completados, etc.

**Aspectos técnicos:**
- Fetch paralelo de ambos perfiles con `Promise.all`
- Manejo de errores granular (qué pasa si uno de los dos perfiles falla)

---

## Arquitectura técnica

### Server vs. Client components

```
app/
├── page.tsx              → Server Component (fetch de datos)
├── profile/page.tsx      → Server Component
├── games/[titleId]/
│   └── page.tsx          → Server Component
└── compare/page.tsx      → Server Component

components/
├── psn/                  → Server Components por defecto
├── shared/               → Server Components por defecto
├── ui/                   → Client Components (interactividad, animaciones)
└── magic-ui/             → Client Components ('use client')
```

**Regla:** los datos se fetchen siempre en Server Components. Los componentes de UI con estado, eventos o animaciones se marcan `'use client'`.

---

### Performance

| Técnica | Dónde se aplica |
|---------|-----------------|
| **Streaming + Suspense** | Dashboard, detalle de trofeos |
| **`loading.tsx`** | Todas las rutas (skeleton automático) |
| **`error.tsx`** | Todas las rutas (error boundary por ruta) |
| **`next/image`** | Portadas de juegos y avatares |
| **Fetch caching** | Datos de perfil (revalidación por tiempo) |
| **Parallel data fetching** | `/profile` y `/compare` con `Promise.all` |

---

### Animaciones (Framer Motion)

| Animación | Componente |
|-----------|------------|
| Entrada escalonada de cards | Dashboard grid |
| Count-up de estadísticas | Contadores en `/profile` |
| Entrada escalonada de trofeos | Lista en `/games/[titleId]` |
| Transiciones entre páginas | Layout global |
| Hover / tap feedback | Botones, cards |

---

### Accesibilidad

- HTML semántico en todos los componentes (`<main>`, `<nav>`, `<section>`, `<article>`)
- Todos los elementos interactivos accesibles por teclado
- ARIA labels en iconos sin texto y en barras de progreso (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`)
- Contraste de colores conforme a WCAG AA
- `prefers-reduced-motion`: las animaciones se desactivan si el usuario lo tiene configurado

---

### Testing

| Tipo | Herramienta | Qué se testea |
|------|-------------|---------------|
| Unitario | **Vitest** + **React Testing Library** | Componentes UI, utilidades |
| Integración | **Vitest** + **MSW** (mock de API PSN) | Servicios y páginas completas |
| E2E | **Playwright** | Flujos críticos (carga del dashboard, navegación) |

---

## Estructura de servicios

```
src/services/psn/
├── psn.service.ts        → getRecentTrophies() — ya construido
├── profile.service.ts    → getUserProfile(), getTrophySummary()
├── trophies.service.ts   → getGameTrophies(titleId), getTrophyEarnedStatus(titleId)
├── compare.service.ts    → compareUsers(userA, userB)
├── psn.types.ts
├── psn.errors.ts
└── index.ts
```

---

## Fases de desarrollo

### Fase 1 — Fundamentos sólidos
- [ ] Mejorar el Dashboard con Suspense, `loading.tsx`, `error.tsx`
- [ ] Añadir filtros por plataforma y búsqueda
- [ ] Optimizar imágenes con `next/image`

### Fase 2 — Nuevas páginas
- [ ] `/profile` con stats y animaciones de contadores
- [ ] `/games/[titleId]` con lista de trofeos filtrable

### Fase 3 — Features avanzados
- [ ] `/compare` con fetch paralelo
- [ ] Transiciones de página con Framer Motion

### Fase 4 — Calidad
- [ ] Tests unitarios de componentes clave
- [ ] Tests de integración del servicio PSN (con MSW)
- [ ] Auditoría de accesibilidad
- [ ] Auditoría de performance (Lighthouse)
