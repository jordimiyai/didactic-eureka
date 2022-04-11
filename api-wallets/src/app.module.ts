import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExRateModule } from './exchangeRates/eRates.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WalletsModule,
    ExRateModule,
    MongooseModule.forRoot('mongodb://localhost:27017/walletsDB'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
