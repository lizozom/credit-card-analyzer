import { readFile, writeFile } from 'fs/promises';
import path, { join } from 'path';
import { ensureOutputDir } from './utils/ensureOutputDir';
import { getNormalizedCategory, getNormalizedBusinessName } from './utils/categoryMapping';
import { normCurrencyToNIS } from './utils/normCurrency';

interface Transaction {
    source: string;
    accountNumber: string;
    date: string;
    processedDate: string;
    description: string;
    category: string;
    originalAmount: number;
    originalCurrency: string;
    chargedAmount: number;
    chargedCurrency: string;
    type: string;
    status: string;
    memo: string;
    identifier?: string;
    installments?: {
        number: number;
        total: number;
    };
}

async function processTransactions() {
    const today = new Date();
    const outputDir = join('output', today.toISOString().split('T')[0]);
                
    await ensureOutputDir(outputDir);
    
    // Read CAL and MAX transaction files
    const calData = JSON.parse(
        await readFile(path.join(outputDir, 'cal-transactions.json'), 'utf-8')
    );
    const maxData = JSON.parse(
        await readFile(path.join(outputDir, 'max-transactions.json'), 'utf-8')
    );

    // Combine and process transactions
    const allTransactions = await Promise.all([
        ...calData.flatMap((account: any) => 
            account.transactions.map(async (t: Transaction) => {
                const normalized = await normCurrencyToNIS(t.chargedAmount, t.chargedCurrency);
                return { 
                    ...t, 
                    source: 'CAL', 
                    accountNumber: account.accountNumber,
                    chargedAmount: normalized.value,
                    chargedCurrency: normalized.currency
                };
            })
        ),
        ...maxData.flatMap((account: any) => 
            account.transactions.map(async (t: Transaction) => {
                const normalized = await normCurrencyToNIS(t.chargedAmount, t.chargedCurrency);
                return { 
                    ...t, 
                    source: 'MAX', 
                    accountNumber: account.accountNumber,
                    chargedAmount: normalized.value,
                    chargedCurrency: normalized.currency
                };
            })
        )
    ]);

    // filter out הסדר חוב-כאל
    const filteredTransactions = allTransactions.filter(t => !t.description.includes('הסדר חוב-כאל'));

    // Convert to CSV
    const csvHeaders = [
        'source',
        'accountNumber',
        'date',
        'processedDate',
        'processedMonth',
        'description',
        'category',
        'originalAmount',
        'originalCurrency',
        'chargedAmount',
        'chargedCurrency',
        'type',
        'status',
        'memo',
        'identifier',
        'installmentNumber',
        'installmentTotal'
    ].join(',');

    const csvRows = filteredTransactions.map(t => [
        t.source,
        `"${t.accountNumber}"`,
        t.date,
        t.processedDate,
        t.processedDate ? t.processedDate.substring(0, 7) : '',
        `"${getNormalizedBusinessName(t.description.replace(/"/g, '""'), t.memo)}"`,
        `"${getNormalizedCategory(t.category, t.description)}"`,
        t.originalAmount,
        t.originalCurrency,
        t.chargedAmount,
        t.chargedCurrency,
        t.type,
        t.status,
        `"${t.memo.replace(/"/g, '""')}"`,
        t.identifier || '',
        t.installments?.number || '',
        t.installments?.total || ''
    ].join(','));

    const csvContent = [csvHeaders, ...csvRows].join('\n');
    await writeFile(path.join(outputDir, 'credit-cards.csv'), csvContent);
}

processTransactions().catch(console.error);