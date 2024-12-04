import React from 'react';

const Transactions = ({ transactions }) => {
  // Ensure transactions is an array, use empty array as fallback
  const transactionList = transactions || [];

  return (
    <div>
      {transactionList.length > 0 ? (
        transactionList.map((transaction, index) => (
          <div key={index} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
            <p><strong>Date:</strong> {transaction.date}</p>
            <p><strong>Amount:</strong> {transaction.currency}{transaction.amount}</p>
          </div>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;