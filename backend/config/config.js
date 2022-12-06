module.exports = {

  /** DATABASE */
  db: {
    // DB_HOST: process.env.DB_HOST,
    // DB_USER: process.env.DB_USER,
    // DB_PASS: process.env.DB_PASS,
    // DB_NAME: process.env.DB_NAME,
    DB_HOST: "localhost",
    DB_USER: "root",
    DB_PASS: "admin@123",
    DB_NAME: "mydb",
    dialect: "mysql",

    // pool is optional, it will be used for Sequelize connection pool configuration
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  
};


// {
//   "development": {
//     "username": "root",
//     "password": "admin@123",
//     "database": "mydb",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }