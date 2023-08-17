// controllers/user.js

import UserModel from '../models/UserModel.js';

// Benutzer registrieren
export const registerUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Überprüfen, ob der Benutzer bereits existiert
    const existingUser = await UserModel.findOne({ name });

    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Benutzer existiert bereits' });
    }

    // Neuen Benutzer erstellen
    const user = await UserModel.create({ name, password });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Serverfehler' });
  }
};

// Benutzer anmelden
export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Überprüfen, ob der Benutzer existiert
    const user = await UserModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ success: false, error: 'Benutzer nicht gefunden' });
    }

    // Überprüfen des Passworts
    if (user.password !== password) {
      return res.status(401).json({ success: false, error: 'Falsches Passwort' });
    }

    // Anmeldung erfolgreich
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Serverfehler' });
  }
};

// Guthaben abrufen
export const getBalance = async (req, res) => {
  try {
    const { userId } = req.params;

    // Benutzer und seine Transaktionen abrufen
    const user = await UserModel.findById(userId).populate('transactions');

    if (!user) {
      return res.status(404).json({ success: false, error: 'Benutzer nicht gefunden' });
    }

    // Guthaben berechnen
    const balance = user.transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    res.status(200).json({ success: true, balance });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Serverfehler' });
  }
};
