import {ConnectionOptions} from 'typeorm';

const config: ConnectionOptions =  {
  type: 'sqlite',
  database: 'database.db',
  synchronize: false,
  migrationsRun: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: false,
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: '/src/migrations',
  },
}

export = config;