import { Router } from "express";
import {
  getTransactions,
  addTransaction,
  deleteTransaction}
from "../controllers/transactions.js";

const transactionRouter = new Router();

transactionRouter.get("/transactions",getTransactions);

transactionRouter.post("/transactions", addTransaction);

transactionRouter.delete("/transactions/:id",deleteTransaction);

export default transactionRouter;
