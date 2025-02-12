"use client"

import React from 'react'
import { PluralitySocialConnect } from '@plurality-network/smart-profile-wallet'
import { AllAccountsDataType, ConnectedAccountDataType, SignMessageDataType, VerifySignedMessageDataType } from '@plurality-network/smart-profile-wallet'
const Home = () => {
    // const [publicInput, setPublicInput] = useState("")
    const options = { clientId: '', theme: 'light' };

    const getAllAccountsData = async () => {
        const response = (await PluralitySocialConnect.getAllAccounts()) as AllAccountsDataType;
        if (response) {
            const allAccounts = response.data;
            alert(`All Accounts: ${allAccounts[0]}`)
            return allAccounts[0]?.address;
        }
    }

    const getConnectedAccountData = async () => {
        const response = (await PluralitySocialConnect.getConnectedAccount()) as ConnectedAccountDataType;
        if (response) {
            const connectedAccount = response.data;
            alert(`Connected Account: ${connectedAccount}`)
            return connectedAccount?.address;
        }
    }

    const getMessageSignatureData = async (message: string) => {
        const response = (await PluralitySocialConnect.getMessageSignature(message)) as SignMessageDataType;
        if (response) {
            const signMessage = response.data;
            alert(`Sign Message Data: ${signMessage}`)
            return signMessage;
        }
    }

    const getVerifyMessageData = async (message: string, key: string) => {
        const response = (await PluralitySocialConnect.verifyMessageSignature(message, key)) as VerifySignedMessageDataType;
        if (response) {
            const verifyMessage = response.data;
            alert(`Verification Signature Data: ${verifyMessage}`)
            return verifyMessage;
        }
    }

    const loadPublicData = async () => {
        const response = (await PluralitySocialConnect.getPublicData("name")) as ConnectedAccountDataType;
        if (response) {
            // const connectedAccount = response.data;
            console.log("Load Public Data  (Inisde dApp):", response.data)
            // alert(`Connected Account: ${response.data}`)
            // return connectedAccount?.address;
        }
    }

    const storePublicData = async () => {
        const response = (await PluralitySocialConnect.setPublicData("name", "plural-abc")) as ConnectedAccountDataType;
        if (response) {
            // const connectedAccount = response.data;
            console.log("response", response.data)
            // alert(`Connected Account: ${response.data}`)
            // return connectedAccount?.address;
        }
    }

    const loadPrivateData = async () => {
        const response = (await PluralitySocialConnect.getPrivateData("work")) as ConnectedAccountDataType;
        if (response) {
            // const connectedAccount = response.data;
            console.log("response", response.data)
            // alert(`Connected Account: ${response.data}`)
            // return connectedAccount?.address;
        }
    }

    const storePrivateData = async () => {
        const response = (await PluralitySocialConnect.setPrivateData("work", "Plurality")) as ConnectedAccountDataType;
        if (response) {
            // const connectedAccount = response.data;
            console.log("response", response.data)
            // alert(`Connected Account: ${response.data}`)
            // return connectedAccount?.address;
        }
    }

    const updateConsent = async () => {
        const response = (await PluralitySocialConnect.updateConsentOption()) as ConnectedAccountDataType;
        if (response) {
            const smartProfileData = response.data;
            alert(`Connected Account: ${JSON.stringify(response.data)}`)
            return smartProfileData;
        }
    }

    const fetchSmartProfileData = async () => {
        const response = (await PluralitySocialConnect.getSmartProfileData()) as ConnectedAccountDataType;
        if (response) {
            const smartProfileData = response.data;
            alert(`Connected Account: ${JSON.stringify(response.data)}`)
            return smartProfileData;
        }
    }

    const fetchLoginInfo = async () => {
        const response = (await PluralitySocialConnect.getLoginInfo()) as ConnectedAccountDataType;
        if (response) {
            const loginInfoData = response.data;
            console.log("Connected Account Info (Inisde dApp)::", loginInfoData);
            alert(`Connected Account: ${JSON.stringify(loginInfoData)}`)
            return loginInfoData;
        }
    }

    const handleDataReturned = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Login info callback data (Inisde dApp)::", receivedData);
    };

    // 2nd Page

    const abi = '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
    const rawTx = JSON.stringify({
        to: "0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2",
        value: "10000000000000000", //ethers.parseEther("0.01") but keep in string
        gasLimit: "21000", // we need bigInt, so keep it in string
        gasPrice: "50000000000", //ethers.parseUnits("50", "gwei") but keep in string
    })
    const txParams = JSON.stringify([8])
    const txOptions = JSON.stringify({ gasLimit: 2000000 })

    const getBalanceData = async (rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.getBalance(rpc, chainId)) as GetBalanceDataType;
        if (response) {
            const getBalance = response.data;
            alert(`Balance: ${getBalance}`)
            return getBalance;
        }
    }
    const sendTransactionData = async (rawTx: string, rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.sendTransaction(rawTx, rpc, chainId)) as SendTransactionDataType;
        if (response) {
            console.log("Send Transaction Response (Inisde dApp): ", response.data)
            const sendTransactionData = response.data;
            return sendTransactionData;
        }
    }

    const fetchBlockNumber = async (rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.getBlockNumber(rpc, chainId)) as GetBlockNumberDataType;
        if (response) {
            const blockNumber = response.data;
            alert(`Block Number: ${blockNumber}`)
            return blockNumber;
        }
    }

    const fetchTransactionCount = async (address: string, rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.getTransactionCount(address, rpc, chainId)) as GetTransactionCountDataType;
        if (response) {
            const transactionCount = response.data;
            alert(`Transaction Count: ${transactionCount}`)
            return transactionCount;
        }
    }


    const readFromContractData = async (address: string, abiVal: string, action: string, params: any, rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.readFromContract(address, abiVal, action, params, rpc, chainId)) as ReadFromContractDataType;
        if (response) {
            const readContract = response.data;
            alert(`Read From Contract Data: ${readContract}`)
            return readContract;
        }
    }

    const writeToContractData = async (address: string, abiVal: string, action: string, params: any, rpc: string, chainId: string, options: string) => {
        const response = (await PluralitySocialConnect.writeToContract(address, abiVal, action, params, rpc, chainId, options)) as WriteToContractDataType;
        console.log("res", response)
        if (response) {
            const writeContract = response.data;
            alert(`Write To a Contract: ${writeContract}`)
            return writeContract;
        }
    }


    return (

        <div style={{
            padding: "10px"
        }}>
            <PluralitySocialConnect
                options={options}
                onDataReturned={handleDataReturned}
            />
            <div style={{
                width: '180px',
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "30px"
            }}>
                <button onClick={() => getAllAccountsData()}>Get All Accounts</button>
                <button onClick={() => getConnectedAccountData()}>Get Connected Account</button>
                <button onClick={() => getMessageSignatureData("Example `personal_sign` message.")}>Sign Message</button>
                <button onClick={() => getVerifyMessageData("Example `personal_sign` message.", "0x4b0a58d64ef2a4a5b6f60cf0b5f7decfec842e1bca35fba261660770d997297a66dad78ba2b2bd273f7de8130178bc93ddd44be3bafe1a94a8fd81a16a89cb0e1c")}>Verify Message</button>
                <button onClick={() => loadPublicData()}>Get Public Data</button>
                <button onClick={() => storePublicData()}>Set Public Data</button>
                <button onClick={() => loadPrivateData()}>Get Private Data</button>
                <button onClick={() => storePrivateData()}>Set Private Data</button>
                <button onClick={() => fetchLoginInfo()}>Get Login Info</button>
                <button onClick={() => updateConsent()}>Update Consent</button>
                <button onClick={() => fetchSmartProfileData()}>Get Smart Profile Data</button>
                <button onClick={() => getBalanceData("https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Get Balance</button>
                {/* <button onClick={() => fetchBlockNumber("https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Get Block Number</button> */}
                <button onClick={() => sendTransactionData(rawTx, "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Send Transaction</button>
                <button onClick={() => fetchTransactionCount("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2", "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Get Transaction count</button>
                <button onClick={() => readFromContractData("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "retrieve", "", "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Read Contract</button>
                <button onClick={() => writeToContractData("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "store", txParams, "https://ethereum-sepolia.rpc.subquery.network/public", "11155111", txOptions)}>Write Contract</button>
                {/* <button onClick={() => switchNetwork( "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Switch to Sepolia</button>
                <button onClick={() => fetchNetwork()}>Fetch the current network</button> */}
            </div>
            {/* <input onChange={(e)=>{}}/> */}
        </div>
    )
}

export default Home