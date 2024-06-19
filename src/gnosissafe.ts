import { LRUCache } from 'lru-cache';
import { loadContract } from './utils';
enum Operation {
    CALL = 0,
    DELEGATE_CALL = 1
}

export class GnosisSafe {
    contract: any;
    owner: string | null;
    cache: LRUCache<string, any>;

    constructor(cobosafeAddr: string, provider: any, owner: string | null = null) {
        this.contract = loadContract("GnosisSafe", cobosafeAddr, provider);
        this.owner = owner;
        this.cache = new LRUCache({ max: 100 });

        const threshold = this.getThreshold();
        const owners = this.getOwners();

        if (owner) {
            if (threshold !== 1) {
                throw new Error(`threshold = ${threshold} > 1, not supported now`);
            }
            if (!owners.includes(owner.toLowerCase())) {
                throw new Error(`owner ${owner} not in safe owners list ${owners}`);
            }
        } else {
            if (threshold === 1) {
                this.owner = owners[0];
            }
        }
    }

    get address(): string {
        return this.contract.address;
    }

    getThreshold(): number {
        const cacheKey = 'threshold';
        if (!this.cache.has(cacheKey)) {
            this.cache.set(cacheKey, this.contract.getThreshold());
        }
        return this.cache.get(cacheKey);
    }

    getOwners(): string[] {
        const cacheKey = 'owners';
        if (!this.cache.has(cacheKey)) {
            this.cache.set(cacheKey, this.contract.getOwners());
        }
        return this.cache.get(cacheKey);
    }

    // static createSingleSignature(address: string): string {
    //     return ethers.concat([
    //         AbiCoder.defaultAbiCoder().encode(["address", "address"], [address, address]),
    //         ethers.zeroPadValue(1n, 1) // TODO convert 1n to string, supposed to be string or uint array?
    //     ]);
    // }

    // async execTransaction(
    //     to: string,
    //     data: string, // help uint8 array or string?
    //     value: number = 0,
    //     signatures: string | null = null,
    //     callType: Operation = Operation.CALL
    // ): Promise<any> {
    //     if (!signatures) {
    //         if (this.getThreshold() !== 1) {
    //             throw new Error(`Cannot exec as threshold = ${this.getThreshold()} > 1`);
    //         }
    //         signatures = GnosisSafe.createSingleSignature(this.owner!);
    //     }

    //     return await this.contract.execTransaction(
    //         to,
    //         value,
    //         data,
    //         callType,  
    //         0,
    //         0,
    //         0,
    //         ZERO_ADDRESS,
    //         ZERO_ADDRESS,
    //         signatures,
    //         { from: this.owner }
    //     );
    // }

//     async execTransactionEx(
//         to: string,
//         funcSig: string,
//         args: any[],
//         value: number = 0,
//         signatures: string | null = null,
//         callType: Operation = Operation.CALL
//     ): Promise<any> {
//         const data = abiEncodeWithSig(funcSig, args);
//         return await this.execTransaction(to, data, value, signatures, callType);
//     }

//     async execRawTx(tx: { to: string; value: number; data: string }): Promise<void> { // help is data uint8 array or string
//         const { to, value, data } = tx;
//         await this.execTransaction(to, data, value);
//     }

//     async delegateCall(to: string, funcSig: string, args: any[]): Promise<void> {
//         const data = abiEncodeWithSig(funcSig, args);
//         await this.execTransaction(to, data, 0, null, Operation.DELEGATE_CALL);
//     }

//     async enableModule(coboSafeModule: string): Promise<void> {
//         await this.execTransactionEx(this.address, "enableModule(address)", [coboSafeModule]);
//     }

//     async approveToken(token: string, to: string, amount: number | null = null): Promise<void> {
//         if (amount === null) {
//             let ethers = require('./node_modules/ethers')
//             amount = ethers.BigNumber.from(2).pow(256).sub(1).toNumber();
//         }
//         await this.execTransactionEx(token, "approve(address,uint256)", [to, amount]);
//     }

//     toString(): string {
//         return `<${this.constructor.name} ${this.address}>`;
//     }
}

