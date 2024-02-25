import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const newClient = this.clientRepository.create({
      nome: createClientDto.nome,
      cpf: createClientDto.cpf,
    });

    return await this.clientRepository.save(newClient);
  }

  async findCpf(cpf: string) {
    return await this.clientRepository.findOne({ where: { cpf } });
  }
}
