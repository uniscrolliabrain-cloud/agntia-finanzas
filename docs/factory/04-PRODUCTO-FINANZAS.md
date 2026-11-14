# Perfil de producto — Departamento financiero agéntico

**Diseño conceptual.** Servicio financiero profesional bajo demanda para pymes/autónomos y empresas clientes; agente conversacional por Anam, teléfono, WhatsApp o chat con verificación por canal. No prometer empleado dedicado full-time ni acceso bancario universal.

## Cobertura
1. Diagnóstico económico, estructura de costes, ingresos, márgenes, KPIs y educación financiera empresarial.
2. Tesorería: saldos observados, posiciones de caja, vencimientos, previsiones de cobros/pagos y alertas.
3. Contabilidad de gestión: mapping, conciliación propuesta, informes y cierre analítico; no asiento fiscal automático.
4. Presupuestos, escenarios, FP&A, forecasting, sensibilidad y planes de contingencia.
5. Cuentas a cobrar/pagar: seguimiento, previsión y propuestas, coordinando con Clientes/Ventas/Gestoría.
6. Pagos: preparación, verificación de destinatario/importe, approvals y estados; **ejecución solo con proveedor, mandato, permisos y marco regulatorio válidos**.
7. Costes laborales y nóminas: datos agregados autorizados desde Gestoría/RRHH; Finanzas planifica caja y costes, Gestoría gestiona expediente/nómina.
8. Informes conversacionales explicables con fuentes, fechas, hipótesis, límites, gráficos y evidencias.
9. Integraciones por cliente: Qonto y BBVA preferentes, ERP/CRM existentes, CSV, APIs, MCP cuando corresponda; no forzar migración.
10. Auditoría continua de salud financiera, riesgos y oportunidades, con recomendaciones revisables.

## Vertical inicial conceptual
Empresa sintética → import de extractos/facturas sintéticas → mapping versionado → conciliación propuesta → posición de caja → forecast 13 semanas con supuestos → informe/alertas → revisión humana → handoff a Gestoría cuando proceda → auditoría causal end-to-end. `PaymentProposal` nunca se ejecuta en esta vertical.

## Regulación y límites
Acceso PSD2, AIS/PIS, banca abierta, iniciación de pagos, distribución financiera y asesoramiento regulado son capacidades diferentes; una API o MCP no concede licencias. No custodiar fondos, no ofrecer servicios regulados sin base legal/proveedor autorizado, no asumir BBVA/Qonto write API disponible. Distinguir cash flow real vs escenario. No ejecutar inversión ni pagos en piloto. Evitar asesoramiento fiscal/contable definitivo sin revisión competente.
