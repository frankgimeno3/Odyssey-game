# Verificación de Firestore

Prueba realizada el 10 de septiembre de 2026 contra la base real
`pompeiaquizz`, colección `documents`, con Odyssey en `http://localhost:3100`.

## Prueba de extremo a extremo

Se utilizaron dos contextos independientes de Chromium mediante Playwright,
ambos accediendo por el formulario de entrada del proyecto.

1. Se abrió `/printer` en el primer contexto antes de crear resultados.
2. En el segundo se comenzó desde `/landing`, se introdujo cada nombre con
   el teclado del juego, se respondieron las diez preguntas y se pulsaron
   los botones de resultado, impresión y confirmación de recogida.
3. El juego llegó a `/landing/en/915` después de guardar cada resultado.
4. El printer recibió ambos registros sin recargar la página.
5. Tras recargar `/printer`, ambos seguían visibles. La clave local
   `odyssey-documents` era `null` en ese navegador.
6. Una consulta independiente con el SDK de Firebase confirmó exactamente
   un documento por nombre, con el campo `id` igual al ID del documento.

| Nombre de prueba | ID confirmado en Firestore | Resultado | Idioma |
| --- | --- | --- | --- |
| TESTODYSQA | kQ9N3vDDfvnUa6rDVLPG | Apolo | en |
| TESTODYSQB | 6vBsVmUXoc0rbuPGOdoT | Apolo | en |

No hubo errores JavaScript de página durante el recorrido que pasó.

## Limpieza

Ambos registros de prueba se eliminaron utilizando los botones de borrado y
confirmación de `/printer`. Se recargó la página y se verificó su ausencia.
No se borraron registros ajenos a esta prueba.

## Alcance

La prueba utiliza Firestore real, sin emulador ni respuestas simuladas. Valida
la aplicación local con dos sesiones independientes, no el despliegue de Vercel.
Las reglas de Firestore existentes permitieron leer, guardar y borrar; no se
modificaron. Para Vercel deben configurarse las variables descritas en README
y desplegar los cambios.
