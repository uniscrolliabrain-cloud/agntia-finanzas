# PREP — Finanzas: inventario y conservación

**2026-11-13 · DOCUMENTATION_ONLY.** El repositorio ya contiene documentación: README, producto/investigación/referentes/adaptadores, arquitectura (incluidos twins y compatibilidad con padre), contratos, seguridad, UX, servicio, costes, evaluación, research, release, operations y 42 campañas originales con 294 tareas y 84 gates. No existe aplicación financiera verificada por esta preparación.

## Documentación preexistente, preservada
`README.md`; `docs/01-producto.md` a `docs/09-evaluacion.md`; `docs/architecture/01-arquitectura.md` a `04-runtime.md`; `docs/contracts/01-contratos.md`; `docs/campaigns/README.md`, `campaign.json` y 42 documentos; `docs/research/`; `docs/release/`; `docs/operations/RUNBOOK.md`.

## Política
No mover ni borrar originales porque manifest y links dependen de rutas actuales. `prep/` funciona como índice y registro de deltas. Migración física futura: congelar SHAs, inventariar links, copiar, reparar manifest, validar, borrar en commit separado. Los documentos antiguos no son evidencia de software implementado.

## Alcance fundador
Finanzas incluye gestión financiera de pymes, educación financiera, tesorería, cobros/pagos, gestión económica y coordinación de nóminas con Gestoría/RRHH. Integraciones preferentes Qonto y BBVA cuando sus APIs, permisos y acuerdos lo permitan. Sin licencia regulada propia, separar lectura, análisis, preparación de órdenes y ejecución bancaria. No confundir capacidades deseadas con autorizaciones existentes.

## Estado de evidencia
README y documentos principales leídos vía GitHub; padre referenciado documentalmente a `54b8d5407a8576459448c4d059a877297d18ca7a` (lectura parcial anterior). No checkout, tests ni auditoría exhaustiva del padre. Futuros cambios requieren verificación de SHA y contratos.
