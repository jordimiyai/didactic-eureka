import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExRate } from './eRates.model';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ExRateService {
  private exRates: ExRate[] = [];

  constructor(
    private httpService: HttpService,
    @InjectModel('ExRate') private readonly exRateModel: Model<ExRate>,
  ) {}
  //funcion aca  

  private async findExchangeRates(code: string){
    const url = `https://api.coingate.com/v2/rates/trader/buy/eth/${code}`;
    const {data} = await firstValueFrom(this.httpService.get(url));
    if (!data) {
      throw new NotFoundException("no exchange rate found");
    }
    return data
  }
  private async createExRate(code:string, currency: string, symbol:string) {
      const rate = await this.findExchangeRates(code)
    const newExRate = new this.exRateModel({
      code,
      currency,
      symbol, 
      rate
    });
    const result = await newExRate.save();
    return result;
  }

  async getExchangeRates(){
    let allRates = await this.exRateModel.find().exec();
    if (!allRates.length) {
        const dollar = await this.createExRate('USD', 'Dollar', 'US$')
        const euro = await this.createExRate('EUR', 'Euro', '€')
        allRates.push(euro)
        allRates.push(dollar)
    }

    return allRates
  }
  async updateRate (rateId: string, newRate: number,){
      const result = await this.exRateModel.updateOne(
        { _id: rateId},
        { rate: newRate },
      );
    
    }
}