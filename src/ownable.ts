import { ethers, toUtf8CodePoints } from 'ethers';
import abi from '../abi/BaseOwnable.json';
import { s32, ETHEREUM_PROVIDER, loadContract } from './utils';


export class BaseOwnable {
    contract: any;
    addr: string;
    name: string;
    constructor(addr: string, provider: any=ETHEREUM_PROVIDER) {
        this.contract = new ethers.Contract(addr, abi, provider);
        this.addr = addr;
        this.name = "BaseOwnable";
    }

    async getName(): Promise<string> {
        try {
            const contractName = await this.contract.NAME();
            return s32(contractName);
        } catch (error) {
            console.error("Error:", error);
            return '';
        }
    }

    async getAddress(): Promise<string> {
        return this.addr;
    }

    async getVersion(): Promise<string> {
        try {
            const factoryVersion = await this.contract.VERSION();
            return factoryVersion.toHexString();
        } catch (error) {
            console.error("Error:", error);
            return '';
        }
    }

    async getOwner(): Promise<string> {
        try {
            const factoryOwner = await this.contract.owner();
            return factoryOwner;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    async getPendingOwner(): Promise<string> {
        try {
            const factoryPendingOwner = await this.contract.pendingOwner();
            return factoryPendingOwner;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    async dump(full = false): Promise<void> {
        const factoryNameElement = document.getElementById('factory-name');
        if (factoryNameElement) {
            try {
                const name = await this.getName();
                factoryNameElement.innerText = `Factory Name: ${name || ''}`;
            } catch (error) {
                console.error("Error:", error);
            }
        }


        const factoryAddressElement = document.getElementById('factory-address');
        if (factoryAddressElement) {
            factoryAddressElement.innerText = `Factory Address: ${this.addr}`;
        }

        const factoryVersionElement = document.getElementById('factory-version');
        if (factoryVersionElement) {
            try {
                const version = await this.getVersion();
                factoryVersionElement.innerText = `Factory Version: ${version}`;
            } catch (error) {
                console.error("Error:", error);
            }
        }

        const factoryOwnerElement = document.getElementById('factory-owner');
        if (factoryOwnerElement) {
            try {
                const owner = await this.getOwner();
                factoryOwnerElement.innerText = `Factory Owner: ${owner}`;
            } catch (error) {
                console.error("Error:", error);
            }
        }

        const factoryPendingOwnerElement = document.getElementById('factory-pending-owner');
        if (factoryPendingOwnerElement) {
            try {
                const pendingOwner = await this.getPendingOwner();
                if (pendingOwner !== "0x0000000000000000000000000000000000000000") {
                    factoryPendingOwnerElement.innerText = `Factory Pending Owner: ${pendingOwner}`;
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

    }
}

export class ERC20 {
    private static _CACHE: Record<string, string> = {};

    private contract: any;

    constructor(addr: string) {
        this.contract = loadContract("ERC20", addr);
    }

    get address(): string {
        return this.contract.address;
    }

    get symbol(): string {
        let ethers = require('./node_modules/ethers')
        const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth'); // help not standardized
        const network = provider.getNetwork(); // help idk if it needs an await
        const chainId = network.chainId;
        const tag = `${chainId} ${this.address}`;

        // Cache to speed.
        if (!(tag in ERC20._CACHE)) {
            ERC20._CACHE[tag] = this.contract.symbol();
        }

        return ERC20._CACHE[tag];
    }
}



