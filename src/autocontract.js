import BaseAuthorizer from "./authorizer.ts";
import BaseOwnable from "./ownable.ts";
import { registerSubclass } from "../subclasses.ts";

function convert(addr) {
    function* _sub_classes(cls) {
        for (const sub_cls of cls.__subclasses__()) {
            yield sub_cls;
            yield* _sub_classes(sub_cls);
        }
    }

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
    const typ = base_auth.type;
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

function dump(addr, full = false) {
    const obj = convert(addr);
    if (obj) {
        obj.dump(full);
    } else {
        console.log("No valid IVersion contract.");
    }
}

export default dump;