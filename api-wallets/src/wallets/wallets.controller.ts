import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @Post()
  async addWallet(@Body('address') walletAddress: string) {
    const created = await this.walletsService.createWallet(walletAddress);
    return { address: created };
  }

  @Get()
  async getAllWallets(@Query('sorted') sorted:string) {
    const wallets = await this.walletsService.getWallets(sorted);
    return wallets;
  }

  @Get(':id')
  getWallet(@Param('id') walletId: string) {
    return this.walletsService.getOneWallet(walletId);
  }

  @Delete(':id')
  async removeWallet(@Param('id') walletId: string) {
    await this.walletsService.deleteWallet(walletId);
    return null;
  }

  @Patch(':id')
  async updateFavorite(
    @Body('favStatus') favStatus: boolean,
    @Param('id') walletId: string,
  ) {
    await this.walletsService.updateFav(walletId, favStatus);
    return null;
  }
}
