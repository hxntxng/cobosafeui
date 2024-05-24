export const FACTORY_ADDRESS: string;
export const ETHEREUM_PROVIDER: ethers.providers.JsonRpcProvider;
export const ETH_ADDRESS: string;
export const ZERO_ADDRESS: string;

export function s32(data: string): string;
export function loadContract(name: string, address: string, abi?: any[], sender?: any): Promise<any>;

export declare function abiEncodeWithSig(func_signature: string, args?: any[]): string;
export function printLine(): void;