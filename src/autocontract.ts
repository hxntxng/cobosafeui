import { BaseAuthorizer } from "./authorizer.js";
import { BaseOwnable } from "./ownable.js";
import "./authorizer.js";


interface IVersion {
    dump(full: boolean): void;
}


async function convert(addr: string, provider: any): Promise<BaseOwnable | BaseAuthorizer | null> {
    const sub_cls = BaseOwnable.getSubclasses();
    
    const base = new BaseOwnable(addr, provider);
    const name = (await base.getName()).replace(/\0/g, '').trim();
    if (name == null) {
        return null;
    }

    for (const cls of sub_cls) {
        if (cls.name == name) {
            const constructableClass = cls as new (addr: string, provider: any) => any; 
            return new constructableClass(addr, provider);
        }
    }

    const base_auth = new BaseAuthorizer(addr, provider);
    const typ = await base_auth.getType();
    if (typ == null) {
        return base;
    }

    for (const cls of sub_cls) {
        if ('TYPE' in cls) {
            if (cls.TYPE == typ) {
                return cls(addr, provider);
        }
        }
    }
    return base_auth;
}

export async function dump(addr: string, provider: any, full: boolean = false): Promise<void> {
    const obj = await convert(addr, provider);
    if (obj) {
        obj.dump(full);
    } else {
        console.log("No valid IVersion contract.");
    }
}

