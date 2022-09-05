import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { SupplierFolderMiddleware } from 'src/custom-middlewares/supplier-folder.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierDocumentSchema } from './schemas/supplier.schema';

@Module({
  providers: [SupplierService],
  controllers: [SupplierController],
  imports: [
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierDocumentSchema },
    ]),
  ],
})
export class SupplierModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(SupplierFolderMiddleware)
  //     .forRoutes({ path: 'supplier', method: RequestMethod.POST });
  // }
}
