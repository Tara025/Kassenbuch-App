import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState.jsx';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      text,
      amount: +amount
    }

    addTransaction(newTransaction);
  }

  return (
    <>
      <h3>Neuer Eintrag:</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Text einfügen..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Betrag <br />
            (negative - Ausgabe, positive - Einnahme)</label
          >
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Eintrag erstellen</button>
      </form>
    </>
  )
}
