import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'srv1750.hstgr.io',
      user: 'u932646786_iot_data',
      password: 'G7t$Lq9!xZ2w',
      database: 'u932646786_Iot_platform',
      ssl: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      },
      port: 3306,
      connectTimeout: 10000
    });
    
    console.log('Successfully connected to database');
    await connection.end();
  } catch (error) {
    console.error('Connection failed with details:', {
      code: (error as any).code,
      errno: (error as any).errno,
      sqlState: (error as any).sqlState,
      message: (error as any).message
    });
  }
}

testConnection(); 