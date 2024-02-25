import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateStatusBankAccountDto } from './dto/update-bank-account.dto';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  async create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return await this.bankAccountService.create(createBankAccountDto);
  }

  @Get()
  async findAll() {
    return await this.bankAccountService.findAll();
  }

  @Patch('/status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusBankAccountDto: UpdateStatusBankAccountDto,
  ) {
    await this.bankAccountService.updateStatus(id, updateStatusBankAccountDto);
    return;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountService.remove(id);
  }
}
