export const FACTORY_ADDRESS = "0xC0B00000e19D71fA50a9BB1fcaC2eC92fac9549C";
export const ETHEREUM_PROVIDER = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth");
export const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";



export function s32(data) {
    const decoder = new TextDecoder('utf-8');
    const sliced = data.slice(2);
    const arr = new Uint8Array(sliced.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const decoded = decoder.decode(arr);
    return decoded
}   

export async function loadContract(name, address, abi = null, sender = null) {
    if (abi === null) {
        abi = await load_abi(name);
    }
    if (!Array.isArray(abi)) {
        throw new Error(`Invalid ABI ${abi}`);
    }

    if (sender === null) {
        sender = accounts.default; // help may not actually exist
    }

    return new ethers.Contract(address, abi, sender);
}

// export const Operation = {
//     CALL: 0,
//     DELEGATE_CALL: 1
// };

import { ethers } from "ethers";

export function abiEncodeWithSig(func_signature, args = []) {
    const abi = new ethers.utils.AbiCoder();
    const selector = ethers.utils.id(func_signature).slice(0, 10);
    const arg_sig = func_signature.slice(func_signature.indexOf("("));

    const encoded = selector + abi.encode([arg_sig], args).substr(2);
    return encoded;
}

export function printLine() {
    const dashElement = document.createElement('div');
    dashElement.innerHTML = "-".repeat(40);
    document.body.appendChild(dashElement);
}
