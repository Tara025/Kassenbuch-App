import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    //ab hier wird die eingegebene zahl überprüft

    const parsedAmount = parseFloat(+amount);

    if (isNaN(parsedAmount)) {
      alert("Bitte geben Sie eine gültige Zahl für den Betrag ein.");
      return;
    }

    if (parsedAmount > 1000000) {
      alert("Der eingegebene Betrag ist zu hoch.");
      return;
    }

    const newTransaction = {
      text,
      amount: parsedAmount, //+amount
    };

    addTransaction(newTransaction);
    setText("");
    setAmount("");
  };

  const handleTextChange = (e) => {
    const sanitizedText = e.target.value.replace(/[<>]/g, "");
    setText(sanitizedText);
  };

  return (
    <>
      <h3>Neuer Eintrag:</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={handleTextChange} //(e) => setText(e.target.value)
            placeholder="Text einfügen..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Betrag <br />
            (negative - Ausgabe, positive - Einnahme)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            maxLength={50}
            placeholder="Betrag eingeben..."
          />
        </div>
        <button className="btn">Eintrag erstellen</button>
      </form>
    </>
  );
};
