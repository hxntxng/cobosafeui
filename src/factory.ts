import { FACTORY_ADDRESS, ETHEREUM_PROVIDER, s32 } from './utils.js';
import { BaseOwnable } from './ownable.js';

export class CoboFactory extends BaseOwnable {
    constructor(address: string = FACTORY_ADDRESS, provider: any = ETHEREUM_PROVIDER) {
        super(address, provider);
    }

    async getAllNames(): Promise<string[]> {
        const contractNames = await this.contract.getAllNames();
        return contractNames;
    }

    async getAddr(name: string): Promise<string[]> {
        const contractAddress = await this.contract.getLatestImplementation(name);
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
        // }
        // this.getAllNames().then((value) => {
        //     const contractNames = value;
        //     document.getElementById('implementation').innerHTML =  `<h3>Latest implementations (Total ${contractNames.length}):<h3>`;
        //     const contractsList = document.getElementById('contracts-list');
        //     contractsList.innerHTML = '';
        //     const promises = contractNames.map(async (name) => {
        //         const contractAddress = await this.getAddr(name);
        //         return { name, address: contractAddress };
        //     });
    
        //     Promise.all(promises)
        //         .then((results) => {
        //             results.forEach(({ name, address }) => {
        //                 const contractDiv = document.createElement('div');
        //                 // console.log(s32(name));
        //                 // console.log(address);
        //                 contractDiv.innerText = `${s32(name)}: ${address}`;
                        
        //                 contractsList.appendChild(contractDiv);
        //             });
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        // }).catch((error) => {
        //     console.error("Error:", error);
        // });

    // }
// }

// export default CoboFactory;