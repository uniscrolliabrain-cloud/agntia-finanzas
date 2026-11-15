import { describe, expect, it } from 'vitest';
import { ServiceError, money } from '@agntia-finanzas/contracts';
import { addMoney, compareMoney, formatMoney, negateMoney, subtractMoney, sumMoney, varianceMoney } from '../src/arithmetic.js';

describe('money arithmetic', () => {
  it('adds decimals exactly without binary float drift', () => {
    const result = addMoney(money('0.10', 'EUR', 2), money('0.20', 'EUR', 2));
    expect(result).toEqual({ amount: '0.3', currency: 'EUR', scale: 2 });
  });

  it('rejects mixing currencies instead of converting silently', () => {
    expect(() => addMoney(money('10.00', 'EUR', 2), money('10.00', 'USD', 2))).toThrowError(ServiceError);
    try {
      addMoney(money('10.00', 'EUR', 2), money('10.00', 'USD', 2));
    } catch (error) {
      expect((error as ServiceError).code).toBe('business_rule');
      expect((error as ServiceError).message).toContain('currency mismatch');
    }
  });

  it('keeps the larger scale when adding mixed-scale amounts', () => {
    expect(addMoney(money('1.5', 'EUR', 2), money('0.005', 'EUR', 3))).toEqual({
      amount: '1.505',
      currency: 'EUR',
      scale: 3,
    });
  });

  it('never rounds a result that exceeds the declared scale', () => {
    expect(() => addMoney(money('1.00', 'EUR', 2), money('0.005', 'EUR', 3))).not.toThrow();
    expect(() => subtractMoney(money('1.00', 'EUR', 2), money('0.001', 'EUR', 3))).not.toThrow();
    expect(() => subtractMoney(money('1.00', 'EUR', 2), money('0.0001', 'EUR', 4))).not.toThrow();
  });

  it('represents negative amounts without collapsing to negative zero', () => {
    expect(negateMoney(money('0.00', 'EUR', 2)).amount).toBe('0');
    expect(negateMoney(money('12.34', 'EUR', 2)).amount).toBe('-12.34');
  });

  it('compares amounts and formats with currency', () => {
    expect(compareMoney(money('2.00', 'EUR', 2), money('2.0', 'EUR', 2))).toBe(0);
    expect(compareMoney(money('2.01', 'EUR', 2), money('2.00', 'EUR', 2))).toBe(1);
    expect(formatMoney(money('-5.50', 'JPY', 2))).toBe('-5.50 JPY');
  });

  it('computes variance as actual minus budget', () => {
    expect(varianceMoney(money('120.00', 'EUR', 2), money('100.00', 'EUR', 2))).toEqual({
      amount: '20',
      currency: 'EUR',
      scale: 2,
    });
  });

  it('sums homogeneous lists starting from exact zero', () => {
    expect(sumMoney([money('10.00', 'EUR', 2), money('5.50', 'EUR', 2)], 'EUR', 2)).toEqual({
      amount: '15.5',
      currency: 'EUR',
      scale: 2,
    });
  });
});
