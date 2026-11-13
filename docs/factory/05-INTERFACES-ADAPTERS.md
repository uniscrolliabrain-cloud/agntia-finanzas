# Cooperación, autoridad y adaptadores

## Autoridad por intención
El padre conserva agentes canónicos, kernel, grafo, bus, policy y SOPs. Finanzas tiene modelos, análisis y capacidades financieras especializadas. Se permite solapamiento con generalistas y Gestoría, pero cada efecto sobre banco, ERP, nómina o Stripe tiene una autoridad y un intent idempotente. Un profesional puede servir a múltiples tenants con scopes separados; no equivale a full-time dedicado.

## Límites de servicio
- **Gestoría + RRHH:** contabilidad oficial, fiscalidad, facturación, nóminas, rotas, ausencias, vacaciones, clock-in/out y expedientes; Finanzas puede consultar proyecciones autorizadas, no duplicar nóminas ni asientos.
- **Ventas:** checkout, Stripe, ventas y cobros comerciales; Finanzas observa settlement/cash y gestiona planificación.
- **Clientes:** CRM, deudas comerciales, reclamaciones y datos de contacto.
- **Legal:** contratos, obligaciones y revisión normativa.
- **Formación:** educación financiera y capacitación de equipos coordinadas.
- **Ciberseguridad:** observabilidad transversal y seguridad sin acceso automático a cuentas bancarias.
- **Marketing/Redes/Branding/Diseño/Vídeo:** costes, presupuestos y resultados económicos por contrato.

## Puertos conceptuales
`BankReadPort`, `BankPaymentProposalPort`, `PaymentExecutionPort` (**DISABLED** hasta proveedor/permiso/regulación), `ERPReadPort`, `LedgerProjectionPort`, `PayrollCostReadPort`, `ForecastEnginePort`, `InvoiceStatusPort`, `AuditEvidencePort`. Qonto/BBVA, ERPNext, Beancount/hledger, CSV, Stripe, Airtable, CRM y MCP son posibles adaptadores, no conexiones existentes.

## Declaración obligatoria de adaptador
`provider`, `capability`, `tenantBinding`, `authType`, `scopes`, `sourceOfTruth`, `freshness`, `dataResidency`, `rateLimit`, `budget`, `idempotency`, `reconciliation`, `timeout`, `circuitBreaker`, `audit`, `schemaVersion`. Un MCP no elude policy. Un timeout después de un posible pago debe generar `outcome_unknown`, no reintento a ciegas.
