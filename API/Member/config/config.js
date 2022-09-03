const config = require('./index');

module.exports = {
    
        "development": {
          "username": config.DB_USERNAME,
          "password": config.DB_PASSWORD,
          "database": config.DB_DATABASE,
          "host": config.DB_HOST,
          "dialect": config.DB_DIALECT,
          "port": config.DB_PORT,
          "timezone": "+07:00",
         
        },
        "test": {
          "username": "root",
          "password": null,
          "database": "database_test",
          "host": "127.0.0.1",
          "dialect": "mysql"
        },
        "production": {
          "username": config.DB_USERNAME_PORD,
          "password": config.DB_PASSWORD_PORD,
          "database": config.DB_DATABASE_PORD,
          "host": config.DB_HOST_PORD,
          "dialect": config.DB_DIALECT_PORD,
          "port": config.DB_PORT_PORD,
          "timezone": "+07:00",
        
        },
       
      
      
}