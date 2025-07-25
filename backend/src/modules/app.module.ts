import enviromentConfig, { EnviromentConfigType } from '@/config/enviroment.config'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [enviromentConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnviromentConfigType>) => ({
        type: 'postgres',
        url: configService.get('databaseUrl'),
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        logging: configService.get('nodenv') === 'dev',
        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
