import { ethers } from "ethers";

export const FACTORY_ADDRESS: string = "0xC0B00000e19D71fA50a9BB1fcaC2eC92fac9549C";
export const ETHEREUM_PROVIDER: ethers.JsonRpcProvider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");
export const ETH_ADDRESS: string = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const ZERO_ADDRESS: string = "0x0000000000000000000000000000000000000000";
const ABI_DIR = '../abi'; // Adjust the ABI_DIR path as needed

export function s32(data: string): string {
    const decoder = new TextDecoder('utf-8');
    const sliced = data.slice(2);
    const arr = new Uint8Array(sliced.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const decoded = decoder.decode(arr);
    return decoded;
}
export async function loadAbi(name: string): Promise<any> {
    const filePath = `${ABI_DIR}/${name}.json`;
    
    const response = await fetch(filePath);
    
    if (!response.ok) {
        throw new Error(`${filePath} does not exist`);
    }
    
    return response.json();
}

export async function loadContract(name: string, address: string, abi: any = null, sender: ethers.Signer | null = null): Promise<ethers.Contract> {
    if (abi === null) {
        abi = await loadAbi(name); // Assuming loadAbi is defined elsewhere
    }
    if (!Array.isArray(abi)) {
        throw new Error(`Invalid ABI ${abi}`);
    }
    // TODO
    // if (sender === null) {
    //     sender = (ethers.getDefaultProvider()).getSigner(); // Fallback to default signer
    // }

    return new ethers.Contract(address, abi, sender);
}

export function abiEncodeWithSig(funcSignature: string, args: any[] = []): string {
    const abi = new ethers.AbiCoder();
    const selector = ethers.id(funcSignature).slice(0, 10);
    const argSig = funcSignature.slice(funcSignature.indexOf("("));

    const encoded = selector + abi.encode([argSig], args).substring(2);
    return encoded;
}

export function printLine(): void {
    const dashElement = document.createElement('div');
    dashElement.innerHTML = "-".repeat(40);
    document.body.appendChild(dashElement);
}
