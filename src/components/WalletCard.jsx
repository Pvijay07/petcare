// src/components/WalletCard.jsx
import React from 'react';
// import './styles/wallet.css';

const WalletCard = ({ balance }) => {
  return (
    <div className="wallet-bg">
      <div className="wallet-list">
        <div className="wallet-item full">
          <div className="wallet-item-lft">
            <img src="/images/rq-amt-icon.png" alt="Wallet Balance" />
          </div>
          <div className="wallet-item-rht">
            <p>Wallet Balance Amount</p>
            <span>RS {balance.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;