import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CustomError } from '../../libs';
import { HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './client.schema';

@Injectable()
export class ClientService {
  constructor(@InjectModel('Cart') private cartModel: Model<Cart>) { }

  async create(createClientDto: CreateClientDto) {
    try {
      const description = createClientDto?.description?.replace(/[^a-zA-Z ]/g, "")
      const res = new this.cartModel({ ...createClientDto, description })
      const data = await res.save()
      if (!data) {
        return CustomError('Something went wrong', HttpStatus.BAD_REQUEST)
      }
      return data
    }
    catch (err) {
      return CustomError(err.response, err.status)
    }
  }

  async findAll() {
    try {
      const data = await this.cartModel.find()
      if (!data)
        throw ({ message: 'Data not found', status: HttpStatus.NOT_FOUND })
      return data
    }
    catch (err) {
      return CustomError(err.response, err.status)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
