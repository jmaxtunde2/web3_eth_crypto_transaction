import React, {useState, useEffect} from 'react';
import { ethers } from "ethers"
import {contractABI, contractAddress} from '../utils/constants';

export const TransactionsContext = React.createContext();

const {ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  
    return transactionsContract;
  };

export const TransactionProvider = ({children}) => {
    const [connectedAccount, setConnectedAccount] = useState();
    const [formData, setFormData] = useState({addressTo: "", amount: "", keyword: "", message: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
      };

    const getAllTransaction = async () => {
        try {
            if(!ethereum) return alert("Please Install Metamask");
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransaction();
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
              }));
      
              console.log(structuredTransactions);
      
              setTransactions(structuredTransactions);
        } catch (error) {
            
        }
    }
    const checkIfWalletIsConnected = async ()=>{
        try {
            if(!ethereum) return alert("Please Install Metamask");
            const accounts = await ethereum.request({method: 'eth_accounts'});

            if(accounts.length){
                setConnectedAccount(accounts[0]);
                getAllTransaction();
            }else{
                console.log("No account found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object"); 
        }
        
    }

    const connectWallet = async() => {
        try {
            if(!ethereum) return alert("Please Install Metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setConnectedAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object");
        }
    }

    const checkIfTransactionExist = async() =>{
        try {
            const transactionContract = getEthereumContract();
            const transactionCount =  await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount", transactionCount);
        } catch (error) {
            
        }
    }

    const sendTransaction = async () =>{
        try {
            if(!ethereum) return alert("Please Install Metamask");
            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parsetEth = ethers.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: connectWallet,
                    to: addressTo,
                    gaz:'0x5208', // 21000Geth
                    value:parsetEth.toString(16),                    
                }],
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo,parsetEth,message, keyword)
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(true);
            console.log(`sucess - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber())
        } catch (error) {
            console.log(error);         
        }
    }
    
    useEffect( () => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    }, []);

    return(
        <TransactionsContext.Provider value={{connectWallet, connectedAccount, formData, setFormData, handleChange, sendTransaction, isLoading}}>
            {children}
        </TransactionsContext.Provider>
    );
}