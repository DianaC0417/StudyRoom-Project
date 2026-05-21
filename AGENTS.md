# 🤖 AGENTS.md — Reglas de IA y Desarrollo en BitStudy

## 📌 Propósito

Este documento define cómo el equipo debe usar Inteligencia Artificial y cómo mantener la arquitectura del proyecto sin romper la estructura.

---

## 🧠 Uso obligatorio de IA

Todos los integrantes deben usar IA como herramienta de apoyo, pero siguiendo reglas:

- No copiar código sin entenderlo
- Adaptar el código a la arquitectura del proyecto
- Validar que la solución funcione correctamente
- Explicar el código antes de integrarlo

---

## 💬 Reglas para Prompts (MUY IMPORTANTE)

Todos deben usar prompts claros y consistentes.

### ✅ Buen prompt:

> "Crea un servicio en TypeScript para manejar el Pomodoro usando arquitectura hexagonal y un repositorio como dependencia"

### ❌ Mal prompt:

> "Haz un temporizador en React"

---

### 🔒 Reglas de prompts:

- Siempre especificar:
  - Tecnología (React, TypeScript)
  - Arquitectura (hexagonal)
  - Capa (domain, application, adapter, ui)
- Pedir código limpio y separado
- Evitar soluciones rápidas sin estructura

---

## 🏗️ Arquitectura obligatoria

El proyecto sigue arquitectura tipo **Hexagonal / Clean Architecture**.

### Reglas:

- `domain` → NO se modifica sin autorización
- `application` → contiene toda la lógica
- `adapters` → acceso a datos (LocalStorage, futuro cloud como DynamoDB)
- `ui` → solo interfaz (NO lógica)
- `game` → renderizado 2D
- `config` → dependencias

---

### 🚫 Prohibido:

- Acceder a LocalStorage desde UI
- Mezclar lógica en componentes React
- Saltarse los services
- Conectar directamente UI con adapters
A
---

## 🔄 Reglas de trabajo en equipo

### 📢 Comunicación obligatoria

Cada integrante debe avisar:

- Qué archivo modificó
- Qué funcionalidad implementó
- Si afecta a otros módulos

Ejemplo:

> "Modifiqué pomodoroService, ahora guarda estado automáticamente"

---

### 🌿 Uso de ramas (Git)

- Prohibido trabajar en `main`
- Cada integrante usa su rama:
  - `feature-login`
  - `feature-pomodoro`
  - etc.

---

### 💾 Commits obligatorios

Formato:

- `feat:` nueva funcionalidad
- `fix:` corrección de error
- `docs:` documentación

Ejemplo:

```bash
feat: agregar lógica de pomodoro