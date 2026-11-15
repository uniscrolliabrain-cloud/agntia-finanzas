import { z } from 'zod';
import { currencyCodeSchema } from './ids.js';

export const MIN_SCALE = 0;
export const MAX_SCALE = 18;

/** Decimal en texto: sin exponente, sin separadores, sin coma. Nunca float. */
export const AMOUNT_PATTERN = /^-?(?:0|[1-9][0-9]{0,17})(?:\.[0-9]{1,18})?$/;

function decimalPlaces(amount: string): number {
  const dot = amount.indexOf('.');
  return dot === -1 ? 0 : amount.length - dot - 1;
}

export const moneySchema = z
  .object({
    amount: z
      .string()
      .regex(AMOUNT_PATTERN, 'amount must be a plain decimal string within 18 integer and 18 fraction digits'),
    currency: currencyCodeSchema,
    scale: z.number().int().min(MIN_SCALE).max(MAX_SCALE),
  })
  .strict()
  .superRefine((money, ctx) => {
    if (money.amount === '-0') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['amount'], message: 'negative zero is not a value' });
      return;
    }
    const places = decimalPlaces(money.amount);
    if (places > money.scale) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['amount'],
        message: `amount has ${places} decimal places but scale is ${money.scale}`,
      });
    }
  });

export type Money = z.infer<typeof moneySchema>;

/** Convención de signo explícita por fuente; no se infiere del importe. */
export const signConventionSchema = z.enum(['income', 'expense', 'debit', 'credit']);
export type SignConvention = z.infer<typeof signConventionSchema>;

export function money(amount: string, currency: string, scale: number): Money {
  return moneySchema.parse({ amount, currency, scale });
}

export function isZeroMoney(value: Money): boolean {
  return /^-?0(?:\.0+)?$/.test(value.amount);
}
