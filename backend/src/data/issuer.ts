import mongoose, { Schema, Model, Document } from 'mongoose';

// Define the Issuer schema
const IssuerSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  subscriptionType: { type: String, required: true },
  subscriptionExpirationDate: { type: Date, required: true },
  phoneNumber : {type : String , required:true},
  joiningDate: { type: Date, required: true, default: Date.now },
  address:{type : String  , required : true , default:null},
  certificatesIds:{type : Array<String> , required:true,default:[]}
});

// Create the Issuer model
const  Issuer = mongoose.model('Issuer', IssuerSchema);

export default Issuer;




