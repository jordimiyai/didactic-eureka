import * as mongoose from 'mongoose';

export const ExRateSchema = new mongoose.Schema({
  currency: { type: String, required: true },
  code: { type: String },
  symbol: { type: String },
  rate: { type: Number, required: true },
});

export interface ExRate {
    currency: string;
    code: string;
    symbol: string;
    rate: number;
    id: string
}
