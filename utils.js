export const FACTORY_ADDRESS = "0xC0B00000e19D71fA50a9BB1fcaC2eC92fac9549C";
export const ETHEREUM_PROVIDER = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth");
export const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";


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

    return Contract.fromABI(name, address, abi, sender); // help how does it transfer from brownie to ethers
}


export default s32