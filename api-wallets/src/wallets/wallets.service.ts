import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './wallets.model';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class WalletsService {
  private wallets: Wallet[] = [];

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
    ) {}


  async createWallet(
    address: string,
  ) {
    const firstTransaction = await this.firstWalletTransaction(address)
    if (!firstTransaction) {
      throw new NotFoundException('Wallet not found');
    }
    const newWallet = new this.walletModel({
      address,
      firstTransaction,
    });
    const result = await newWallet.save();
    return result.address;
  }
  
  async getWallets() {
    const allWallets = await this.walletModel.find().exec();
    return allWallets.map((w) => ({
      address: w.address,
      id: w.id,
      isFavorite: w.isFavorite,
      firstTransaction: w.firstTransaction,
    }));
  }
  async getOneWallet(address: string) {
    const wallet = await this.findWallet(address);
    return wallet;
  }

  async updateWallet(walletId: string, favStatus: boolean) {
    const updatedwallet = await this.findWallet(walletId);
    updatedwallet.isFavorite = !favStatus;

    //updatedwallet.save(); HERE I HAVE AN ISSUE
    // await this.walletModel
    //   .where({ _id: walletId })
    //   .update({ isFavorite: !favStatus });
    //   console.log()
  }

  async deleteWallet(walletId: string) {
    const result = await this.walletModel.deleteOne({ _id: walletId }).exec();
    console.log(result);
  }

  private async findWallet(address: string): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({ address: address }).exec();
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return {
      address: wallet.address,
      id: wallet.id,
      isFavorite: wallet.isFavorite,
      firstTransaction: wallet.firstTransaction,
    };
  }
  private async firstWalletTransaction(address: string){
    const apiKey = this.configService.get('API_KEY');
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&page=1&offset=1&apikey=${apiKey}`
    const {data} = await firstValueFrom(this.httpService.get(url))
    return data.result[0].timeStamp+'000'
  }
}
