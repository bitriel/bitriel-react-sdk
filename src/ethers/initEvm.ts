import { ethers, Wallet } from "ethers";
import { NetworkItem } from "../types";

export async function initEvm({
	mnemonic,
	dataNetwork,
}: {
	mnemonic: string;
	dataNetwork: NetworkItem;
}) {
	try {
		const provider = new ethers.JsonRpcProvider(
			dataNetwork.networkUrl,
			dataNetwork.chainId
		);
		const wallet = Wallet.fromPhrase(mnemonic).connect(provider);

		const [address, balance] = await Promise.all([
			wallet.getAddress(),
			provider.getBalance(wallet.address),
		]);

		return {
			address,
			balance: ethers.formatEther(balance),
			privateKey: wallet.privateKey,
		};
	} catch (error) {
		throw error;
	}
}
