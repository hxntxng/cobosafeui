import { BaseOwnable } from "./ownable";
import { Contract } from 'ethers';
import { s32 } from './utils';

export class FlatRoleManager extends BaseOwnable {

    constructor(contract: any) {
        super(contract);
    }

    async getRoles(delegate: string): Promise<string[]> {
        return await this.contract.getRoles(delegate);
    }

    async getAllRoles(): Promise<string[]> {
        const roles: string[] = await this.contract.getAllRoles();
        return roles.map(s32);
    }

    async getAllDelegates(): Promise<string[]> {
        return await this.contract.getDelegates();
    }

    async dump(full: boolean = false): Promise<void> {
        super.dump(full);
        console.log("Delegate", " ".repeat(3), "Roles");
        const delegates = await this.getAllDelegates();
        for (const delegate of delegates) {
            const roles = await this.getRoles(delegate);
            const rolesStr = roles.map(s32).join(",");
            console.log(delegate, rolesStr);
        }
    }
}
