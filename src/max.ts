import { createScraper, ScraperOptions, ScraperCredentials, CompanyTypes } from 'israeli-bank-scrapers';
import { writeFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
import { ensureOutputDir } from './utils/ensureOutputDir';

// Load environment variables
dotenv.config();


export async function getMaxTransactions() {
    const scraperOptions: ScraperOptions = {
        companyId: CompanyTypes.max,
        startDate: new Date(process.env.START_DATE || '2025-01-01'),
        verbose: process.env.VERBOSE === 'true',
    }

    const scraper = createScraper(scraperOptions);

    const options: ScraperCredentials = {
        username: process.env.MAX_USERNAME!,
        password: process.env.MAX_PASSWORD!,
    };

    try {
        const result = await scraper.scrape(options);

        if (result.success) {
            console.log(result)
            const accounts = result.accounts!;
            const outputData = accounts.map(account => ({
                accountNumber: account.accountNumber,
                transactions: account.txns
            }));

            const today = new Date();
            const outputDir = join('output', today.toISOString().split('T')[0]);
            ensureOutputDir(outputDir);

            const outputPath = join(outputDir, 'max-transactions.json');
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
