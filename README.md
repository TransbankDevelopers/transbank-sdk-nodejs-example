# Proyecto de ejemplo SDK Node

Este proyecto permite probar y conocer la implementación de los productos de Transbank mediante el [SDK de Node.js](https://github.com/TransbankDevelopers/transbank-sdk-nodejs), con la finalidad de facilitar la integración de pagos en diversas plataformas y proporcionando ejemplos prácticos para las diferentes operaciones que permite la API para cada producto y modalidad.
El proyecto de ejemplo está construido utilizando el framework [Next.js](https://nextjs.org/).

Puedes revisar el proyecto funcionando en este enlace [https://proyecto-ejemplo-node.transbankdevelopers.cl/](https://proyecto-ejemplo-node.transbankdevelopers.cl/)

## Requisitos

- Node >= 20.
- SDK de Node.js >= 5.0.0

## Instalación

Una vez tengas clonado el repositorio, debes instalar las dependencias del proyecto. Corre el siguiente comando en una terminal para instalar las dependencias:

```bash
npm install
```

## Ejecución

Para poder correr el proyecto en modo desarrollo, debes utilizar el siguiente comando en una consola:

```bash
npm run dev
```

Al terminar, deberías ver la URL para poder acceder al proyecto. Un ejemplo de la URL puede ser **http://localhost:3000**

## Información para contribuir a este proyecto

### Forma de trabajo

- Para los mensajes de commits, nos basamos en las [Git Commit Guidelines de Angular](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits).
- Usamos inglés para los nombres de ramas y mensajes de commit.
- Los mensajes de commit no deben llevar punto final.
- Los mensajes de commit deben usar un lenguaje imperativo y estar en tiempo presente, por ejemplo, usar "change" en lugar de "changed" o "changes".
- Los nombres de las ramas deben estar en minúsculas y las palabras deben separarse con guiones (-).
- Todas las fusiones a la rama principal se deben realizar mediante solicitudes de Pull Request(PR). ⬇️
- Se debe emplear tokens como "WIP" en el encabezado de un commit, separados por dos puntos (:), por ejemplo, "WIP: this is a useful commit message".
- Una rama con nuevas funcionalidades que no tenga un PR, se considera que está en desarrollo.
- Los nombres de las ramas deben comenzar con uno de los tokens definidos. Por ejemplo: "feat/tokens-configurations".

### Short lead tokens permitidos

`WIP` = En progreso.

`feat` = Nuevos features.

`fix` = Corrección de un bug.

`docs` = Cambios solo de documentación.

`style` = Cambios que no afectan el significado del código. (espaciado, formateo de código, comillas faltantes, etc)

`refactor` = Un cambio en el código que no arregla un bug ni agrega una funcionalidad.

`perf` = Cambio que mejora el rendimiento.

`test` = Agregar test faltantes o los corrige.

`chore` = Cambios en el build o herramientas auxiliares y librerías.

`revert` = Revierte un commit.

`release` = Para liberar una nueva versión.

### Creación de un Pull Request

- El PR debe estar enfocado en un cambio en concreto, por ejemplo, agregar una nueva funcionalidad o solucionar un error, pero un solo PR no puede agregar una nueva funcionalidad y arreglar un error.
- El título del los PR y mensajes de commit no debe comenzar con una letra mayúscula.
- No se debe usar punto final en los títulos.
- El título del PR debe comenzar con el short lead token definido para la rama, seguido de ":"" y una breve descripción del cambio.
- La descripción del PR debe detallar los cambios que se están incorporando.
- La descripción del PR debe incluir evidencias de que los test se ejecutan de forma correcta o incluir evidencias de que los cambios funcionan y no afectan la funcionalidad previa del proyecto.
- Se pueden agregar capturas, gif o videos para complementar la descripción o demostrar el funcionamiento del PR.

#### Flujo de trabajo

1. Crea tu rama desde develop.
2. Haz un push de los commits y publica la nueva rama.
3. Abre un Pull Request apuntando tus cambios a develop.
4. Espera a la revisión de los demás integrantes del equipo.
5. Para poder mezclar los cambios se debe contar con 2 aprobaciones de los revisores y no tener alertas por parte de las herramientas de inspección.

### Esquema de flujo con git

![gitflow](https://wac-cdn.atlassian.com/dam/jcr:cc0b526e-adb7-4d45-874e-9bcea9898b4a/04%20Hotfix%20branches.svg?cdnVersion=1324)

## Generar una nueva versión

Para generar una nueva versión, se debe crear un PR (con un título "release: prepare release X.Y.Z" con los valores que correspondan para `X`, `Y` y `Z`). Se debe seguir el estándar [SemVer](https://semver.org/lang/es/) para determinar si se incrementa el valor de `X` (si hay cambios no retrocompatibles), `Y` (para mejoras retrocompatibles) o `Z` (si sólo hubo correcciones a bugs). **El PR debe apuntar a la rama principal**.

En ese PR deben incluirse los siguientes cambios:

1. Modificar el archivo `CHANGELOG.md` agregando una nueva entrada al comienzo con los detalles de los cambios. Esta debe estar escrita en español. Esta entrada debe contener la versión que se esta liberando, la fecha de liberación y la descripción de los cambios realizados.
2. Actualizar el archivo `README.md` si corresponde.
3. Modificar la versión en el archivo `package.json`.

Luego de obtener aprobación del PR y mezclarse, se debe generar de manera inmediata un release en GitHub con el tag `X.Y.Z`. En la descripción del release se debe agregar el mismo detalle que fue agregado al archivo `CHANGELOG.md`.

Una vez realizada la liberación, se debe mezclar la rama release en la rama develop, finalmente realizar un rebase de la rama develop utilizando como base la rama main.
