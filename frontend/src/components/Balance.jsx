import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState.jsx';
import { numberWithCommas } from '../utils/format.jsx';

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  console.log(transactions)

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
      <h4>Aktueller Stand</h4>
    <h1>€{numberWithCommas(total)}</h1>
    </>
  )
}
