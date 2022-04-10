import * as mongoose from 'mongoose';

export const WalletSchema = new mongoose.Schema({
  address: { type: String, required: true },
  isFavorite: { type: Boolean, default: false },
  firstTransaction: {type: String, required: true}
});

export interface Wallet {
  id: string;
  address: string;
  isFavorite: boolean;
  firstTransaction: string;
}
