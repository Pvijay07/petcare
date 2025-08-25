// src/components/TransactionTable.jsx
import React from 'react';
// import './styles/transaction.css';

const TransactionTable = ({ transactions }) => {
  return (
    <div className="wallet-table">
      <div className="wallet-table-hd">
        <span>Pet Master</span>
        <span>Service</span>
        <span>Amount</span>
        <span>Date</span>
      </div>

      {transactions.map((transaction) => (
        <div className="wallet-table-row" key={transaction.id}>
          <p>{transaction.petMaster}</p>
          <p>{transaction.service}</p>
          <p className={transaction.type === 'credit' ? 'amt-rg' : 'amt-r'}>
            {transaction.amount}
          </p>
          <p>{transaction.description} <small>{transaction.date}</small></p>
        </div>
      ))}
    </div>
  );
};

export default TransactionTable;