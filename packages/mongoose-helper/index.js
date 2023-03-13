const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongooseOpts = {
  useUnifiedTopology: true,
  directConnection: true,
  useNewUrlParser: true
};

async function connect (mongo_uri) {
    return await mongoose.connect(mongo_uri, { ...mongooseOpts });
  
}

function ObjectId(){
  return new mongoose.Types.ObjectId().toString()
}

mongoose.set('strictQuery', false);
//mongoose.set('debug', { shell: true })

mongoose.connection.on('error', (err) => {
  console.log('error while connecting to mongodb');
  console.error(err);
  process.exit(1);
});

mongoose.connection.once('connected', () => {
  console.log(`app is connected to ${process.env.MONGO_URI ? process.env.MONGO_URI : process.env.MONGO_HOST}`);
})

module.exports = {
  connect,
  ObjectId,
  mongoose
};