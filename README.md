# TP3 · Dos sentencias. Dos soluciones — AutoMail AI (Sorteo S10-B)

**Institución:** IFTS N.º 29 — Desarrollo de Sistemas Web (Front End · 2.º Cuatrimestre 2026)  
**Grupo:** Grupo 31 · **Sintaxia**  
**Startup asignada por sorteo:** **AutoMail AI** (`S10-B`, creada por estudiantes del **IFTS N.º 16**)  
**Bloque asignado:** Correo sospechoso y personalización (`Frase 1 · R3` y `Frase 2 · R4`)  
**Modalidad de desarrollo:** Construcción **100% agéntica** (HTML5, CSS3 y JavaScript puro sin edición manual de código).

---

## 1. Enlaces de entrega y verificación pública

- **Repositorio público del grupo:** [https://github.com/GRUPO-31/TP3](https://github.com/GRUPO-31/TP3)
- **Landing page publicada (Vercel / GitHub Pages):** *(Agregar enlace una vez conectada la rama `main` en Vercel o GitHub Pages)*

### Comprobación sin sesión activa (ventana privada / incógnito)
- [x] El repositorio abre públicamente sin requerir inicio de sesión.
- [x] La landing carga el logo original completo de **AutoMail AI** (`assets/automail-logo.webp`), las dos sentencias textuales (`R3` y `R4`), los dos diagramas de flujo agéntico y los desplegables.
- [x] Los desplegables (`<details>`) abren y cierran tanto con clic como con teclado (`Tab` + `Enter` o `Espacio`).
- [x] La lectura en escritorio (`1280px` / `1366px` / `1440px` / `1920px`) no presenta recortes ni desbordes horizontales.

---

## 2. Integrantes del grupo (Sintaxia · Grupo 31), roles y revisión colaborativa

| Integrante | Perfil de GitHub | Rol principal en el TP3 | Aporte concreto realizado |
| :--- | :--- | :--- | :--- |
| **Brian Lavandera** | [@brianlavandera3](https://github.com/brianlavandera3) | Coordinación de instrucciones al agente e iteración visual | Encargo integral a Antigravity con el sorteo `S10-B`, pedidos de rediseño y simplificación de lectura en pantalla y publicación en el repositorio del grupo. |
| **Diego Rodriguez** | [@diegojrodriguez](https://github.com/diegojrodriguez) | Análisis lógico de sentencias y estructura de flujos | Verificación de conectores lógicos de `R3` y `R4` (`y además` / `o` / negaciones) y coherencia entre las reglas del IFTS 16 y los dos recorridos propuestos. |
| **Sergio Vargas** | [@SergioVargas101](https://github.com/SergioVargas101) | Validación de casos límite y excepciones | Revisión de escenarios borde (fallo técnico del verificador antispam en `R3` y correos mixtos con consulta frecuente + reclamo en `R4`) e intervención humana. |
| **Cristian Villagra** | [@Crrisst](https://github.com/Crrisst) | Pruebas en escritorio, accesibilidad y despliegue | Comprobación visual del logo original sin recortes, navegación por clic y teclado en los desplegables y verificación de enlaces públicos sin sesión. |

### Registro de revisión entre integrantes y mejora aplicada (Nivel *Propone*)
Durante la revisión cruzada del equipo sobre el primer planteo de los flujos, detectamos dos puntos críticos que mejoraron la entrega final:
1. **Comprensión del alcance de ambas reglas:** inicialmente surgió la duda de si debía elegirse una sola frase del sorteo, pero al contrastar la consigna y la rúbrica (*«Dos sentencias. Dos soluciones»* y punto de control del bloque `S10-B`), confirmamos que debían resolverse **ambas sentencias (`R3` y `R4`)** y que además estaban encadenadas lógicamente (`R3` filtra `p` = correo sospechoso, y `R4` parte de `¬p` = correo no sospechoso).
2. **Distinción entre regla original y decisión del grupo:** al revisar qué ocurría cuando la condición daba `NO` en cada diagrama, acordamos pedirle al agente que diferenciara visualmente con etiquetas (`Regla original R3/R4` vs. `Decisión del Grupo 31`) los caminos no regulados por las frases originales, evitando caer en la falacia de negar el antecedente y sumando además un **probador visual de recorrido** para exponer cada caso con claridad en clase.

---

## 3. Startup asignada y fichas de desarme lógico

- **Nombre:** AutoMail AI (origen: estudiantes del **IFTS N.º 16**)
- **Rubro:** Atención al cliente y correo
- **Objetivo:** Asistente para clasificar correos y responder consultas frecuentes mediante respuestas aprobadas.
- **Bloque:** Correo sospechoso y personalización (`S10-B`)

### Ficha 1 — Sentencia R3
- **Sentencia original:** *«Si un correo se marca como sospechoso de spam, el sistema lo separa para revisión sin borrarlo ni responderlo automáticamente.»*
- **Datos necesarios:** Correo entrante (remitente, cabeceras `SPF/DKIM/DMARC`, asunto, cuerpo) + marca del filtro antispam.
- **Condición:** `p`: el correo está marcado como sospechoso de spam.
- **Consecuencia obligatoria:** Separar en bandeja de revisión (`q`) **Y** no borrar (`¬r`) **Y** no enviar respuesta automática (`¬s`).
- **Propuesta 1 — Guardián de Cuarentena Preventiva:** Un agente inicial consulta el motor antispam; si `p` es verdadero, aísla el mensaje intacto y bloquea respuestas para que un operador humano audite falsos positivos. Si `p` es falso (`¬p`, decisión del grupo), lo transfiere al Flujo 2. Si el motor falla por timeout (caso límite), aplica retención segura y pide revisión humana.

### Ficha 2 — Sentencia R4
- **Sentencia original:** *«Si un correo no es sospechoso y además requiere personalización, contiene un reclamo, carece de respuesta aprobada o resulta ambiguo, el sistema lo deriva a una persona sin responder automáticamente.»*
- **Datos necesarios:** Estado verificado `¬p` (no sospechoso), contenido del mensaje, contexto básico de cuenta/pedido y Catálogo de Respuestas Aprobadas.
- **Condición compuesta:** `¬p ∧ (a ∨ b ∨ c ∨ d)` — correo no sospechoso **y además** al menos una de cuatro alertas: requiere personalización (`a`) **o** contiene reclamo (`b`) **o** carece de respuesta aprobada (`c`) **o** resulta ambiguo (`d`).
- **Consecuencia obligatoria:** Derivar a una persona (`h`) **Y** no responder automáticamente (`¬s`).
- **Propuesta 2 — Enrutador Sensible de Casos Complejos:** Si se activa cualquiera de las cuatro alertas en la disyunción, frena la autorrespuesta y crea un ticket para un especialista humano indicando qué motivo exacto disparó la derivación (incluso en el caso límite de correos mixtos con consulta frecuente + queja). Solo cuando ninguna alerta se activa (decisión de diseño del grupo alineada con AutoMail AI), habilita la respuesta aprobada correspondiente.

---

## 4. Herramientas de IA, aplicación, modelo y evidencia de iteración

### Declaración de entorno y modelo utilizado
| Categoría | Detalle registrado | Uso concreto en el proyecto |
| :--- | :--- | :--- |
| **Aplicación (entorno agéntico)** | **Google Antigravity** | Generación integral de archivos (`index.html`, `styles.css`, `script.js`, `README.md`), recuperación del logo oficial `S10.webp` desde la portada de la cátedra y pruebas de renderizado en navegador desktop. |
| **Modelo seleccionado** | **Gemini 4 Argon (Medium)** *(nombre informado en el selector de modelos de Antigravity)* | Análisis lógico de las sentencias `R3` y `R4`, arquitectura semántica HTML, maquetación de los dos diagramas de flujo agéntico, accesibilidad por teclado y redacción técnica. |

*(Construcción 100% agéntica: ningún archivo de código fue editado manualmente; la página final es estática y no ejecuta IA ni consume APIs externas).*

### Evidencia de iteración agéntica (Nivel *Propone*)
1. **Instrucción inicial:** se entregó al agente la consigna completa del TP3 junto con los datos del sorteo `S10-B` (**AutoMail AI**, frases `R3` y `R4`) solicitando resolver el trabajo práctico completo en una landing clara para escritorio.
2. **Primera revisión — Fidelidad lógica y alcance:**
   - Se verificó la inclusión obligatoria de **ambas sentencias (`R3` y `R4`)** y la descarga del logo original oficial (`S10.webp`) desde la portada de la cátedra.
   - Se agregaron etiquetas en los diagramas para diferenciar las acciones exigidas por las sentencias originales del **IFTS 16** frente a las decisiones de diseño del **Grupo 31 (IFTS 29)**.
3. **Segunda y tercera revisión — Síntesis de lectura y claridad visual (pedidos directos tras probar la página):**
   - **Problema detectado:** la primera versión tenía bloques duplicados, fórmulas lógicas visibles y exceso de texto que mareaba la lectura inicial en pantalla.
   - **Pedido de mejora al agente:** reducir drásticamente la cantidad de texto en la vista principal, hacer el diseño más amable y lograr que cada flujo se entienda en segundos.
   - **Qué cambió y por qué mejoró:** se simplificó toda la landing a **3 bloques claros** (Presentación de **AutoMail AI**, **Solución 1 · R3** y **Solución 2 · R4**); se rediseñaron los dos diagramas con pasos breves, iconos claros y bifurcación directa en **2 caminos (`SÍ` / `NO`)**; y se trasladaron las herramientas detalladas, excepciones y ejemplos de prueba adentro de los **desplegables** (`<details>`), cumpliendo exactamente el criterio de la consigna (*«Los desplegables permiten conocer los detalles sin recargar la lectura»*).

---

## 5. Cómo reproducir y probar el proyecto localmente

El proyecto no requiere `Node.js`, gestores de paquetes ni compilación previa:

1. Clonar o descargar este repositorio:
   ```bash
   git clone https://github.com/GRUPO-31/TP3.git
   cd TP3
   ```
2. Abrir el archivo `index.html` directamente en cualquier navegador moderno de escritorio (Chrome, Edge, Firefox), o bien levantar un servidor estático local opcional:
   ```bash
   python -m http.server 8080
   ```
   y visitar `http://localhost:8080` en resolución de escritorio.
3. **Pruebas recomendadas:**
   - Comprobar que el logo de **AutoMail AI** se vea íntegro en la tarjeta inicial.
   - Usar los botones del **Probador visual de recorrido** en la Propuesta 1 (`R3`) y en la Propuesta 2 (`R4`) para contrastar el camino `SÍ`, el camino `NO` y el `Caso límite`.
   - Navegar con la tecla `Tab` hasta cualquier desplegable (`<summary>`) y presionar `Enter` o `Espacio` para verificar su apertura y cierre por teclado.

---

## 6. Estructura de archivos

```text
tp3-automail-ai/
├── assets/
│   └── automail-logo.webp   # Logo original oficial asignado (Sorteo S10-B · IFTS 16)
├── index.html               # Estructura semántica, presentación, 2 diagramas y desplegables
├── styles.css               # Diseño visual desktop, paleta AutoMail AI y estados accesibles
├── script.js                # Probador estático de caminos, control de desplegables y navegación
└── README.md                # Documentación de integrantes, lógica, herramientas IA e iteración
```
