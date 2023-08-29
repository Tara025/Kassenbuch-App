import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(+amount);

    if (isNaN(parsedAmount)) {
      alert("Bitte geben Sie eine gültige Zahl für den Betrag ein.");
      return;
    }

    if (parsedAmount > 100000000) {
      alert("Der eingegebene Betrag ist zu hoch.");
      return;
    }

    if (text.trim() === "" || amount === "") {
      alert("Betrag oder Text fehlen noch.");
      return;
    }

    const newTransaction = {
      text,
      amount: parsedAmount, 
    };

    addTransaction(newTransaction);
    setText("");
    setAmount("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "text" && value.length <= 30) {
      const sanitizedText = value.replace(/[<>]/g, "");
      setText(sanitizedText);
    } else if (name === "amount") {
      if (/^-?\d{0,8}$/.test(value)) {
        setAmount(value);
      }
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
            onChange={handleInputChange}
            maxLength={30}
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
            onChange={handleInputChange}
            placeholder="Betrag eingeben..."
          />
        </div>
        <button className="btn">Eintrag erstellen</button>
      </form>
    </>
  );
};
