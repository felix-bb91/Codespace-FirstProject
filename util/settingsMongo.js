const dbMongo = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '27017',
    db: process.env.DB_NAME || 'statistics',
  };
  
  
module.exports = {
    dbMongo,
};
  