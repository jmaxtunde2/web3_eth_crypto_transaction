import React, { useContext } from "react";
import {TransactionsContext} from '../../context/TransactionsContext';
const Transactions = () =>{
    const { transactions, connectedAccount } = useContext(TransactionsContext);
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {connectedAccount ? (
                <h3 className="text-white text-3xl text-center my-2">
                    Latest Transactions
                </h3>
                ) : (
                <h3 className="text-white text-3xl text-center my-2">
                    Connect your account to see the latest transactions
                </h3>
                )}
            </div>
        </div>
    );
}
export default Transactions;