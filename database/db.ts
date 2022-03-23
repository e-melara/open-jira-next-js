import mongoose from 'mongoose';

const mongo = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongo.isConnected) {
    return;
  }
  if (mongoose.connections.length > 0) {
    mongo.isConnected = mongoose.connections[0].readyState;
    if (mongo.isConnected === 1) {
      return;
    }

    await mongoose.disconnect();
  }
  await mongoose.connect(process.env.MONGO_URL || '');
  mongo.isConnected = 1;
  console.log('Conectado', process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') {
    return;
  }
  if (mongo.isConnected === 0) return;
  mongoose.disconnect();
  console.log('nos hemos desconetado');
};
