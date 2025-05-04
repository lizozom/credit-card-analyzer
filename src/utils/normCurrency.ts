import { getUSDRate, getEURRate } from './currencies';

export async function normCurrencyToNIS(
    value: number, 
    currency: string
): Promise<{ value: number; currency: string }> {
    if (currency === 'ILS' || currency === '₪') {
        return {
            value: value,
            currency: 'ILS'
        };
    } else if (currency === 'USD') {
        const rate = await getUSDRate();
        return {
            value: value * rate,
            currency: 'ILS'
        }
    } else if (currency === 'EUR') {
        const rate = await getEURRate();
        return { 
            value: value * rate,
            currency: 'ILS'
        }
    } else {
        return {
            value: value,
            currency: currency
        }
    }
}