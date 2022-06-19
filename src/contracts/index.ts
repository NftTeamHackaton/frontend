// abis
import nftContractAbi from '../abis/ERC721.json';
import bridgeContractAbi from '../abis/BRIDGE.json';

const Provider = process.env.REACT_APP_PROVIDER;

const ethers = require('ethers');

const Web3 = require("web3");
const web3 = new Web3(Provider);

const Contract = require("web3-eth-contract");
Contract.setProvider(Provider);

const ethereum = (window as any).ethereum;

export const setApprovalForAll = async (
	senderAddress: string,
	contractAddress: string,
	nftAddress: string,
): Promise<string> => {
	const contract = new Contract(nftContractAbi);
	const approveAllData = await contract.methods.setApprovalForAll(contractAddress, true).encodeABI();

	console.log('senderAddress: ', senderAddress);
	console.log('contractAddress: ', contractAddress);
	console.log('nftAddress: ', nftAddress);

	const approveAllTxOptions = {
		from: senderAddress,
		to: nftAddress,
		gas: web3.utils.toHex("400000"),
		gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
		data: approveAllData,
	}

	const approveAllTxHash = await ethereum.request({
		method: "eth_sendTransaction",
		params: [approveAllTxOptions],
	})

	return approveAllTxHash;
}

export const approveNft = async (
	nftId: number,
	fromChainId: number,
	senderAddress: string,
): Promise<string> => {
	const contract = new Contract(nftContractAbi);
	let tokenAddress = '';
	let contractAddress = '';

	if (fromChainId === 4) {
		tokenAddress = process.env.REACT_APP_ERC721_CONTRACT_ADDRESS_RINKEBY || '';
		contractAddress = process.env.REACT_APP_ERC721_HANDLER_CONTRACT_ADDRESS_RINKEBY || '';
	} else if (fromChainId === 42) {
		tokenAddress = process.env.REACT_APP_ERC721_CONTRACT_ADDRESS_KOVAN || '';
		contractAddress = process.env.REACT_APP_ERC721_HANDLER_CONTRACT_ADDRESS_KOVAN || '';
	}

	const approveNftData = await contract.methods.approve(contractAddress, nftId).encodeABI();

	console.log('senderAddress: ', senderAddress);
	console.log('contractAddress: ', contractAddress);

	const approveNftTxOptions = {
		from: senderAddress,
		to: tokenAddress,
		gas: web3.utils.toHex("400000"),
		gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
		data: approveNftData,
	}

	const approveNftTxHash = await ethereum.request({
		method: "eth_sendTransaction",
		params: [approveNftTxOptions],
	})

	return approveNftTxHash;
}

export const transferNFTfromRinkebyToKovan = async (
	senderAddress: string,
	recipientAddress: string,
	nftId: number,
	nftAddress: string,
	fromChainId: number,
	toChainId: number,
): Promise<string> => {
	let bridgeContractAddress = '';
	let nftContractAddress = '';

	if (fromChainId === 4) {
		bridgeContractAddress = process.env.REACT_APP_BRIDGE_CONTRACT_ADDRESS_RINKEBY || '';
		// nftContractAddress = process.env.
	} else if (fromChainId === 42) {
		bridgeContractAddress = process.env.REACT_APP_BRIDGE_CONTRACT_ADDRESS_KOVAN || '';
		// nftContractAddress = 
	}

	const bridgeContract = new Contract(bridgeContractAbi, bridgeContractAddress);

	console.log('senderAddress: ', senderAddress);
	console.log('recipientAddress: ', recipientAddress);
	console.log('nftId: ', nftId);
	console.log('nftAddress: ', nftAddress);
	console.log('fromChainId: ', fromChainId);
	console.log('toChainId: ', toChainId);

	const fromChainIdCustom = fromChainId === 4 ? 2 : fromChainId === 42 ? 1 : null;
	const resourceID = '0x00000000000000000000004a7Ee6159f78a59c19311ddf0AFc25c277e5A43302';

	console.log('bridgeContractAddress:', bridgeContractAddress);
	console.log('fromChainIdCustom:', fromChainIdCustom);

	const data = '0x' +
		ethers.utils.hexZeroPad(ethers.utils.hexlify(nftId), 32).substr(2) +
		ethers.utils.hexZeroPad(ethers.utils.hexlify((recipientAddress.length - 2) / 2), 32).substr(2) +
		ethers.utils.hexlify(recipientAddress).substr(2);

	console.log('resourceID: ', resourceID);
	console.log('data: ', data);

	const toChainIdCustom = toChainId === 4 ? 2 : toChainId === 42 ? 1 : null;
	const transferNFTData = await bridgeContract.methods.deposit(toChainIdCustom, resourceID, data);

	console.log('transferNFTData: ', transferNFTData);

	const transferNFTTxOptions = {
		from: senderAddress,
		to: bridgeContractAddress,
		gas: web3.utils.toHex("500000"),
		gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
		data: transferNFTData.encodeABI(),
	}

	const transferNFTTxHash = await ethereum.request({
		method: "eth_sendTransaction",
		params: [transferNFTTxOptions],
	})

	console.log('transferNFTTxHash: ', transferNFTTxHash);

	return transferNFTTxHash;
}

// utils
export const checksumAddress = (address: string): string => {
	if (!address.length) {
		return '';
	}

	return web3.utils.toChecksumAddress(address);
}

export const transactionStatusHandler = async (txHash: string): Promise<any> => {
	let res = null;

	while (res === null) {
		res = await web3.eth.getTransactionReceipt(txHash);
	}

	return res;
}
