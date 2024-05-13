import { s32, ETH_ADDRESS} from "./utils.ts";
import BaseOwnable from "./ownable.ts";
import { registerSubclass } from "./subclasses.ts";


function getSymbol(addr: string): string {
    if (addr.toLowerCase() === ETH_ADDRESS.toLowerCase()) {
        return `ETH(${addr})`;
    }
    try {
        // Assuming ERC20 class and its symbol property are defined elsewhere
        return `${ERC20(addr).symbol}(${addr})`;
    } catch (error) {
        return addr;
    }
}

export class BaseAuthorizer extends BaseOwnable {
    // Flags
    static HAS_PRE_CHECK_MASK = 0x1;
    static HAS_POST_CHECK_MASK = 0x2;
    static HAS_PRE_PROC_MASK = 0x4;
    static HAS_POST_PROC_MASK = 0x8;
    static SUPPORT_HINT_MASK = 0x40;

    async getCaller(): Promise<string | null> {
        return await this.contract.caller();
    }

    async getTag(): Promise<string | null> {
        try {
            return s32(await this.contract.tag());
        } catch (error) {
            return null;
        }
    }

    async getFlag(): Promise<number> {
        return await this.contract.flag();
    }

    async getFlagStr(): Promise<string> {
        const flag = await this.getFlag();
        const flags: string[] = [];
        if ((flag & BaseAuthorizer.HAS_PRE_CHECK_MASK) > 0) {
            flags.push("PreCheck");
        }
        if ((flag & BaseAuthorizer.HAS_POST_CHECK_MASK) > 0) {
            flags.push("PostCheck");
        }
        if ((flag & BaseAuthorizer.HAS_PRE_PROC_MASK) > 0) {
            flags.push("PreProcess");
        }
        if ((flag & BaseAuthorizer.HAS_POST_PROC_MASK) > 0) {
            flags.push("PostProcess");
        }
        if ((flag & BaseAuthorizer.SUPPORT_HINT_MASK) > 0) {
            flags.push("SupportHint");
        }
        return flags.join(",");
    }

    async getType(): Promise<string | null> {
        try {
            return s32(await this.contract.TYPE());
        } catch (error) {
            return null;
        }
    }

    async dump(full: boolean = false): Promise<void> {
        await super.dump(full);
        const callerElement = document.getElementById('caller');
        if (callerElement) {
            try {
                const caller = await this.getCaller();
                callerElement.innerText = `Caller: ${caller}`;
            } catch (error) {
                console.error("Error:", error);
            }
        }

        const flagsElement = document.getElementById('flags');
        if (flagsElement) {
            try {
                const flags = await this.getFlagStr();
                flagsElement.innerText = `Flags: ${flags}`;
            } catch (error) {
                console.error("Error:", error);
            }
        }

        const typeElement = document.getElementById('type');
        if (typeElement) {
            try {
                const type = await this.getType();
                typeElement.innerText = `Type: ${type}`;
            } catch (error) {
                console.error("Error:", error);
            }
        }

        const tagElement = document.getElementById('tag');
        if (tagElement) {
            try {
                const tag = await this.getTag();
                tagElement.innerText = `Tag: ${tag}`;
            } catch (error) {
                console.error("Error:", error);
            }
        }

    }
}

registerSubclass('BaseAuthorizer', BaseAuthorizer);

export class ArgusRootAuthorizer extends BaseAuthorizer {
    public async getRoles(): Promise<Set<string>> {
        const roleList: string[] = [];
        try {
            const roles = await this.contract.getAllRoles();
            roleList.push(...roles.map((role: any) => s32(role)));
        } catch (error) {
            console.error("Error:", error);
        }

        try {
            const caller = await this.getCaller();
            if (CoboSafeAccount.match(caller) || CoboSmartAccount.match(caller)) {
                const roleManager = new FlatRoleManager(new CoboSafeAccount(caller).role_manager);
                roleList.push(...roleManager.get_all_roles());
            }
        } catch (error) {
            console.error("Error:", error);
        }

        return new Set(roleList);
    }

    public async getDelegates(): Promise<{ [key: string]: string }> {
        const delegateToRole: { [key: string]: string } = {};
        try {
            const caller = await this.getCaller();
            if (CoboSafeAccount.match(caller) || CoboSmartAccount.match(caller)) {
                const roleManager = new FlatRoleManager(new CoboSafeAccount(caller).role_manager);
                const delegateList = roleManager.get_all_delegates();
                for (const delegate of delegateList) {
                    const roles = roleManager.get_roles(delegate);
                    delegateToRole[delegate] = roles.map((role: any) => s32(role)).join(",");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
        return delegateToRole;
    }

    public async getAuthorizers(role: string, delegatecall: boolean = false): Promise<string[]> {
        try {
            return await this.contract.getAllAuthorizers(delegatecall, role); // make sure role is encoded
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    }

    public async dump(full: boolean = false): Promise<void> {
        await super.dump(full);

        const authorizersElement = document.getElementById('authorizers');
        const delegatesElement = document.getElementById('delegates');

        if (authorizersElement && delegatesElement) {
            try {
                const addr = this.contract.address;
                authorizersElement.innerHTML = "Authorizers:<br>";
                delegatesElement.innerHTML = "Delegates:<br>";

                const addrs: string[] = [];
                const roles = await this.getRoles();
                for (const role of roles) {
                    const auths = await this.getAuthorizers(role);
                    addrs.push(...auths);
                    const authStrings = await Promise.all(auths.map(async (auth: string) => {
                        const name = (await new BaseOwnable(auth).getName()) || "";
                        return `${name}(${auth})`;
                    }));
                    authorizersElement.innerHTML += `&nbsp;&nbsp;${role}: ${authStrings.join(", ")}<br>`;
                }

                const delegates = await this.getDelegates();
                for (const delegate in delegates) {
                    delegatesElement.innerHTML += `&nbsp;&nbsp;${delegate}: ${delegates[delegate]}<br>`;
                }

                if (full) {
                    for (const addr of addrs) {
                        // await console.logline();
                        // Assuming the "dump" function is async
                        // await dump(addr, full);
                    }
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
}

registerSubclass('ArgusRootAuthorizer', ArgusRootAuthorizer);

class TransferAuthorizer extends BaseAuthorizer {
    static TYPE = "TransferType";

    async getTokens() {
        return await this.contract.getAllToken();
    }

    async getReceivers(token: any) {
        return await this.contract.getTokenReceivers(token);
    }

    async dump(full: boolean = false) {
        await super.dump(full);
        const tokenReceiversElement = document.getElementById('token-receivers');
        if (tokenReceiversElement) {
            tokenReceiversElement.innerHTML = "Token -> Receivers:<br>";
            for (const token of await this.getTokens()) {
                const receivers = await this.getReceivers(token);
                const tokenSymbol = getSymbol(token);
                tokenReceiversElement.innerHTML += `${tokenSymbol}: ${receivers.join(",")}<br>`;
            }
        }
    }
}
registerSubclass('TransferAuthorizer', TransferAuthorizer);
class FuncAuthorizer extends BaseAuthorizer {
    static TYPE = "FunctionType";

    async getContracts() {
        return await this.contract.getAllContracts();
    }

    async getFuncs(contract: any) {
        const funcs = await this.contract.getFuncsByContract(contract);
        return funcs.map((f: any) => "0x" + f.hex().slice(0, 8));
    }

    async dump(full: boolean = false) {
        await super.dump(full);
        const contractFunctionsElement = document.getElementById('contract-functions');
        if (contractFunctionsElement) {
            contractFunctionsElement.innerHTML = "Contract -> Functions:<br>";
            for (const contract of await this.getContracts()) {
                const funcs = await this.getFuncs(contract);
                contractFunctionsElement.innerHTML += `${contract}: ${funcs.join(",")}<br>`;
            }
        }
    }
}
registerSubclass('FuncAuthorizer', FuncAuthorizer);
class BaseACL extends BaseAuthorizer {
    static TYPE = "CommonType";

    async getContracts() {
        return await this.contract.contracts();
    }

    async dump(full: boolean = false) {
        await super.dump(full);
        const contractsElement = document.getElementById('contracts');
        if (contractsElement) {
            contractsElement.innerHTML = "Contracts:<br>";
            contractsElement.innerHTML += (await this.getContracts()).join(",") + "<br>";
        }
    }
}
registerSubclass('BaseACL', BaseACL);
class DEXBaseACL extends BaseACL {
    static TYPE = "DexType";

    async getInTokens() {
        return await this.contract.getSwapInTokens();
    }

    async getOutTokens() {
        return await this.contract.getSwapOutTokens();
    }

    async getInTokenSymbols() {
        return (await this.getInTokens()).map(getSymbol);
    }

    async getOutTokenSymbols() {
        return (await this.getOutTokens()).map(getSymbol);
    }

    async dump(full: boolean = false) {
        await super.dump(full);
        const inTokensElement = document.getElementById('in-tokens');
        const outTokensElement = document.getElementById('out-tokens');
        if (inTokensElement && outTokensElement) {
            inTokensElement.innerHTML = "In tokens:<br>";
            outTokensElement.innerHTML = "Out tokens:<br>";
            inTokensElement.innerHTML += (await this.getInTokenSymbols()).join(",") + "<br>";
            outTokensElement.innerHTML += (await this.getOutTokenSymbols()).join(",") + "<br>";
        }
    }
}
registerSubclass('DEXBaseACL', DEXBaseACL);
class FarmingBaseACL extends BaseACL {
    static TYPE = "CommonType";

    async getWhitelistIds() {
        return (await this.contract.getPoolIdWhiteList()).map(String);
    }

    async getWhitelistAddresses() {
        return (await this.contract.getPoolAddressWhiteList()).map(String);
    }

    async dump(full: boolean = false) {
        await super.dump(full);
        const whitelistIdsElement = document.getElementById('whitelist-ids');
        const whitelistAddressesElement = document.getElementById('whitelist-addresses');
        if (whitelistIdsElement && whitelistAddressesElement) {
            whitelistIdsElement.innerHTML = "Whitelist IDs:<br>";
            whitelistAddressesElement.innerHTML = "Whitelist addresses:<br>";
            whitelistIdsElement.innerHTML += (await this.getWhitelistIds()).join(", ") + "<br>";
            whitelistAddressesElement.innerHTML += (await this.getWhitelistAddresses()).join(", ") + "<br>";
        }
    }
}
registerSubclass('FarmingBaseACL', FarmingBaseACL);