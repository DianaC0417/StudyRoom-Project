---
version: alpha
name: BitStudy
description: Plataforma web educativa con estética pixel art inspirada en videojuegos retro. BitStudy combina aprendizaje, personalización y una interfaz tipo juego usando fondo crema, barras oscuras semitransparentes, tipografía pixelada, ilustraciones isométricas, mascotas, salas personalizables, botones redondeados y componentes simples para crear una experiencia amigable, clara y divertida para estudiantes.

colors:
  canvas: "#EFE8E2"
  canvas-soft: "#FEF9E7"
  card-cream: "#FFFAF2"
  option-selected: "#E0ECDA"
  preview-bg: "#D7CCC8"

  black: "#000000"
  ink: "#222222"
  ink-strong: "#1A1A1A"
  dark-button: "#141414"
  dark-button-hover: "#3D3D3D"
  panel-dark: "rgba(71, 68, 68, 0.92)"
  panel-dark-mobile: "rgba(55, 55, 55, 0.60)"
  mobile-menu-bg: "rgba(61, 61, 61, 0.97)"
  nav-black-overlay: "rgba(0, 0, 0, 0.68)"

  white: "#FFFFFF"
  white-soft: "rgba(255, 255, 255, 0.70)"
  white-muted: "rgba(255, 255, 255, 0.60)"
  white-subtle: "rgba(255, 255, 255, 0.40)"

  border-dark: "#222222"
  border-button: "#333333"
  border-soft: "#D4C5B2"
  border-soft-hover: "#B8A590"
  border-input-dark: "rgba(255, 255, 255, 0.40)"
  border-input-dark-focus: "rgba(255, 255, 255, 0.80)"

  accent-gold: "#C9A227"
  error: "#FF4444"
  error-text: "#FF6B6B"
  success: "#E0ECDA"

typography:
  logo:
    fontFamily: "Retrobit, GamePaused, Courier New, monospace"
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.06em

  title-bar:
    fontFamily: "GamePaused, Courier New, monospace"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 3px

  subtitle:
    fontFamily: "GamePaused, Courier New, monospace"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 3px

  card-title:
    fontFamily: "Retrobit, Courier New, monospace"
    fontSize: 21.6px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.06em

  section-title:
    fontFamily: "Retrobit, GamePaused, Courier New, monospace"
    fontSize: 20.8px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 1px

  nav-link:
    fontFamily: "GamePaused, Courier New, monospace"
    fontSize: 18.4px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.04em

  button-login:
    fontFamily: "Retrobit, Courier New, monospace"
    fontSize: 24px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0.08em

  button-main:
    fontFamily: "Retrobit, GamePaused, Courier New, monospace"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 2px

  input:
    fontFamily: "Comfortaa, Courier New, monospace"
    fontSize: 13.6px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0

  small:
    fontFamily: "Comfortaa, Courier New, monospace"
    fontSize: 11.5px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 10px
  xl: 12px
  panel: 16px
  pill: 50px
  full: 999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 40px
  section: 48px
  page: 80px

shadows:
  login-button: "0 0px 1px rgba(0, 0, 0, 0.2)"
  login-button-hover: "0 6px 20px rgba(0, 0, 0, 0.3)"
  input-focus: "0 0 0 2px rgba(255, 255, 255, 0.1)"

components:
  login-navbar:
    backgroundColor: "{colors.nav-black-overlay}"
    textColor: "{colors.white}"
    typography: "{typography.nav-link}"
    padding: "0.5rem 2rem"

  mobile-nav:
    backgroundColor: "{colors.mobile-menu-bg}"
    textColor: "{colors.canvas}"
    typography: "{typography.nav-link}"
    paddingTop: 80px
    paddingLeft: "1.5rem"

  title-bar:
    backgroundColor: "{colors.nav-black-overlay}"
    textColor: "{colors.canvas-soft}"
    typography: "{typography.title-bar}"
    padding: "1.5rem 1rem"

  login-card:
    backgroundColor: "{colors.panel-dark}"
    textColor: "{colors.white}"
    rounded: "{rounded.panel}"
    padding: "2.5rem 2.2rem"
    maxWidth: 320px

  login-input:
    backgroundColor: transparent
    textColor: "{colors.white}"
    border: "2px solid rgba(255, 255, 255, 0.4)"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1rem"
    typography: "{typography.input}"

  login-button:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-strong}"
    border: "2px solid #333333"
    rounded: "{rounded.pill}"
    padding: "0.75rem"
    typography: "{typography.button-login}"
    shadow: "{shadows.login-button}"

  customization-option:
    backgroundColor: "{colors.card-cream}"
    textColor: "{colors.ink}"
    border: "3px solid #D4C5B2"
    rounded: "{rounded.lg}"
    padding: "0.8rem 1rem"
    typography: "{typography.input}"

  customization-option-selected:
    backgroundColor: "{colors.option-selected}"
    textColor: "{colors.ink}"
    border: "3px solid #202020"
    rounded: "{rounded.lg}"

  preview-box:
    backgroundColor: "{colors.preview-bg}"
    textColor: "{colors.ink}"
    border: "3px solid #222222"
    rounded: "{rounded.lg}"

  name-input:
    backgroundColor: "{colors.card-cream}"
    textColor: "{colors.ink-strong}"
    border: "3px solid #D4C5B2"
    rounded: "{rounded.md}"
    padding: "0.6rem 0.8rem"
    typography: "{typography.input}"

  button-start:
    backgroundColor: "{colors.dark-button}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "0.7rem"
    typography: "{typography.button-main}"
---

# DESIGN.md — BitStudy

## Overview

BitStudy es una plataforma web educativa con estética **pixel art / retro gamer**. El diseño convierte el proceso de estudiar en una experiencia visual parecida a un videojuego: el estudiante inicia sesión, personaliza su espacio, elige un compañero, selecciona una sala y comienza a estudiar.

El sistema visual real de BitStudy está construido sobre un fondo crema cálido (`{colors.canvas}` — #EFE8E2), barras superiores negras con opacidad, tipografía pixelada, ilustraciones con `image-rendering: pixelated`, botones redondeados, cards suaves y estados interactivos simples.

La interfaz debe sentirse:

- Retro.
- Lúdica.
- Educativa.
- Personalizable.
- Clara.
- Amigable.
- Ligera y fácil de usar.

BitStudy no debe verse como una página educativa tradicional. Debe sentirse como un pequeño mundo de estudio personalizado dentro de una interfaz de videojuego.

**Key Characteristics:**

- Fondo general crema `#EFE8E2`.
- Navbar y title bar negras con opacidad `0.68`.
- Tipografías principales: `Retrobit` y `GamePaused`.
- Tipografía secundaria para inputs y textos pequeños: `Comfortaa`.
- Pixel art obligatorio para habitaciones, mascotas y logos.
- Uso de `image-rendering: pixelated` en imágenes importantes.
- Login con ilustración a la izquierda y tarjeta oscura a la derecha.
- Customization con selector de mascota, selector de sala, preview, nickname y botón de inicio.
- Cards claras con borde crema suave.
- Estado seleccionado en verde suave `#E0ECDA`.
- Diseño responsive para pantallas menores a 900px, 650px, 600px y 400px.
- Menú hamburguesa en mobile.

---

## Design Philosophy

El diseño de BitStudy mezcla una plataforma educativa con una estética de juego retro. La intención no es solamente decorar la página con pixel art, sino hacer que toda la experiencia se sienta como una interfaz de juego: simple, clara, visual y motivadora.

La interfaz debe guiar al usuario sin sobrecargarlo. Los elementos importantes son grandes, centrados y fáciles de entender. La personalización se vuelve parte de la experiencia, no solo una configuración.

### Principles

- **Aprendizaje como juego:** estudiar debe sentirse más cercano y entretenido.
- **Personalización:** el estudiante debe sentir que su espacio le pertenece.
- **Claridad:** cada pantalla debe tener una acción principal fácil de identificar.
- **Retro visual:** las fuentes, imágenes y botones deben mantener una estética pixelada.
- **Calidez:** el fondo crema evita que la interfaz se vea fría o demasiado corporativa.
- **Simplicidad:** no usar demasiados colores, efectos o componentes innecesarios.

---

## Colors

### Brand & Base Colors

- **Canvas** (`{colors.canvas}` — #EFE8E2): Fondo principal de todas las pantallas. Da una sensación cálida, suave y acogedora.
- **Canvas Soft** (`{colors.canvas-soft}` — #FEF9E7): Color claro usado sobre barras oscuras o como tono cálido de apoyo.
- **Black Overlay** (`{colors.nav-black-overlay}` — rgba(0,0,0,0.68)): Se usa en la navbar del login y en la title bar de customización. Permite una barra oscura sin sentirse completamente plana.
- **Ink** (`{colors.ink}` — #222222): Texto principal en pantallas claras.
- **Ink Strong** (`{colors.ink-strong}` — #1A1A1A): Texto fuerte, especialmente en botones claros.
- **White** (`{colors.white}` — #FFFFFF): Texto y elementos sobre fondos oscuros.

### Surfaces

- **Panel Dark** (`{colors.panel-dark}` — rgba(71,68,68,0.92)): Fondo de la tarjeta de login en desktop.
- **Panel Dark Mobile** (`{colors.panel-dark-mobile}` — rgba(55,55,55,0.60)): Fondo de la tarjeta de login en mobile, más suave y transparente.
- **Card Cream** (`{colors.card-cream}` — #FFFAF2): Fondo de opciones, inputs y cards de customización.
- **Preview Background** (`{colors.preview-bg}` — #D7CCC8): Fondo base del preview box antes o detrás de la sala.
- **Mobile Menu Background** (`{colors.mobile-menu-bg}` — rgba(61,61,61,0.97)): Fondo del menú mobile abierto.

### Borders

- **Border Dark** (`{colors.border-dark}` — #222222): Bordes fuertes en preview y estados seleccionados.
- **Border Button** (`{colors.border-button}` — #333333): Borde de botón de login.
- **Border Soft** (`{colors.border-soft}` — #D4C5B2): Borde por defecto en opciones e input de nombre.
- **Border Soft Hover** (`{colors.border-soft-hover}` — #B8A590): Borde de hover en opciones.
- **Border Input Dark** (`{colors.border-input-dark}` — rgba(255,255,255,0.40)): Borde por defecto en inputs del login.
- **Border Input Dark Focus** (`{colors.border-input-dark-focus}` — rgba(255,255,255,0.80)): Borde de focus en inputs del login.

### Interaction & Semantic Colors

- **Accent Gold** (`{colors.accent-gold}` — #C9A227): Color de hover en links de navbar y menú mobile.
- **Option Selected** (`{colors.option-selected}` — #E0ECDA): Fondo para opción seleccionada en customización.
- **Error** (`{colors.error}` — #FF4444): Borde de input cuando hay error.
- **Error Text** (`{colors.error-text}` — #FF6B6B): Mensaje de error debajo del input.
- **Dark Button Hover** (`{colors.dark-button-hover}` — #3D3D3D): Hover del botón principal de customización.

### Color Principles

- El fondo crema debe mantenerse como base visual del proyecto.
- Las barras superiores deben ser oscuras y semitransparentes.
- El blanco se usa principalmente sobre fondos oscuros.
- El negro y gris oscuro se usan para jerarquía, botones y contenedores.
- El dorado solo debe usarse como hover o acento pequeño.
- El verde suave se reserva para indicar selección.
- No usar colores saturados innecesarios.
- No usar gradientes modernos.
- Mantener una paleta sobria para que el pixel art tenga protagonismo.

---

## Typography

### Font Family

BitStudy usa fuentes pixeladas personalizadas para reforzar la identidad retro:

- **Retrobit:** fuente pixel principal para títulos importantes, logo, botones y textos destacados.
- **GamePaused:** fuente pixel secundaria para navbar, title bar, subtítulos y estructura visual.
- **Comfortaa:** fuente redondeada y legible para inputs, errores, links secundarios y textos pequeños.
- **Courier New / monospace:** fallback general para mantener un carácter retro cuando las fuentes principales no carguen.

### Font Usage

| Token | Fuente | Tamaño | Uso |
|---|---|---:|---|
| `{typography.logo}` | Retrobit / GamePaused | 48px | Logo o marca visual |
| `{typography.title-bar}` | GamePaused | 32px | Barra superior de customización |
| `{typography.subtitle}` | GamePaused | 28px | Título “BIENVENIDO ESTUDIANTE” |
| `{typography.card-title}` | Retrobit | 21.6px | Título del panel login |
| `{typography.section-title}` | Retrobit / GamePaused | 20.8px | Títulos de secciones |
| `{typography.nav-link}` | GamePaused | 18.4px | Links Home, About, Join Us |
| `{typography.button-login}` | Retrobit | 24px | Botón LOGIN |
| `{typography.button-main}` | Retrobit / GamePaused | 16px | Botón EMPEZAR A ESTUDIAR |
| `{typography.input}` | Comfortaa | 13.6px | Inputs, labels pequeños |
| `{typography.small}` | Comfortaa | 11.5px | Errores, forgot password, register |

### Typography Principles

- Los títulos principales deben usar fuentes pixeladas.
- Los botones deben sentirse como botones de videojuego.
- Los inputs y textos pequeños pueden usar Comfortaa para mejorar legibilidad.
- Usar letter-spacing en títulos y links para reforzar el estilo retro.
- Usar mayúsculas en acciones principales como `LOGIN` y `EMPEZAR A ESTUDIAR`.
- No usar fuentes modernas genéricas como única identidad.
- Evitar párrafos largos dentro de la UI.

---

## Layout

### General Layout

BitStudy usa una estructura clara basada en columnas en desktop y apilamiento en mobile.

La pantalla de login se divide en:

1. Navbar superior.
2. Contenido central.
3. Ilustración de habitación a la izquierda.
4. Card de login a la derecha.

La pantalla de customización se divide en:

1. Title bar superior.
2. Subtítulo central.
3. Contenido en dos columnas.
4. Columna izquierda con opciones.
5. Columna derecha con preview, nickname y botón.

### Spacing System

| Token | Valor | Uso |
|---|---:|---|
| `{spacing.xs}` | 4px | Detalles pequeños |
| `{spacing.sm}` | 8px | Separaciones mínimas |
| `{spacing.md}` | 16px | Espacio estándar |
| `{spacing.lg}` | 24px | Espaciado entre grupos |
| `{spacing.xl}` | 32px | Separación de bloques |
| `{spacing.xxl}` | 40px | Padding grande en cards |
| `{spacing.section}` | 48px | Separación de secciones |
| `{spacing.page}` | 80px | Espacio general de página |

### Grid & Widths

- Login content usa `display: flex`.
- La ilustración ocupa hasta `55%` del ancho en desktop.
- El panel de login tiene `max-width: 320px`.
- En pantallas medianas el login se apila.
- La pantalla de customización usa `max-width: 750px`.
- Customización usa dos columnas en desktop.
- En mobile, customización pasa a una sola columna.

### Layout Principles

- Mantener los elementos centrados.
- No estirar demasiado los formularios.
- Dar protagonismo a las imágenes pixel art.
- Usar columnas solo cuando haya espacio suficiente.
- En mobile, apilar todo en orden lógico.
- Evitar overflow horizontal.
- Mantener `overflow-x: hidden` para evitar desplazamientos accidentales.

---

## Shapes

### Border Radius Scale

| Token | Valor | Uso |
|---|---:|---|
| `{rounded.xs}` | 4px | Nombre sobre preview |
| `{rounded.sm}` | 6px | Imágenes pequeñas |
| `{rounded.md}` | 8px | Input de nombre |
| `{rounded.lg}` | 10px | Opciones, preview y botón customización |
| `{rounded.xl}` | 12px | Login card mobile |
| `{rounded.panel}` | 16px | Login card desktop |
| `{rounded.pill}` | 50px | Inputs y botón login |
| `{rounded.full}` | 999px | Elementos circulares |

### Shape Principles

- El login usa formas tipo píldora en inputs y botón.
- La customización usa tarjetas con bordes de 10px.
- Los paneles principales deben tener esquinas suaves.
- El pixel art puede tener bordes duros, pero la UI debe suavizarse con border-radius.
- No usar componentes completamente cuadrados para acciones importantes.

---

## Elevation & Motion

### Shadows

BitStudy no depende de sombras complejas. La profundidad se logra con bordes, fondos y algunos efectos de hover.

| Token | Valor | Uso |
|---|---|---|
| `{shadows.login-button}` | `0 0px 1px rgba(0,0,0,0.2)` | Botón login normal |
| `{shadows.login-button-hover}` | `0 6px 20px rgba(0,0,0,0.3)` | Botón login hover |
| `{shadows.input-focus}` | `0 0 0 2px rgba(255,255,255,0.1)` | Focus en input login |

### Animations

BitStudy usa animaciones simples y suaves:

- `cardReveal`: aparece el login card con opacidad, translateY y scale.
- `rotate`: spinner de carga.
- `popIn`: animación de éxito.
- Menú hamburguesa: transformación de líneas a X.

### Motion Principles

- Las animaciones deben ser cortas y funcionales.
- No usar animaciones excesivas.
- El movimiento debe reforzar feedback: cargar, abrir menú, mostrar card, éxito.
- Mantener una sensación retro, no demasiado moderna.

---

## Components

### Login Navbar

**`login-navbar`** — Barra superior del login.

Visual:

- Fondo negro con opacidad `0.68`.
- Logo pixelado a la izquierda.
- Links a la derecha en desktop.
- Menú hamburguesa en mobile.
- Padding desktop: `0.5rem 2rem`.
- Padding mobile: `0.5rem 1rem`.

Content:

- Logo BitStudy.
- `Home`.
- `About`.
- `Join Us`.

Rules:

- Los links deben ser blancos.
- En hover cambian a dorado `#C9A227`.
- El logo debe usar `image-rendering: pixelated`.
- En mobile los links se ocultan y aparece el hamburger.

---

### Mobile Navigation

**`mobile-nav`** — Menú mobile abierto.

Visual:

- Posición fixed.
- Ocupa toda la pantalla.
- Fondo `rgba(61,61,61,0.97)`.
- Links color crema.
- Padding superior de `80px`.
- Links verticales.
- Z-index debajo del botón hamburguesa.

Rules:

- Debe aparecer solo cuando tiene clase `open`.
- El botón hamburguesa debe transformarse en X.
- Los links deben mantener estilo pixelado.
- Hover en dorado.
- Debe ser fácil de tocar en mobile.

---

### Login Illustration

La ilustración del login representa una habitación pixel art.

Visual:

- Imagen grande.
- `image-rendering: pixelated`.
- Contenedor con `max-width: 680px`.
- Ocupa hasta `55%` del ancho en desktop.
- En mobile se reduce a `70%` o `85%` según breakpoint.

Rules:

- Debe ser protagonista visual.
- No usar imágenes realistas.
- No usar ilustraciones 3D modernas.
- Mantener estilo pixel art.
- El logo diagonal sobre la habitación se oculta en pantallas menores a 900px.

---

### Login Card

**`login-card`** — Tarjeta de ingreso.

Visual:

- Fondo `rgba(71,68,68,0.92)` en desktop.
- Fondo `rgba(55,55,55,0.60)` en mobile.
- Border radius desktop: `16px`.
- Border radius mobile: `12px`.
- Padding desktop: `2.5rem 2.2rem`.
- Padding mobile: `1.5rem 1.2rem`.
- Max width desktop: `320px`.
- Max width tablet: `380px`.
- Animación `cardReveal`.

Content:

- Título `TU ESPACIO DE APRENDIZAJE`.
- Input username.
- Input password.
- Forgot password.
- Botón `LOGIN`.
- Register link.
- Mensaje de éxito.

Rules:

- El título usa `Retrobit`.
- Los inputs usan `Comfortaa`.
- El botón LOGIN debe ser el elemento más llamativo.
- La card debe mantenerse centrada en mobile.
- Debe mantener contraste alto.

---

### Login Inputs

**`login-input`** — Inputs del login.

Visual:

- Fondo transparente.
- Borde blanco con opacidad `0.4`.
- Borde focus blanco con opacidad `0.8`.
- Color de texto blanco.
- Placeholder blanco con opacidad `0.6`.
- Border radius `50px`.
- Padding `0.7rem 1rem`.
- Fuente `Comfortaa`.
- Tamaño `0.85rem`.

States:

Default:

- Borde `2px solid rgba(255,255,255,0.4)`.

Focus:

- Borde `rgba(255,255,255,0.8)`.
- Shadow `0 0 0 2px rgba(255,255,255,0.1)`.

Error:

- Borde `#FF4444`.
- Mensaje `#FF6B6B`.

Rules:

- No usar inputs cuadrados.
- Deben ser legibles sobre fondo oscuro.
- Mantener suficiente separación entre campos.
- El error debe mostrarse debajo del input.

---

### Forgot Password Link

Visual:

- Texto blanco con opacidad `0.6`.
- Fuente `Comfortaa`.
- Tamaño `0.72rem`.
- Sin fondo ni borde.
- Hover a blanco completo.

Rules:

- Debe sentirse secundario.
- No debe competir con el botón LOGIN.
- Debe mantenerse alineado a la izquierda.

---

### Login Button

**`login-button`** — Botón principal del login.

Visual:

- Fondo blanco.
- Texto `#1A1A1A`.
- Borde `2px solid #333`.
- Border radius `50px`.
- Fuente `Retrobit`.
- Tamaño desktop `1.5rem`.
- Texto en uppercase.
- Letter spacing `0.08em`.

States:

Default:

- Shadow leve `0 0px 1px rgba(0,0,0,0.2)`.

Hover:

- `transform: translateY(-2px)`.
- Shadow `0 6px 20px rgba(0,0,0,0.3)`.
- Fondo `#F0F0F0`.

Active:

- `transform: translateY(0)`.

Disabled:

- Opacity `0.6`.
- Cursor `not-allowed`.

Rules:

- Debe ocupar el 100% del ancho de la card.
- Debe ser la acción principal del login.
- Debe tener apariencia de botón grande de juego.
- En mobile baja a un tamaño de fuente aproximado de `0.9rem`.

---

### Register Row

Visual:

- Texto centrado.
- Color blanco con opacidad `0.4`.
- Botón register con opacidad `0.7`.
- Fuente `Comfortaa`.
- Tamaño `0.72rem`.
- Register subrayado.
- Hover a blanco.

Rules:

- Es una acción secundaria.
- Debe mantenerse debajo del botón principal.
- No debe competir visualmente con LOGIN.

---

### Success Message

Visual:

- Texto centrado blanco.
- Icono grande `2.8rem`.
- Animación `popIn`.
- Título con `Retrobit`.
- Descripción con blanco al `0.5`.

Rules:

- Debe comunicar éxito de forma clara.
- El mensaje no debe romper la estética retro.
- Puede reemplazar temporalmente el formulario.

---

### Customization Page

La pantalla de customización permite que el estudiante configure su experiencia antes de comenzar.

Visual:

- Fondo crema `#EFE8E2`.
- Fuente principal `Retrobit` y `GamePaused`.
- Layout centrado.
- Contenido con `max-width: 750px`.
- Dos columnas en desktop.
- Una columna en mobile.

Content:

- Title bar: `Personaliza tu experiencia`.
- Subtitle: `BIENVENIDO ESTUDIANTE`.
- Selector de compañero.
- Selector de sala.
- Preview.
- Input de nombre.
- Botón para empezar.

Rules:

- La pantalla debe sentirse como configuración inicial de un videojuego.
- El usuario debe ver rápidamente qué puede elegir.
- La preview debe mostrar el resultado de las elecciones.
- El botón final debe ser claro y visible.

---

### Title Bar

**`title-bar`** — Barra superior de customización.

Visual:

- Fondo negro con opacidad `0.68`.
- Texto `#FEF9E7`.
- Fuente `GamePaused`.
- Font size desktop `2rem`.
- Font size mobile `1.1rem`.
- Letter spacing `3px`.
- Texto centrado.
- Padding desktop `1.5rem 1rem`.
- Padding mobile `0.9rem 1rem`.

Rules:

- Debe ocupar todo el ancho.
- Debe mantener contraste alto.
- En mobile debe reducir tamaño sin perder legibilidad.

---

### Subtitle

**`subtitle`** — Título “BIENVENIDO ESTUDIANTE”.

Visual:

- Color `#222222`.
- Fuente `GamePaused`.
- Font size desktop `1.8rem`.
- Font size mobile `1rem`.
- Letter spacing `3px`.
- Texto centrado.
- Padding vertical amplio.

Rules:

- Debe funcionar como saludo principal.
- Debe usar estilo pixelado.
- No debe tener fondo propio.

---

### Customization Content

Visual:

- `display: flex`.
- Gap `2rem`.
- Max width `750px`.
- Padding horizontal `1.5rem`.
- En mobile cambia a columna.
- En mobile se centra.

Rules:

- En desktop deben existir dos columnas.
- En mobile todo debe apilarse.
- El contenido debe mantener separación clara.
- Evitar overflow horizontal.

---

### Companion Selection

Permite elegir el compañero del estudiante.

Visual:

- Sección con título.
- Opciones en fila con wrap.
- Cards con fondo crema claro.
- Borde crema suave.
- Imagen pixel art pequeña.
- Texto debajo.
- Estado seleccionado visible.

Options:

- Cat.
- Frog.
- Dog.

Rules:

- Las mascotas deben ser pixel art.
- La opción seleccionada debe usar fondo `#E0ECDA`.
- No depender solo del color: también cambia el borde.
- Las cards deben ser clickeables.
- En mobile se reducen y se centran.

---

### Room Selection

Permite elegir la sala del estudiante.

Visual:

- Opciones con miniatura.
- Imagen de sala `75px x 50px`.
- Object-fit cover.
- Border radius `6px`.
- `image-rendering: pixelated`.

Rules:

- Las salas deben mantener estética pixel art.
- La opción seleccionada debe coincidir visualmente con la preview.
- En mobile las miniaturas bajan a `60px x 40px`.
- Las salas deben verse como espacios de estudio o descanso.

---

### Option Card

**`customization-option`** — Card usada para mascota o sala.

Visual:

- Fondo `#FFFAF2`.
- Borde `3px solid #D4C5B2`.
- Border radius `10px`.
- Padding desktop `0.8rem 1rem`.
- Padding mobile `0.4rem 0.5rem`.
- Font size desktop `0.85rem`.
- Font size mobile `0.65rem`.
- Texto `#222222`.
- Letter spacing `1px`.

States:

Default:

- Borde suave `#D4C5B2`.

Hover:

- Borde `#B8A590`.

Selected:

- Borde `#202020`.
- Fondo `#E0ECDA`.

Rules:

- Debe ser claramente seleccionable.
- Debe tener cursor pointer.
- Debe mostrar imagen y texto.
- Debe mantener estilo retro sin sombras modernas.

---

### Preview Box

**`preview-box`** — Vista previa de la sala y mascota.

Visual:

- Posición relativa.
- Width `110%` en desktop.
- Max width `500px`.
- Aspect ratio `3 / 2`.
- Borde `3px solid #222222`.
- Border radius `10px`.
- Overflow hidden.
- Fondo base `#D7CCC8`.

Elements:

- `preview-bg`: imagen de fondo de sala.
- `preview-pet`: mascota posicionada al centro inferior.
- `preview-name`: nombre del estudiante en etiqueta oscura.

Rules:

- Debe mostrar la personalización elegida.
- Las imágenes deben usar `image-rendering: pixelated`.
- En mobile el max width baja a `300px`.
- El nombre debe mostrarse sobre una etiqueta negra translúcida.
- La mascota se posiciona al centro horizontal.

---

### Preview Name

Visual:

- Posición absoluta.
- Bottom `4px`.
- Centrado horizontal.
- Fondo negro con opacidad `0.582`.
- Texto blanco.
- Padding `2px 10px`.
- Border radius `4px`.
- Font size `0.6rem`.
- Letter spacing `1px`.
- White-space nowrap.

Rules:

- Debe mantenerse legible sobre cualquier sala.
- Debe seguir a la preview.
- No debe ocupar demasiado espacio.

---

### Name Input

**`name-input`** — Input de nickname.

Visual:

- Max width `280px` en desktop.
- Max width `300px` en mobile.
- Fondo `#FFFAF2`.
- Borde `3px solid #D4C5B2`.
- Border radius `8px`.
- Padding `0.6rem 0.8rem`.
- Font size `0.85rem`.
- Texto `#1A1A1A`.
- En desktop alineación izquierda.
- En mobile texto centrado.

Focus:

- Sin outline default.
- Borde `#242424`.

Rules:

- Debe ser fácil de leer.
- Debe usar estilo suave y coherente con las option cards.
- En mobile debe centrarse.

---

### Start Button

**`button-start`** — Botón para empezar a estudiar.

Visual:

- Max width `280px` en desktop.
- Max width `300px` en mobile.
- Fondo `#141414`.
- Texto blanco.
- Sin borde.
- Border radius `10px`.
- Padding `0.7rem`.
- Font size `1rem`.
- Letter spacing `2px`.
- Fuente heredada pixelada.
- Hover `#3D3D3D`.

Rules:

- Debe ser la acción principal de customización.
- Debe estar cerca del input de nombre.
- Debe tener contraste alto.
- No usar gradientes.
- Debe ser fácil de tocar en mobile.

---

## Illustration Style

Las imágenes son parte central de la identidad de BitStudy.

### Rules

- Usar pixel art.
- Usar `image-rendering: pixelated`.
- Evitar imágenes realistas.
- Evitar 3D moderno.
- Evitar fotografías.
- Mantener estética retro.
- Usar habitaciones, mascotas y elementos educativos.
- Las imágenes de sala pueden tener color, pero deben conservar estilo pixel.
- Las mascotas deben ser pequeñas, simples y reconocibles.

### Login Illustration

- Habitación isométrica.
- Gran tamaño en desktop.
- Debe acompañar al formulario.
- Puede incluir logo diagonal en desktop.
- El logo diagonal se oculta en pantallas menores a 900px.

### Customization Images

- Mascotas pequeñas de `30px x 30px` o `32px x 32px`.
- Salas de `75px x 50px` en desktop.
- Salas de `60px x 40px` en mobile.
- Preview con sala completa y mascota superpuesta.

---

## Page Layouts

### Login Desktop Layout

```txt
┌──────────────────────────────────────────────┐
│ Logo BitStudy             Home About Join Us │
├──────────────────────────────────────────────┤
│                                              │
│  [Habitación pixel art]      [Login Card]    │
│                                              │
└──────────────────────────────────────────────┘
```

Rules:

- La navbar ocupa todo el ancho.
- La ilustración va a la izquierda.
- La login card va a la derecha.
- El contenido se centra verticalmente.
- El fondo general es crema.

### Login Tablet Layout

```txt
┌──────────────────────────────┐
│ Logo BitStudy  Home About... │
├──────────────────────────────┤
│ [Habitación pixel art]       │
│ [Login Card]                 │
└──────────────────────────────┘
```

Rules:

- A partir de 900px hacia abajo, el contenido se apila.
- La ilustración se reduce.
- La login card puede crecer hasta `380px`.
- El logo diagonal se oculta.

### Login Mobile Layout

```txt
┌────────────────────┐
│ Logo          ☰    │
├────────────────────┤
│ [Habitación]       │
│ [Login Card]       │
└────────────────────┘
```

Rules:

- A partir de 600px se ocultan los links.
- Aparece el botón hamburguesa.
- El logo baja a `32px`.
- La card ocupa casi todo el ancho.
- El botón login reduce su tamaño.

### Mobile Menu Open

```txt
┌────────────────────┐
│ Logo          X    │
│ Home               │
│ About              │
│ Join Us            │
└────────────────────┘
```

Rules:

- El menú ocupa toda la pantalla.
- Fondo gris oscuro casi opaco.
- Links verticales.
- El icono hamburguesa se transforma en X.

### Customization Desktop Layout

```txt
┌────────────────────────────────────┐
│     Personaliza tu experiencia      │
├────────────────────────────────────┤
│        BIENVENIDO ESTUDIANTE        │
│                                    │
│ [Compañero y Sala]    [Preview]    │
│ [Opciones]            [Nombre]     │
│                       [Botón]      │
└────────────────────────────────────┘
```

Rules:

- El contenido usa dos columnas.
- La columna izquierda contiene secciones de selección.
- La columna derecha contiene preview, nombre y botón.
- El max width general es `750px`.

### Customization Mobile Layout

```txt
┌────────────────────┐
│ Personaliza tu exp.│
├────────────────────┤
│ BIENVENIDO         │
│ ESTUDIANTE         │
│                    │
│ [Compañero]        │
│ [Sala]             │
│ [Preview]          │
│ [Nombre]           │
│ [Botón]            │
└────────────────────┘
```

Rules:

- A partir de 650px cambia a columna.
- Todo se centra.
- Las opciones reducen padding y tamaño.
- La preview baja a `300px`.
- Input y botón se centran y suben a `300px`.

---

## Responsive Behavior

### Breakpoints

| Breakpoint | Width | Behavior |
|---|---:|---|
| Small mobile | `< 400px` | Login navbar más compacta, logo 28px, card con padding menor |
| Mobile login | `< 600px` | Navbar con hamburguesa, login card reducida, ilustración al 70% |
| Mobile customization | `< 650px` | Customización en una columna, opciones centradas, preview 300px |
| Tablet login | `< 900px` | Login pasa de fila a columna, se oculta logo diagonal |
| Medium login | `< 1000px` | Ajuste del logo diagonal |
| Large login | `< 1200px` | Ajuste del logo diagonal |

### Mobile Principles

- Reducir tamaño de tipografía pixelada para evitar cortes.
- Mantener el botón principal visible.
- Centrar input y botón en customización.
- Reducir imágenes sin perder estética pixel.
- Evitar scroll horizontal.
- Mantener touch targets cómodos.
- No mostrar navegación desktop en pantallas pequeñas.

### Desktop Principles

- Usar distribución horizontal cuando haya espacio.
- Dar protagonismo a la habitación pixel art.
- Mantener formularios compactos.
- Mantener navbar completa.
- Conservar separación entre columnas.

---

## Interaction States

### Hover

Links:

- Cambian a dorado `#C9A227`.

Login button:

- Sube `-2px`.
- Cambia fondo a `#F0F0F0`.
- Aumenta sombra.

Option cards:

- Cambian borde a `#B8A590`.

Start button:

- Cambia fondo a `#3D3D3D`.

### Active

Login button:

- Regresa a `translateY(0)`.

Hamburger:

- Línea 1 rota 45 grados.
- Línea 2 desaparece.
- Línea 3 rota -45 grados.

### Focus

Login input:

- Borde blanco más visible.
- Shadow suave.

Name input:

- Borde oscuro `#242424`.
- Sin outline default.

### Disabled

Login button:

- Opacity `0.6`.
- Cursor `not-allowed`.

### Error

Login input:

- Borde `#FF4444`.

Error message:

- Color `#FF6B6B`.
- Tamaño pequeño.
- Padding izquierdo.
- Debajo del input.

---

## Accessibility

BitStudy debe mantener accesibilidad aunque tenga estética pixel art.

### Rules

- Mantener alto contraste en textos importantes.
- No usar texto demasiado pequeño para acciones principales.
- Los botones deben tener estados hover, active y disabled.
- Los inputs deben tener estado focus claro.
- El menú mobile debe ser fácil de abrir y cerrar.
- La selección de mascota y sala no debe depender solo del color.
- Las imágenes importantes deben tener alt text.
- Evitar que la fuente pixelada afecte la legibilidad de textos largos.
- Mantener el orden lógico en mobile.

### Alt Text Examples

- Login room: `Habitación pixel art de estudio con objetos académicos.`
- Logo: `Logo de BitStudy en estilo pixel art.`
- Cat companion: `Compañero gato en pixel art.`
- Frog companion: `Compañero rana en pixel art.`
- Dog companion: `Compañero perro en pixel art.`
- Room option: `Sala pixel art seleccionable para el espacio de estudio.`
- Preview: `Vista previa del espacio personalizado del estudiante.`

---

## Content Style

El tono textual de BitStudy debe ser corto, juvenil y directo.

### Voice

- Amigable.
- Motivador.
- Simple.
- Retro.
- Educativo sin ser formal.

### Good Examples

- `TU ESPACIO DE APRENDIZAJE`
- `LOGIN`
- `Personaliza tu experiencia`
- `BIENVENIDO ESTUDIANTE`
- `ELIGE TU COMPAÑERO`
- `ELIGE TU SALA`
- `EMPEZAR A ESTUDIAR`

### Avoid

- Textos demasiado largos.
- Lenguaje académico pesado.
- Frases corporativas.
- Mensajes fríos o genéricos.
- Exceso de signos o colores.

---

## Do's and Don'ts

### Do

- Usar fondo crema `#EFE8E2`.
- Usar fuentes pixeladas en títulos y botones.
- Usar Comfortaa en inputs y textos pequeños.
- Usar pixel art en habitaciones y mascotas.
- Mantener `image-rendering: pixelated`.
- Usar barras oscuras semitransparentes.
- Usar bordes visibles en cards.
- Usar verde suave para selección.
- Mantener layout responsive.
- Mantener botones grandes y claros.

### Don't

- No usar fotos realistas.
- No usar imágenes 3D modernas.
- No usar gradientes brillantes.
- No usar demasiados colores saturados.
- No mezclar muchas fuentes.
- No eliminar estados focus.
- No hacer botones pequeños en mobile.
- No saturar la pantalla.
- No cambiar el fondo crema por blanco puro.
- No usar estilos corporativos que rompan el mood retro.

---

## Implementation Notes

### CSS Variables Suggested

```css
:root {
  --color-canvas: #EFE8E2;
  --color-canvas-soft: #FEF9E7;
  --color-card-cream: #FFFAF2;
  --color-option-selected: #E0ECDA;
  --color-preview-bg: #D7CCC8;

  --color-black: #000000;
  --color-ink: #222222;
  --color-ink-strong: #1A1A1A;
  --color-dark-button: #141414;
  --color-dark-button-hover: #3D3D3D;
  --color-panel-dark: rgba(71, 68, 68, 0.92);
  --color-panel-dark-mobile: rgba(55, 55, 55, 0.60);
  --color-mobile-menu-bg: rgba(61, 61, 61, 0.97);
  --color-nav-black-overlay: rgba(0, 0, 0, 0.68);

  --color-white: #FFFFFF;
  --color-white-soft: rgba(255, 255, 255, 0.70);
  --color-white-muted: rgba(255, 255, 255, 0.60);
  --color-white-subtle: rgba(255, 255, 255, 0.40);

  --color-border-dark: #222222;
  --color-border-button: #333333;
  --color-border-soft: #D4C5B2;
  --color-border-soft-hover: #B8A590;
  --color-accent-gold: #C9A227;
  --color-error: #FF4444;
  --color-error-text: #FF6B6B;

  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
  --radius-panel: 16px;
  --radius-pill: 50px;

  --font-pixel-primary: "Retrobit", "Courier New", monospace;
  --font-pixel-secondary: "GamePaused", "Courier New", monospace;
  --font-readable: "Comfortaa", "Courier New", monospace;

  --shadow-login-button: 0 0px 1px rgba(0, 0, 0, 0.2);
  --shadow-login-button-hover: 0 6px 20px rgba(0, 0, 0, 0.3);
  --shadow-input-focus: 0 0 0 2px rgba(255, 255, 255, 0.1);
}
```

### Base Style Suggested

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: var(--color-canvas);
}

body {
  font-family: var(--font-pixel-secondary);
  color: var(--color-ink);
}

img.pixel-art {
  image-rendering: pixelated;
}
```

### Font Faces

```css
@font-face {
  font-family: "Retrobit";
  src: url("src/game/assets/retrobit-pixel-font/retrobit.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "GamePaused";
  src: url("src/game/assets/game_paused/Game Paused DEMO.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
}
```

---

## Known Gaps

Este DESIGN.md está basado en las pantallas actuales de login y customización. Todavía faltan elementos que pueden definirse cuando existan más pantallas.

### Gaps

- Falta definir diseño de registro.
- Falta definir diseño de recuperación de contraseña.
- Falta definir dashboard o pantalla principal después del login.
- Falta definir pantalla de estudio.
- Falta definir componentes del pomodoro.
- Falta definir estados completos de carga en customización.
- Falta definir modo oscuro si el equipo lo quiere.
- Falta definir más estados de error y éxito.
- Falta documentar sonidos o efectos si se agregan al juego.
- Falta definir animaciones del avatar o mascota.
- Falta definir sistema visual para progreso, niveles o recompensas.

---

## Final Design Summary

BitStudy debe verse y sentirse como una plataforma educativa dentro de un videojuego retro. Su identidad se basa en fondo crema, barras negras semitransparentes, fuentes pixeladas, ilustraciones pixel art, opciones seleccionables, botones redondeados y una experiencia de personalización clara.

El login debe presentar el mundo visual de BitStudy mediante una habitación pixel art y una card oscura de acceso. La customización debe permitir al estudiante elegir su compañero, sala y nombre de forma simple, visual y divertida.

La regla principal del sistema es:

**BitStudy no debe sentirse como una página escolar común; debe sentirse como un espacio de aprendizaje personalizado dentro de un videojuego pixel art.**