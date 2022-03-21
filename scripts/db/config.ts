import { User } from '../../src/user/entities/user.entity';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
const { env } = process;
require('dotenv').config({path:'.env'});
require('dotenv').config({path:`.env${env.NODE_ENV?`.${env.NODE_ENV}`:''}`});

const ormConfig: ConnectionOptions = {
  database: env.TYPEORM_DATABASE,
  host: env.TYPEORM_HOST,
  port: parseInt(env.TYPEORM_PORT, 10) || 5432,
  username: env.TYPEORM_USERNAME,
  password: env.TYPEORM_PASSWORD,
  type: 'postgres',
  synchronize:true,
  entities: [User],
};

export default ormConfig;
