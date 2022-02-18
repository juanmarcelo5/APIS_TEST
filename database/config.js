const mongoose = require('mongoose')
const conectarDB = async()=>{
  try {
   await mongoose.connect(process.env.MONGO_CNN)
    console.log('Base datos online');
  } catch (error) {
    console.log(error);
    return 'Error al conectar la base '
  }
}
module.exports = conectarDB