import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ TypeOrmModule.forRoot(), CompaniesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
