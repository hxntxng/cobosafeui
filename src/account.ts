import { ethers } from 'ethers';
import { BaseOwnable } from './ownable';
import { FACTORY_ADDRESS, abiEncodeWithSig, printLine } from './utils';
import { CoboFactory } from './factory';
import { GnosisSafe } from './gnosissafe';
enum Operation { // help could make utils into ts so this isn't repetitive
    CALL = 0,
    DELEGATE_CALL = 1
}

class CoboAccount extends BaseOwnable {
    delegate: string | null;
    constructor(accountAddr: string, delegate: string | null = null) {
        super(accountAddr);
        this.delegate = delegate;
    }
    async getAuthorizer() {
        return await this.contract.authorizer();
    }

    async getRoleManager() {
        return await this.contract.roleManager();
    }

    async getDelegates() {
        return await this.contract.getAllDelegates();
    }

    async getWalletAddress() {
        return await this.contract.getAccountAddress();
    }

    async addDelegate(...delegates: string[]) {
        return await this.contract.addDelegates(...delegates);
    }

    async execTransaction(
        to: string,
        data: string = '0x',
        value: number = 0,
        flag: Operation = Operation.CALL,
        useHint: boolean = true,
        extra: string = '0x',
        delegate: string | null = null
    ) {
        if (!delegate) {
            delegate = this.delegate;
        }
        if (!delegate) {
            throw new Error("Delegate not set");
        }

        let tx = [flag, to, value, data, '0x', extra];

        if (useHint) {
            const ret = await this.contract.execTransaction.call(tx, { from: delegate });
            tx[4] = ret[2]; // CallData.hint = TransactionResult.hint
        }
        return await this.contract.execTransaction(tx, { from: delegate });
    }

    async execTransactionEx(
        to: string,
        funcSig: string,
        args: any[],
        value: number = 0,
        flag: Operation = Operation.CALL,
        useHint: boolean = true,
        extra: string = '0x',
        delegate: string | null = null
    ) {
        const data = abiEncodeWithSig(funcSig, args);
        return await this.execTransaction(to, data, value, flag, useHint, extra, delegate);
    }

    async execRawTx(
        tx: { to: string, value: number, data: string },
        flag: Operation = Operation.CALL,
        useHint: boolean = true,
        extra: string = '0x',
        delegate: string | null = null
    ) {
        const { to, value, data } = tx;
        return await this.execTransaction(to, data, value, flag, useHint, extra, delegate);
    }

    toString() {
        return `<${this.constructor.name} ${this.contract.address}>`;
    }

    async dump(full: boolean = false) {
        await super.dump(full);
        
        const authorizerElement = document.getElementById('authorizer');
        if (authorizerElement) {
            authorizerElement.innerHTML = `Authorizer: ${await this.getAuthorizer()}`;
        }

        const roleManagerElement = document.getElementById('role-manager');
        if (roleManagerElement) {
            roleManagerElement.innerHTML = `Role manager: ${await this.getRoleManager()}`;
        }

        const delegatesElement = document.getElementById('delegates');
        if (delegatesElement) {
            delegatesElement.innerHTML = `Delegates: ${(await this.getDelegates()).join(',')}`;
        }

        if (full) {
            printLine();
            const dumpModule = await import('./autocontract.js');
            await dumpModule.dump(await this.getRoleManager(), full);
            printLine();
            await dumpModule.dump(await this.getAuthorizer(), full);
        }
    }
}


export class CoboSafeAccount extends CoboAccount {
    safeOwner: string | null;

    constructor(accountAddr: string, delegate: string | null = null, safeOwner: string | null = null) {
        super(accountAddr, delegate);
        this.safeOwner = safeOwner;
    }

    async getSafe() {
        return new GnosisSafe(await this.getOwner(), this.safeOwner);
    }

    async enable() {
        const safe = await this.getSafe();
        await safe.enableModule(this.contract.address);
    }


    // TODO
    // static async create(safeAddress: string, factoryAddress: string = FACTORY_ADDRESS) {
    //     const factory = new CoboFactory(factoryAddress);
    //     const account = await factory.create(CoboSafeAccount);
    //     await account.initialize(safeAddress);
    //     return account;
    // }
}

export class CoboSmartAccount extends CoboAccount {
    constructor(accountAddr: string, delegate: string | null = null) {
        super(accountAddr, delegate);
    }
    // TODO
    // static async create(ownerAddress: string, factoryAddress: string = FACTORY_ADDRESS) {
    //     const factory = new CoboFactory(factoryAddress);
    //     const account = await factory.create(CoboSmartAccount);
    //     await account.initialize(ownerAddress);
    //     await account.contract.addDelegate(ownerAddress);
    //     return account;
    // }
}
