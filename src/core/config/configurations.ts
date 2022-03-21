/**
 * Created by xun on  2022/3/10 18:02.
 * description: configurations
 */
const loadConfig = () => {
  const { env } = process;

  return {
    db: {
      database: env.TYPEORM_DATABASE,
      host: env.TYPEORM_HOST,
      port: parseInt(env.TYPEORM_PORT, 10) || 3306,
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
    },
  };
};

export default loadConfig;
