import mongoose, { Schema, Model, Document } from 'mongoose';

// Define the Issuer schema
const CertificateIssuanceSchema: Schema = new Schema({
  issuerId: {type:String , required : true},
  certId: {type:String , required : true},
  issuerAddress: {type:String , required : true},
  reciepientName:{type:String , required : true},
  reciepientEmail:{type:String , required : true,default:""},
  reciepientPhotoUrl:{type:String , required : false},

  gas:{type:String , required : true},
  dateTime: {type:Date,required: true ,default:Date.now}
});

// Create the CertificateIssuance model
const  CertificateIssuance = mongoose.model('CertificateIssuance', CertificateIssuanceSchema);

export default CertificateIssuance;



