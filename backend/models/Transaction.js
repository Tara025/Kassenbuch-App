import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Bitte füge einen Text ein.']
  },
  amount: {
    type: Number,
    required: [true, 'Bitte einen negativen oder positiven Betrag eingeben.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  refUser:{type:mongoose.Schema.Types.ObjectId, ref:`User`}

});




// const transaction = mongoose.model('Transaction', TransactionSchema)
// transaction.safe()
// .then(() => console.log("Transactio saved successfully."))
// .catch((err) => console.log(err));

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

export default TransactionModel;