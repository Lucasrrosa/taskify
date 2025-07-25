import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

config()

const configService = new ConfigService()

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DATABASE_DIRECT_URL'),
  entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
  logging: configService.get('NODENV') === 'dev',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  synchronize: false,
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
