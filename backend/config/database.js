const mongoose = require("mongoose");

const connectDatabase = () => {
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  
  mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection success');
  });
};

module.exports = connectDatabase;

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}
