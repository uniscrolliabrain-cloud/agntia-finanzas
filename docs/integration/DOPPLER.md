# Doppler · variables y ámbitos

Documento de preparación. **No contiene valores** y no se ha conectado ningún proveedor.
Hoy el código sólo lee `process.env`; no hay integración con el SDK de Doppler.

## Variables requeridas por la API

| Nombre | Uso | Secreto | Ejemplo de forma |
|---|---|---|---|
| `SUPABASE_ISSUER` | issuer exacto del proyecto Supabase | No | `https://<project>.supabase.co/auth/v1` |
| `SUPABASE_AUDIENCE` | audience esperada del JWT | No | `authenticated` |
| `SUPABASE_JWKS_URL` | JWKS fijado por servidor (https) | No | `https://<project>.supabase.co/auth/v1/.well-known/jwks.json` |
| `PORT` | puerto HTTP | No | `8787` |

Sin las tres primeras la API no arranca (`server.ts` falla cerrada). No existen
valores por defecto, ni fallback a un tenant/owner.

## Variables previstas (no usadas aún)

| Nombre | Fase | Nota |
|---|---|---|
| `DATABASE_URL` | C06 | conexión de la API, rol `finanzas_api` no-owner |
| `DATABASE_WORKER_URL` | C06 | rol `finanzas_worker` con permisos mínimos |
| `OUTBOX_WORKER_INTERVAL_MS` | C16 | timer técnico, no scheduler de empleados |
| `SUPABASE_JWT_SECRET` | — | **no usar**: se exige verificación asimétrica vía JWKS |

## Ámbitos y rotación

- Un proyecto Doppler por entorno (`dev`, `staging`, `production`) con configuraciones separadas; nunca compartir el JWKS de producción con desarrollo.
- Secretos de proveedores externos (bancos, ERP, Metabase) se referencian por `secretRef` en servidor; no se inyectan en el modelo ni en el navegador.
- Rotación: cambiar el valor en Doppler, reiniciar el proceso y verificar que el JWKS/credencial antigua deja de aceptarse. La rotación se prueba antes de habilitar una capacidad.
- Anam, modelos y conectores usan claves propias con presupuesto y caducidad; el plan del SaaS no autoriza su gasto.
- Prohibido escribir valores en Git, logs, reportes, eventos o prompts.

## Arranque seguro

1. Cargar variables desde el gestor del entorno (no desde archivos versionados).
2. Validar presencia y forma al arrancar; abortar si falta algo.
3. Confirmar que el issuer/audience/JWKS corresponden al proyecto esperado antes de aceptar tráfico.
4. Registrar sólo nombres de variables en logs, nunca valores.
