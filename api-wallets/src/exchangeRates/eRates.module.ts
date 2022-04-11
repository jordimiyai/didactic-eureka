import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { HttpModule } from "@nestjs/axios";
import { ExRateController } from "./eRates.controller";
import { ExRateService } from "./eRates.service";
import { ExRateSchema } from "./eRates.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'ExRate', schema: ExRateSchema}]), HttpModule],
    controllers: [ExRateController],
    providers: [ExRateService]
})
export class ExRateModule{}