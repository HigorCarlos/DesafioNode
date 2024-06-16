import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './app/todo/todo.module';
import { TagModule } from './app/todo/tag.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', 5432)),
        username: configService.get('DB_USER', 'postgres'),
        password: configService.get('DB_PASSWORD', '123'),
        database: configService.get('DB_DBs', 'desafio_back_end'),
        entities: [__dirname + '//**/*.entity{.js,.ts}'],
        synchronize: true,
      })
    }), 
    TodoModule, TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
