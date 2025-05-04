import { getMaxTransactions } from './max';
import { getBankTransactions } from './bank';
import { getCalTransactions } from './cal';

async function main() {
    try {
        console.log('\nFetching CAL transactions...');
        await getCalTransactions();
        
        console.log('Fetching MAX transactions...');
        await getMaxTransactions();
        
        console.log('\nFetching Mizrahi Bank transactions...');
        await getBankTransactions();

        console.log('\nAll transactions have been fetched and saved to JSON files');
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
    }
}

main();