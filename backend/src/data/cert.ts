import mongoose, { Schema, Model, Document } from 'mongoose';

// Define the Issuer schema
const CertificateSchema: Schema = new Schema({
  certName: {type:String , required : true},
  certType: {type:String , required : true,default:""},
  certUrl:{type:String , required : false},
  expirationTime:{type:Date,default : null},
  dateTime: {type:Date,required: true ,default:Date.now}
});

// Create the Certificate model
const  Certificate = mongoose.model('Certificate', CertificateSchema);

export default Certificate;

