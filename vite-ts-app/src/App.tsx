import { PluralitySocialConnect } from '@plurality-network/smart-profile-wallet'
import { 
            AllAccountsDataType, 
            ConnectedAccountDataType, 
            SignMessageDataType, 
            VerifySignedMessageDataType,
            GetBalanceDataType, 
            GetBlockNumberDataType, 
            GetTransactionCountDataType, 
            ReadFromContractDataType, 
            SendTransactionDataType, 
            WriteToContractDataType 
        } from '@plurality-network/smart-profile-wallet';

const App = () => {

    // options for the embedded profiles wallet
    const options = { clientId: '', theme: 'light', text: 'Login' };
    
    const abi = '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
    const rawTx = JSON.stringify({
        to: "0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2",
        value: "10000000000000000", //ethers.parseEther("0.01") but keep in string
        gasLimit: "21000", // we need bigInt, so keep it in string
        gasPrice: "50000000000", //ethers.parseUnits("50", "gwei") but keep in string
    })
    const txParams = JSON.stringify([8])
    const txOptions = JSON.stringify({ gasLimit: 2000000 })

    const getAllAccounts = async () => {
        const response = (await PluralitySocialConnect.getAllAccounts()) as AllAccountsDataType;
        if (response) {
            const allAccounts = response.data;
            alert(`All Accounts: ${allAccounts[0]}`)
            return allAccounts[0]?.address;
        }
    }

    const getConnectedAccount = async () => {
        const response = (await PluralitySocialConnect.getConnectedAccount()) as ConnectedAccountDataType;
        if (response) {
            const connectedAccount = response.data;
            alert(`Connected Account: ${connectedAccount}`)
            return connectedAccount?.address;
        }
    }

    const getMessageSignature = async (message: string) => {
        const response = (await PluralitySocialConnect.getMessageSignature(message)) as SignMessageDataType;
        if (response) {
            const signMessage = response.data;
            alert(`Sign Message Data: ${signMessage}`)
            console.log(signMessage);
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

    const loadPublicData = async () => {
        const response = (await PluralitySocialConnect.getPublicData("name")) as ConnectedAccountDataType;
        if (response) {
            alert(response.data);
            console.log("Load Public Data  (Inside dApp):", response.data)
        }
    }

    const storePublicData = async () => {
        const response = (await PluralitySocialConnect.setPublicData("name", "plural-abc")) as ConnectedAccountDataType;
        if (response) {
            alert(response.data);
            console.log("response", response.data)
        }
    }

    const loadPrivateData = async () => {
        const response = (await PluralitySocialConnect.getPrivateData("work")) as ConnectedAccountDataType;
        if (response) {
            alert(response.data);
            console.log("response", response.data)
        }
    }

    const storePrivateData = async () => {
        const response = (await PluralitySocialConnect.setPrivateData("work", "Plurality")) as ConnectedAccountDataType;
        if (response) {
            alert(response.data);
            console.log("response", response.data)
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

    const handleDataReturned = (data: any) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Login info callback data (Inisde dApp)::", receivedData);
    };


    return (

        <div style={{
            padding: "10px"
        }}>
            <PluralitySocialConnect 
                options={options}                 
                onDataReturned={handleDataReturned}
                customization={{
                    backgroundColor: '#8002FF',
                    color: 'white',
                    minWidth: '180px',
                    height: '50px',
                    borderRadius: '5',
                    hoverBackgroundColor: '#00CEBA',
                    hoverTextColor: 'black',
                    marginTop: '10px',
                    fontSize: '20px',
                    fontFamily: 'cursive',
                }}
            />
            <div style={{
                width: '200px',
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "0px"
            }}>
                <button onClick={() => getAllAccounts()}>Get All Accounts</button>
                <button onClick={() => getConnectedAccount()}>Get Connected Account</button>
                <button onClick={() => getMessageSignature("Example `personal_sign` message.")}>Sign Message</button>
                <button onClick={() => getVerifyMessageData("Example `personal_sign` message.", "0x8e2eeb0a7fe472bcd9751e2a8f27b60050c98a3140c07679bd1a00082de1fce86c9dbaad511503e1c4b2e9f57f7ddf971865eb9f177387879417ef0776c02cf41b")}>Verify Message</button>
                <button onClick={() => getBalanceData("https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Get Balance</button>
                <button onClick={() => sendTransactionData(rawTx, "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Send Transaction</button>
                <button onClick={() => fetchTransactionCount("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2", "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Get Transaction count</button>
                <button onClick={() => readFromContractData("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "retrieve", "", "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Read Contract</button>
                <button onClick={() => writeToContractData("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "store", txParams, "https://ethereum-sepolia.rpc.subquery.network/public", "11155111", txOptions)}>Write Contract</button>
                <button onClick={() => storePublicData()}>Set Public Data</button>
                <button onClick={() => loadPublicData()}>Get Public Data</button>
                <button onClick={() => storePrivateData()}>Set Private Data</button>
                <button onClick={() => loadPrivateData()}>Get Private Data</button>
                <button onClick={() => fetchLoginInfo()}>Get Login Info</button>
                <button onClick={() => updateConsent()}>Update Consent</button>
                <button onClick={() => fetchSmartProfileData()}>Get Smart Profile Data</button>
            </div>
        </div>
    )
}

export default App
