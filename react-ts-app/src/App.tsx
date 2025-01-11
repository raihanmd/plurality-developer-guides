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
    } from '@plurality-network/smart-profile-wallet'

const App = () => {
    const options = { apps: "example", cliendId: '', theme: 'light' };

    const abi = '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
    const rawTx = JSON.stringify({
        to: "0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2",
        value: "10000000000000000", //ethers.parseEther("0.01") but keep in string
        gasLimit: "21000", // we need bigInt, so keep it in string
        gasPrice: "50000000000", //ethers.parseUnits("50", "gwei") but keep in string
    })
    const txParams = JSON.stringify([8])
    const txOptions = JSON.stringify({gasLimit: 2000000})

    const getAllAccounts = async () => {
        const response = (await PluralitySocialConnect.getAllAccountsPromise()) as AllAccountsDataType;
        if (response) {
            const allAccounts = response.data;
            alert(`All Accounts: ${allAccounts[0]}`)
            return allAccounts[0]?.address;
        }
    }

    const getConnectedAccount = async () => {
        const response = (await PluralitySocialConnect.getConnectedAccountPromise()) as ConnectedAccountDataType;
        if (response) {
            const connectedAccount = response.data;
            alert(`Connected Account: ${connectedAccount}`)
            return connectedAccount?.address;
        }
    }

    const getMessageSignature = async (message: string) => {
        const response = (await PluralitySocialConnect.getMessageSignaturePromise(message)) as SignMessageDataType;
        if (response) {
            const signMessage = response.data;
            alert(`Sign Message Data: ${signMessage}`)
            return signMessage;
        }
    }

    const getVerifyMessageData = async (message: string, key: string) => {
        const response = (await PluralitySocialConnect.verifyMessageSignaturePromise(message, key)) as VerifySignedMessageDataType;
        if (response) {
            const verifyMessage = response.data;
            alert(`Verification Signature Data: ${verifyMessage}`)
            return verifyMessage;
        }
    }

    const getBalance = async (rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.getBalancePromise(rpc, chainId)) as GetBalanceDataType;
        if (response) {
            const getBalance = response.data;
            alert(`Balance: ${getBalance}`)
            return getBalance;
        }
    }

    const sendTransaction = async (rawTx: string, rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.sendTransactionPromise(rawTx, rpc, chainId)) as SendTransactionDataType;
        if (response) {
            const sendTransactionData = response.data;
            alert(`Send Transaction Response: ${sendTransactionData}`)
            return sendTransactionData;
        }
    }

    const getBlockNumber = async (rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.getBlockNumberPromise(rpc, chainId)) as GetBlockNumberDataType;
        if (response) {
            const blockNumber = response.data;
            alert(`Block Number: ${blockNumber}`)
            return blockNumber;
        }
    }

    const getTransactionCount = async (address: string, rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.getTransactionCountPromise(address, rpc, chainId)) as GetTransactionCountDataType;
        if (response) {
            const transactionCount = response.data;
            alert(`Transaction Count: ${transactionCount}`)
            return transactionCount;
        }
    }


    const readFromContract = async (address: string, abiVal: string, action: string, params: any, rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.readFromContractPromise(address, abiVal, action, params, rpc, chainId)) as ReadFromContractDataType;
        if (response) {
            const readContract = response.data;
            alert(`Read From Contract Data: ${readContract}`)
            return readContract;
        }
    }

    const writeToContract = async (address: string, abiVal: string, action: string, params: any, rpc: string, chainId: string, options: string) => {
        const response = (await PluralitySocialConnect.writeToContractPromise(address, abiVal, action, params, rpc, chainId, options)) as WriteToContractDataType;
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
            <PluralitySocialConnect options={options} />
            <div style={{
                width: '180px',
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "30px"
            }}>
                <button onClick={() => getAllAccounts()}>Get All Accounts</button>
                <button onClick={() => getConnectedAccount()}>Get Connected Account</button>
                <button onClick={() => getMessageSignature("Example `personal_sign` message.")}>Sign Message</button>
                <button onClick={() => getVerifyMessageData("Example `personal_sign` message.", "0x4b0a58d64ef2a4a5b6f60cf0b5f7decfec842e1bca35fba261660770d997297a66dad78ba2b2bd273f7de8130178bc93ddd44be3bafe1a94a8fd81a16a89cb0e1c")}>Verify Message</button>
                <button onClick={() => getBalance("https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Get Balance</button>
                <button onClick={() => getBlockNumber("https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Get Block Number</button>
                <button onClick={() => sendTransaction(rawTx, "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Send Transaction</button>
                <button onClick={() => getTransactionCount("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2", "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Get Transaction count</button>
                <button onClick={() => readFromContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "retrieve", "", "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Read Contract</button>
                <button onClick={() => writeToContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "store", txParams, "https://ethereum-sepolia.rpc.subquery.network/public", "11155111", txOptions)}>Write Contract</button>
            </div>
        </div>
    )
}

export default App
