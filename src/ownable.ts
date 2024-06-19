import { s32, loadContract } from './utils.js';
import "reflect-metadata";

const subclassesKey = Symbol('subclasses');

export function RegisterSubclass(baseClass: Function) {
    return function(target: Function) {
        const subclasses = Reflect.getMetadata(subclassesKey, baseClass) || [];
        subclasses.push(target);
        Reflect.defineMetadata(subclassesKey, subclasses, baseClass);
    };
  }
  

export class BaseOwnable {
    contract: any;
    addr: string;
    provider: any;
    constructor(addr: string, provider: any) {
        this.addr = addr;
        this.provider = provider;
    }

    async getContract(): Promise<any> {
        if (this.contract) {
            return this.contract;
        }
        this.contract = await loadContract(this.constructor.name, this.addr, this.provider);
        return this.contract;
    }

    static getSubclasses(): Function[] {
        return Reflect.getMetadata(subclassesKey, this) || [];
    }

    async getName(): Promise<string> {
        try {
            const contractName = await (await this.getContract()).NAME();
            
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
            const factoryVersion = await (await this.getContract()).VERSION();
            return factoryVersion.toString(16);
        } catch (error) {
            console.error("Error:", error);
            return '';
        }
    }

    async getOwner(): Promise<string> {
        try {
            const factoryOwner = await (await this.getContract()).owner();
            return factoryOwner;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    async getPendingOwner(): Promise<string> {
        try {
            const factoryPendingOwner = await (await this.getContract()).pendingOwner();
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
// TODO contract
export class ERC20 {
    private static _CACHE: Record<string, string> = {};

    private contract: any;
    private addr: any;
    provider: any;
    constructor(addr: string, provider: any) {
        this.contract = loadContract("ERC20", addr, provider); 
        this.provider = provider;
    }
    async getContract(): Promise<any> {
        if (this.contract) {
            return this.contract;
        }
        this.contract = await loadContract("ERC20", this.addr, this.provider);
        return await loadContract("ERC20", this.addr, this.provider);
    }


    get symbol(): Promise<string | 0> {
        return (async () => {
        try {
            const network = await this.provider.getNetwork();
            const chainId = network.chainId;
            const tag = `${chainId} ${this.addr}`;

            if (!(tag in ERC20._CACHE)) {
                ERC20._CACHE[tag] = (await this.getContract()).symbol();
            }

            return ERC20._CACHE[tag];
        } catch(e) {
            return 0;  
        }
        })();
        
    }
}



