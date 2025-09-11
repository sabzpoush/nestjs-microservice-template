import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config();
const {
  POSTGRESQL_HOST,
  POSTGRESQL_PORT,
  POSTGRESQL_USERNAME,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_DATABASE,
} = process.env;

const dataSource = new DataSource({
  type: 'postgres',
  username: POSTGRESQL_USERNAME,
  password: POSTGRESQL_PASSWORD,
  database: POSTGRESQL_DATABASE,
  port: Number(POSTGRESQL_PORT),
  host: POSTGRESQL_HOST,
  synchronize: false,
  entities: ['dist/database/postgres/entity/*.entity{.ts,.js}'],
  migrations: ['dist/database/postgres/migration/*{.ts,.js}'],
});

export default dataSource;
