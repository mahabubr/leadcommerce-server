import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  env: process.env.NODE_ENV,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_customer_pass: process.env.DEFAULT_CUSTOMER_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
};
