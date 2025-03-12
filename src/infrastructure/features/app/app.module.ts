import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { DatabaseService } from 'src/infrastructure/services/dabatase.service';
import { ProductModule } from '../products/product.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly databaseService: DatabaseService) { }

  async onApplicationBootstrap() {
    await this.databaseService.connect();
  }
}
