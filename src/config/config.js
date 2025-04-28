module.exports = {
  ENV_SECREATS: {
    database_url: process.env.DATABASE_URL || "mongodb://localhost:27017/",
    redis: {
      port: 6379,
      host: "localhost",
    },
  },
};
