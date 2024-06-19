import { dump } from './autocontract';
import { ethers } from 'ethers';
import './authorizer';
import './account';
import './rolemanager';

async function dumpData(address: string, provider: any, full: boolean = false): Promise<void> {
    dump(address, provider);
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

document.addEventListener('DOMContentLoaded', () => {
    const chainSelect = document.getElementById('chain-select') as HTMLSelectElement;

    const input = document.getElementById("contract-address") as HTMLInputElement;
    const submitButton = document.getElementById("dump-button") as HTMLButtonElement;
    submitButton.addEventListener("click", () => {
        const userInput = input.value;
        const chain = (document.getElementById('chain-select') as HTMLSelectElement).value;
        const provider = new ethers.JsonRpcProvider(getProviderUrl(chain));
        dumpData(userInput, provider);
    });
});
