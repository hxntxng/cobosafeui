// import abi from './abi/CoboFactory.json' with { type: "json" };
// import s32 from './utils.js';


// class BaseOwnable{
//     constructor(addr, provider) {
//         this.contract=new ethers.Contract(addr, abi, provider);
//         this.addr = addr;
//     }
//     async getName() {
//         try {
//             const contractName = await this.contract.NAME();
//             return s32(contractName);
//         }
//         catch (error) {
//             console.error("Error:", error);
//             return null;
//         }
//     }
    
//     async getAddress() {
//         const factoryAddress = this.addr;
//         return factoryAddress;
//     }

//     async getVersion() {
//         const factoryVersion = await this.contract.VERSION();
//         return factoryVersion.toHexString();
//     }

//     async getOwner() {
//         try {
//             const factoryOwner = await this.contract.owner();
//             return factoryOwner;
//         } catch (error) {
//             console.error("Error:", error);
//             throw error;
//         }
//     }

//     async getPendingOwner() {
//         try {
//             const factoryPendingOwner = await this.contract.pendingOwner();
//             return factoryPendingOwner;
//         } catch (error) {
//             console.error("Error:", error);
//             throw error;
//         }
//     }


//     async dump(full=false) {
//         try {
//             const name = await this.getName();
//             document.getElementById('factory-name').innerText = `Factory Name: ${name}`;
//         } catch (error) {
//             console.error("Error:", error);
//         }
    
//         document.getElementById('factory-address').innerText = `Factory Address: ${this.addr}`;
    
//         try {
//             const version = await this.getVersion();
//             document.getElementById('factory-version').innerText = `Factory Version: ${version}`;
//         } catch (error) {
//             console.error("Error:", error);
//         }
    
//         try {
//             const owner = await this.getOwner();
//             document.getElementById('factory-owner').innerText = `Factory Owner: ${owner}`;
//         } catch (error) {
//             console.error("Error:", error);
//         }
    
//         try {
//             const pendingOwner = await this.getPendingOwner();
//             if (pendingOwner !== "0x0000000000000000000000000000000000000000") {
//                 document.getElementById('factory-pending-owner').innerText = `Factory Pending Owner: ${pendingOwner}`;
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     }
//     }


// export default BaseOwnable;

import { ethers } from 'ethers';
import abi from './abi/CoboFactory.json';
import { s32, ETHEREUM_PROVIDER, loadContract } from './utils';


class BaseOwnable {
    contract: any;
    addr: string;

    constructor(addr: string, provider: any=ETHEREUM_PROVIDER) {
        this.contract = new ethers.Contract(addr, abi, provider);
        this.addr = addr;
    }

    async getName(): Promise<string | null> {
        try {
            const contractName = await this.contract.NAME();
            return s32(contractName);
        } catch (error) {
            console.error("Error:", error);
            return null;
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
class ERC20 {
    private static _CACHE: Record<string, string> = {};

    private contract: any;

    constructor(addr: string) {
        this.contract = loadContract("ERC20", addr);
    }

    get address(): string {
        return this.contract.address;
    }

    get symbol(): string {
        const chainId = provider.getNetwork().then(network => network.chainId); // help globalize chain selection
        const tag = `${chainId} ${this.address}`;

        // Cache to speed.
        if (!(tag in ERC20._CACHE)) {
            ERC20._CACHE[tag] = this.contract.symbol();
        }

        return ERC20._CACHE[tag];
    }
}


export default BaseOwnable;

