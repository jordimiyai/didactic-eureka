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

  async createWallet(address: string) {
    const firstTransaction = await this.firstWalletTransaction(address);
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
    if (!allWallets) {
      throw new NotFoundException('No wallets in DB');
    }
    return allWallets.map((w) => ({
      address: w.address,
      id: w.id,
      isFavorite: w.isFavorite,
      firstTransaction: w.firstTransaction,
    }));
  }

  private isOld(timeStamp: number) {
    const firstTr = new Date(timeStamp * 1000);
    const today = new Date();
    today.setFullYear(today.getFullYear() - 1);
    const walletIsOld = firstTr <= today ? true : false;
    return walletIsOld;
  }

  async getOneWallet(id: string) {
    const wallet = await this.findWallet(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not Found');
    }
    let walletIsOld = this.isOld(wallet.firstTransaction);

    const balanceWei = await this.getBalance(wallet.address);
    //the api returns the balance in wei so i make the convert or i can use a web3 library
    // const balanceEther = balanceWey / 1000000000000000000
    return {
      address: wallet.address,
      id: wallet.id,
      isOld: walletIsOld,
      balanceWei: balanceWei,
      isFavorite: wallet.isFavorite,
    };
  }

  private async getBalance(address: string) {
    const apiKey = this.configService.get('API_KEY');
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data.result;
  }

  async updateFav(walletId: string, isFav: boolean) {
    const updatedwallet = await this.findWallet(walletId);
    const result = await this.walletModel.updateOne(
      { _id: walletId },
      { isFavorite: isFav },
    );
  }

  async deleteWallet(walletId: string) {
    const result = await this.walletModel.deleteOne({ _id: walletId }).exec();
    console.log(result);
  }

  private async findWallet(id: string): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({ _id: id }).exec();
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }

  private async firstWalletTransaction(address: string) {
    const apiKey = this.configService.get('API_KEY');
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&apikey=${apiKey}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    if (data.status === '0') {
      throw new NotFoundException(data.message);
    }
    return data.result[0].timeStamp;
  }
}
