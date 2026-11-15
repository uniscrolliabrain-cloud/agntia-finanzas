import Decimal from 'decimal.js';
import { ServiceError, moneySchema, type Money } from '@agntia-finanzas/contracts';

/**
 * Aritmética monetaria determinista del shared kernel.
 * Reglas (docs/release/HANDOFF.md): Decimal, currency + escala explícitas,
 * sin float, sin monedas distintas en la misma suma.
 */
Decimal.set({ precision: 40, rounding: Decimal.ROUND_HALF_EVEN, toExpNeg: -40, toExpPos: 40 });

export function toDecimal(value: Money): Decimal {
  if (typeof value.amount !== 'string') {
    throw new ServiceError('invalid_input', 'money amount must be a decimal string');
  }
  return new Decimal(value.amount);
}

function assertSameCurrency(a: Money, b: Money): void {
  if (a.currency !== b.currency) {
    throw new ServiceError(
      'business_rule',
      `currency mismatch: ${a.currency} vs ${b.currency}; convert with FX and record source/date first`,
    );
  }
}

function fromDecimal(value: Decimal, currency: string, scale: number): Money {
  // Se conserva el valor exacto hasta `scale`; nunca se redondea en silencio.
  if (value.decimalPlaces() > scale) {
    throw new ServiceError('business_rule', `result has ${value.decimalPlaces()} decimal places but scale is ${scale}`);
  }
  return moneySchema.parse({ amount: value.toFixed(scale).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, ''), currency, scale });
}

export function addMoney(a: Money, b: Money): Money {
  assertSameCurrency(a, b);
  const scale = Math.max(a.scale, b.scale);
  return fromDecimal(toDecimal(a).plus(toDecimal(b)), a.currency, scale);
}

export function subtractMoney(a: Money, b: Money): Money {
  assertSameCurrency(a, b);
  const scale = Math.max(a.scale, b.scale);
  return fromDecimal(toDecimal(a).minus(toDecimal(b)), a.currency, scale);
}

export function negateMoney(a: Money): Money {
  return fromDecimal(toDecimal(a).negated(), a.currency, a.scale);
}

export function compareMoney(a: Money, b: Money): -1 | 0 | 1 {
  assertSameCurrency(a, b);
  return toDecimal(a).comparedTo(toDecimal(b)) as -1 | 0 | 1;
}

export function isZero(a: Money): boolean {
  return toDecimal(a).isZero();
}

/** Suma una lista homogénea; rechaza mezcla de monedas en vez de convertir. */
export function sumMoney(values: readonly Money[], currency: string, scale: number): Money {
  return values.reduce<Money>((acc, value) => addMoney(acc, value), { amount: '0', currency, scale });
}

export function formatMoney(value: Money): string {
  return `${value.amount} ${value.currency}`;
}

/** Variance = actual − budget, con convención declarada (docs/09-evaluacion.md). */
export function varianceMoney(actual: Money, budget: Money): Money {
  return subtractMoney(actual, budget);
}
