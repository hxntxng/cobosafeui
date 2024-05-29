import { BaseAuthorizer } from "./authorizer.js";
import { BaseOwnable } from "./ownable.js";
import { registerSubclass } from "./subclasses.js";

interface IVersion {
    dump(full: boolean): void;
}

function* _sub_classes(cls: any): IterableIterator<any> {
    for (const sub_cls of cls.__subclasses__()) {
        yield sub_cls;
        yield* _sub_classes(sub_cls);
    }
}

function convert(addr: string): BaseOwnable | BaseAuthorizer | null {
    const sub_cls = new Set(_sub_classes(BaseOwnable));

    const base = new BaseOwnable(addr);
    const name = base.name;

    if (name === null) {
        return null;
    }

    for (const cls of sub_cls) {
        if (cls.__name__ === name) {
            return new cls(addr);
        }
    }

    const base_auth = new BaseAuthorizer(addr);
    const typ = base_auth.getType();
    if (typ === null) {
        return base;
    }

    for (const cls of sub_cls) {
        if (cls.TYPE === typ) {
            return new cls(addr);
        }
    }

    return base_auth;
}

function dump(addr: string, full: boolean = false): void {
    const obj = convert(addr);
    if (obj) {
        obj.dump(full);
    } else {
        console.log("No valid IVersion contract.");
    }
}

export default dump;
