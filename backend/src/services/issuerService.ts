import mongoose, { Types } from "mongoose";
import  Issuer  from "../data/issuer";
import Transaction from "../data/transactions";

export async function fetchIssuer(issuerId:string) {
    try {
     const issuer = await Issuer.findById(Types.ObjectId.createFromHexString(issuerId))
     return issuer;
    } catch (error) {
        console.log(error)
    }
    return null;
    
}

export async function addIssuer(payload : any) {
    try {
     const issuer = new Issuer({
        name: payload.name,
        type: payload.type,
        longitude: payload.longitude,
        latitude: payload.latitude,
        subscriptionType:payload.subscriptionType,
        subscriptionExpirationDate: payload.subscriptionExpirationDate,
        phoneNumber : payload.phoneNumber,
        joiningDate: payload.joiningDate,
        publicKey:payload.publicKey,
        certificatesIds:payload.certificatesIds

     })
     await  issuer.save()
     return ;
    } catch (error) {
        console.log(error)
    }
    return null;
    
}


export async function addTransaction(transactionHash :string,issuerId : string , gas : number) {
    try {
     const transaction = new Transaction({
        hash:transactionHash,
        gas:gas,
        issuerId:issuerId

     })
     await  transaction.save()
     return ;
    } catch (error) {
        console.log(error)
    }
    return null;
    
}

