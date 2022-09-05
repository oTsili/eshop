import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSupplierDto } from './dto/supplier.dto';
import { Supplier, SupplierDocument } from './schemas/supplier.schema';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const createSupplier = new this.supplierModel(createSupplierDto);
    return createSupplier.save();
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierModel.find().exec();
  }
}
