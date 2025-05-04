import { createScraper, ScraperOptions, CompanyTypes, ScraperCredentials } from 'israeli-bank-scrapers';
import { writeFileSync } from 'fs';
import { ensureOutputDir } from './utils/ensureOutputDir';
import { join } from 'path';

export async function getCalTransactions() {
    const scraperOptions: ScraperOptions = {
        companyId: CompanyTypes.visaCal,
        startDate: new Date(process.env.START_DATE || '2025-01-01'),
        verbose: process.env.VERBOSE === 'true',
        showBrowser: process.env.SHOW_BROWSER === 'true',
    }

    const scraper = createScraper(scraperOptions);

    const options: ScraperCredentials = {
        username: process.env.CAL_USERNAME!,
        password: process.env.CAL_PASSWORD!,
    };

    try {
        const result = await scraper.scrape(options);

        if (result.success) {
            const accounts = result.accounts!;
            const outputData = accounts.map(account => ({
                accountNumber: account.accountNumber,
                transactions: account.txns
            }));

            const today = new Date();
            const outputDir = join('output', today.toISOString().split('T')[0]);
            ensureOutputDir(outputDir);
            
            const outputPath = join(outputDir, 'cal-transactions.json');
            writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
            console.log(`✅ Saved transactions to ${outputPath}`);
            return result;
        } else {
            console.error('❌ Scraping failed:', result.errorType, result.errorMessage);
            return result;
        }
    } catch (e: any) {
        console.error('❗ Unexpected error:', e.message);
        throw e;
    }
}