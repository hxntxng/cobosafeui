import { FACTORY_ADDRESS, s32, loadContract } from './utils.js';
import { BaseOwnable, RegisterSubclass } from './ownable.js';

@RegisterSubclass(BaseOwnable)
export class CoboFactory extends BaseOwnable {
    addr: string;
    contract: any;
    constructor(addr: string = FACTORY_ADDRESS, provider: any) {
        super(addr, provider);
        this.addr = addr;

    }



    async getAllNames(): Promise<string[]> {
        const contractNames = await (await this.getContract()).getAllNames();
        return contractNames;
    }

    async getAddr(name: string): Promise<string[]> {
        const contractAddress = await (await this.getContract()).getLatestImplementation(name);
        return contractAddress;
    }
    // // TODO
    // async create()

    // async create2()

    async dump(full: boolean=false):Promise <void> {
        super.dump(full);
        try {
            const contractNames = await this.getAllNames();
            document.getElementById('implementation')!.innerHTML = `<h3>Latest implementations (Total ${contractNames.length}):<h3>`;
            const contractsList = document.getElementById('contracts-list')!;
            contractsList.innerHTML = '';

            const promises = contractNames.map(async (name: string) => {
                const contractAddress = await this.getAddr(name);
                return { name, address: contractAddress };
            });

            Promise.all(promises)
                .then((results) => {
                    results.forEach(({ name, address }) => {
                        const contractDiv = document.createElement('div');
                        contractDiv.innerText = `${s32(name)}: ${address}`;
                        contractsList.appendChild(contractDiv);
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error("Error:", error);
        }
    }
}