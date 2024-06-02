const { Client } = require('pg');

const client = new Client({
  user: 'your_username', // نام کاربری PostgreSQL
  host: 'localhost',
  database: 'your_database', // نام پایگاه داده PostgreSQL
  password: 'your_password', // رمز عبور PostgreSQL
  port: 5432, // پورت PostgreSQL
});

// تابع برای اتصال به پایگاه داده PostgreSQL
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
    return client;
  } catch (error) {
    console.error('Error connecting to PostgreSQL database', error);
    throw error;
  }
}

// اتصال به پایگاه داده را صرفا یکبار انجام دهید و آن را export کنید
module.exports = { connectToDatabase };
