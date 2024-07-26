import mongoose, { Schema, Model, Document } from 'mongoose';

// Define the Issuer schema
const CertificateSchema: Schema = new Schema({
  issuerId: {type:String , required : true},
  certId: {type:String , required : true},
  issuerAddress: {type:String , required : true},
  certName:{type:String , required : true},
  isPrivate:{type:String , required : true,default:""},
});

// Create the Certificate model
const  Certificate = mongoose.model('Certificate', CertificateSchema);

export default Certificate;



