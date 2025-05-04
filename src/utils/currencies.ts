interface ExchangeRateResponse {
    date: string;
    ils: {
        [key: string]: number;
    };
}

let cachedRates: { [key: string]: number } | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

async function fetchExchangeRates(): Promise<{ [key: string]: number }> {
    const now = Date.now();
    if (cachedRates && (now - lastFetchTime) < CACHE_DURATION) {
        return cachedRates;
    }

    try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/ils.json');
        const data: ExchangeRateResponse = await response.json();
        
        // The rates come as ILS/currency, we need currency/ILS
        const ilsRates: { [key: string]: number } = {};
        for (const [currency, rate] of Object.entries(data.ils)) {
            ilsRates[currency.toUpperCase()] = 1 / rate;
            // round to 2 decimal places
            ilsRates[currency.toUpperCase()] = Math.round(ilsRates[currency.toUpperCase()] * 100) / 100;
        }

        cachedRates = ilsRates;
        lastFetchTime = now;
        return ilsRates;
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        // Fallback rates in case API is unavailable
        return {
            USD: 3.7,
            EUR: 4.0,
            ILS: 1
        };
    }
}

export async function getUSDRate(): Promise<number> {
    const rates = await fetchExchangeRates();
    return rates.USD;
}

export async function getEURRate(): Promise<number> {
    const rates = await fetchExchangeRates();
    return rates.EUR;
}