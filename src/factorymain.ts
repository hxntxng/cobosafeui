import { ethers } from 'ethers';
import { CoboFactory } from './factory';
import { FACTORY_ADDRESS } from './utils.js';

async function getFactoryData(chain: string): Promise<void> {
    try {
        const provider = new ethers.JsonRpcProvider(getProviderUrl(chain));
        const factory = new CoboFactory(FACTORY_ADDRESS, provider);
        factory.dump();
    } catch (error) {
        console.error('Error:', error);
    }
}

function getProviderUrl(chain: string): string {
    switch (chain) {
        case 'ethereum':
            return "https://rpc.ankr.com/eth";
        case 'polygon':
            return "https://rpc.ankr.com/polygon";
        case 'arbitrum':
            return "https://rpc.ankr.com/arbitrum";
        case 'avalanche':
            return "https://rpc.ankr.com/avalanche";
        // case 'mantle':
        //     return "https://rpc.ankr.com/mantle";
        default:
            throw new Error('Unsupported chain');
    }
}

document.getElementById('chain-select')?.addEventListener('change', (event: Event) => {
    const selectedChain = (event.target as HTMLSelectElement).value;
    getFactoryData(selectedChain);
});

getFactoryData('ethereum');

