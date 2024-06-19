import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './app/todo/models/todo.module';
import { TagModule } from './app/todo/models/tag.module';
import { UserModule } from './app/todo/models/user.module';
import { UserEntity } from './app/todo/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({isGlobal: true}),
        
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register( {
          secret: 'secret',
          signOptions: {expiresIn: '1d'}
        }),
      ],
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
    TypeOrmModule.forFeature([UserEntity]),
    TodoModule, TagModule, UserModule, 
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
