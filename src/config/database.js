module.exports = {
  host: '127.0.0.1',
  username: 'postgres',
  password: 'yourPassword',
  database: 'demo_db2',
  dialect: 'postgres',
  operatiorsAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
