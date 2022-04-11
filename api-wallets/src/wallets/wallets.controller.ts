import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
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
  async getAllWallets() {
    const wallets = await this.walletsService.getWallets();
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
    @Param('id') walletId: string,
    @Body('isFavorite') isFav: boolean,
  ) {
    await this.walletsService.updateFav(walletId, isFav);
    return null;
  }
}
