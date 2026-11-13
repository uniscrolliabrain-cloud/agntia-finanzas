# Adaptadores y licencias

Todos NOT_IMPLEMENTED/NOT_VERIFIED en runtime. [Repos por SHA](research/repositories.json); lectura de metadatos/README y licencias selectivas, no auditoría completa. No se han clonado/instalado ni usado cuentas demo ajenas. La elección de release/digest estable queda pendiente.

| ID | Repositorio | Licencia metadata | Uso/precaución |
|---|---|---|---|
| R01 | [frappe/erpnext](https://github.com/frappe/erpnext/tree/649786f48b63c8edd6a674a92c409e50b126235a) | GPL-3.0 | Candidato de dominio o referencia; capacidades/edición/ACL se verifican por instalación |
| R02 | [beancount/beancount](https://github.com/beancount/beancount/tree/9747213802acb733ce53acc6e963f5961f47d6cd) | GPL-2.0 | Candidato de dominio o referencia; capacidades/edición/ACL se verifican por instalación |
| R03 | [hledgerorg/hledger](https://github.com/hledgerorg/hledger/tree/ce61d7e539eb4e90eb8eeecf66293c4c469d35ea) | GPL-3.0 | Candidato de dominio o referencia; capacidades/edición/ACL se verifican por instalación |
| R04 | [Actualbudget/actual](https://github.com/Actualbudget/actual/tree/f5f06896c228522d6f09ed8b43828d8dec5931f4) | MIT | Candidato de dominio o referencia; capacidades/edición/ACL se verifican por instalación |
| R05 | [metabase/metabase](https://github.com/metabase/metabase/tree/d6833222251a31ccfe71d375b9302a9542135a3d) | NOASSERTION | Candidato de dominio o referencia; capacidades/edición/ACL se verifican por instalación |

ERPNext GPL-3.0, hledger GPL-3.0 y Beancount GPL-2.0 según metadatos/README deben evaluarse por módulo/distribución. Actual MIT es referencia de presupuesto, no ERP/tesorería empresarial completo. Metabase combina AGPL y Enterprise comercial; un dashboard multiempresa necesita aislamiento de consulta/embedding probado, no una colección con nombre distinto.

La licencia de código no cubre automáticamente pesos/modelos, contenido de cursos, tipografías, plantillas, corpus judiciales, datos actuariales, plugins o servicios cloud. No copiar upstream por comodidad. API/proceso separado es arquitectura recomendada, no excepción jurídica universal. Leer obligaciones de modificación/distribución/servicio en red y compatibilidad antes de incorporar material.

## Registro y discovery

ProviderConnection por tenant/proyecto, endpointRef/secretRef solo servidor, versión/edición y binding remoto. No aceptar URL, base de datos, company/site/course/workspace, token o método libre desde un modelo. Bot mínimo por ámbito, rotación sin perder links y secretos externos. DNS/IP/redirect/tamaño/tiempo/egress protegidos. Public JSON minimizado, no credenciales/nombres internos innecesarios.

CapabilityReport distingue documented, verified_runtime, unknown, unsupported, forbidden y not_configured, con fecha/expiry/evidencia. Un200 con HTML/estructura errónea o empresa equivocada no es healthy. Sin permiso no se cae a admin; no crear registros reales para probar discovery. Unknown deshabilitado y advertencia útil. Cada versión/edición/modulo/rol puede invalidar el report.

## Lectura, staging y sincronización

ExternalLink por tenant/connection/model/externalId/localKind, IDs strings opacos, sourceHash/remoteVersion/mapperVersion. No mapear por nombre o posición. Import preview conserva warnings/campos pendientes/procedencia; aceptación local no fabrica revisión profesional, consentimiento o emisión remota. Repetición idéntica no duplica; cambio legítimo crea nueva revisión/conflicto según AuthorityMap.

Cursores/paginación estables con overlap si hace falta; watermark después de commit local. Barridos detectan archivado/borrado remoto sin destruir historia. Conflicto con dato revisado bloquea overwrite. Dos sistemas que reclaman autoridad por mismo campo/efecto deben acordarlo antes de bidireccionalidad, no last-write-wins silencioso.

## Escritura

Dry-run puro local; preview con diff/alcance/coste y aprobación cuando corresponda. Algunos endpoints llamados test envían o modifican estado: demostrar semántica antes de usarlos. Persistir intent/audit/key/outbox antes de HTTP; cada llamada remota tiene su transacción propia. Si el proveedor acepta y se pierde respuesta, reconciliar por referencia segura; si no existe, bloquear/escalar, no duplicar con otra key/proveedor. No delete/unlink/submit/post/execute genéricos al agente.

El piloto conserva este límite: Sin pagos/transferencias, cambio de cuenta bancaria, conciliación contable posteada, recomendación personalizada de inversión o presentación fiscal en piloto. Fiscalidad acotada y emisión pertenecen a puertos de gestoría/ERP con revisión, no heurística LLM. Un backend faltante queda explícito; un fake útil no se ofrece como conector real. La UI del proveedor puede existir para administración interna, sin ser interfaz obligatoria del cliente. Feature flags detienen nuevas operaciones sin borrar evidencia/links ni simular rollback de efectos externos.
