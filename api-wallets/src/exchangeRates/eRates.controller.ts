import {
    Controller,
    Body,
    Get,
    Param,
    Patch,
  } from '@nestjs/common';
  import { ExRateService } from './eRates.service';
  
  @Controller('eRates')
  export class ExRateController {
    constructor(private exRatesService: ExRateService) {}

    @Get()
    async getAllRates() {
      const rates = await this.exRatesService.getExchangeRates();
      return rates;
    }

    @Patch(':id')
    async updateRate(
      @Param('id') rateId: string,
      @Body('newRate') newRate: number,
    ) {
      await this.exRatesService.updateRate(rateId, newRate);
      return null;
    }
  }  