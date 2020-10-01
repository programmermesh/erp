import { Module } from '@nestjs/common';
import { CompaniesContractFilesController } from './companies-contract-files.controller';
import { CompaniesContractFilesService } from './companies-contract-files.service';
import { ContractFileEntity as ContractFile } from './contract-file.entity'
import { ContractEntity as Contract } from '../companies-contracts/contract.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContractFile, Contract
    ])
  ],
  controllers: [CompaniesContractFilesController],
  providers: [CompaniesContractFilesService]
})
export class CompaniesContractFilesModule {}
