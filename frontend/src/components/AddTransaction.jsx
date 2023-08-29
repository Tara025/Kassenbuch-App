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

  //textfeld wird überprüft
  // const handleTextChange = (e) => {
  //   const sanitizedText = e.target.value.replace(/[<>]/g, "");
  //   setText(sanitizedText);
  // };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "text") {
      const sanitizedText = value.replace(/[<>]/g, "")
      setText(sanitizedText);
    } else if (name === "amount" && (value === "" || /^\d{1,7}$/.test(value))) {
      setAmount(value);
    }
  };

  return (
    <>
      <h3>Neuer Eintrag:</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            name="text"
            value={text}
            onChange={handleInputChange} //(e) => setText(e.target.value)
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
            name="amount"
            value={amount}
            onChange={handleInputChange} //(e) => setAmount(e.target.value)
            // maxLength={3}
            placeholder="Betrag eingeben..."
          />
        </div>
        <button className="btn">Eintrag erstellen</button>
      </form>
    </>
  );
};
