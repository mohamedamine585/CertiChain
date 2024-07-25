import { Request, Response } from 'express';
import { createHash, publicDecrypt,verify,createVerify, sign, createSign, createDiffieHellman, generateKeyPair, constants } from 'crypto';
import { getAccountBalance, getCertificateFromAptos, issueCertificateToAptos } from '../services/aptosService';
import { addTransaction, fetchIssuer } from '../services/issuerService';
import { verifyCertifcateData } from '../services/certificationValidation';
import { Account } from '@aptos-labs/ts-sdk';
import { get } from 'http';
import { json } from 'body-parser';





export async function getCertificate(req : Request , res : Response) {
   try {
    const hash = req.params.hash
    const opt = await getCertificateFromAptos(hash)
    if(opt != null && opt.issuer != null && opt.cert != null ){
      res.json({
        "hash":hash,
        "certName":opt.cert.name,
        "certType":opt.cert.type,
        "issuerName":opt.issuer.name,
        "issuerType":opt.issuer.type,
        "dateTime":opt.certIssuance.dateTime,
        "reciepientName":opt.certIssuance.reciepientName,
        "reciepientEmail":opt.certIssuance.reciepientName,
        "reciepientPhotoUrl":opt.certIssuance.reciepientPhotoUrl,

      })
    }
   
   } catch (error) {
    console.log(error)
   }
   return null;
}

export async function issueCertificate(req : Request , res : Response){
  try {
    console.log(req.body)
  

    const {
        issuerId,
        certificationId,
        reciepientName,
        reciepientEmail,
        reciepientPhotoUrl,
        certificateUrl,
        signiture,
        } =  req.body
        const data = {
            issuerId,
            certificationId,
            reciepientName,
            reciepientEmail,
            reciepientPhotoUrl,
            certificateUrl,
        }
    
    if( signiture == null || signiture == undefined ||
         issuerId == null || issuerId == undefined  || 
         certificationId == null || certificationId == undefined)
        throw new Error("Bad Body Format")
        const issuer = await fetchIssuer(data.issuerId);
       if(issuer != null){
        // Verify if certificateIssuace coming from one of our Issuers
        if(await verifyCertifcateData(data,signiture,issuer.publickey as string) ){
          const issserSubscriptionExpirationDate = (issuer.subscriptionExpirationDate as Date).getMilliseconds();
             if(issserSubscriptionExpirationDate < Date.now()){

              // Push transaction to blockChain
                const certificateIssuance = await issueCertificateToAptos(data)
                if(certificateIssuance != null){
                  // add transaction to dataBase for tracking
                  await addTransaction(certificateIssuance.hash,issuerId, Number.parseFloat(certificateIssuance.max_gas_amount)*Number.parseFloat(certificateIssuance.max_gas_amount)
                  )
                }

             }
         }
         res.send(issuerId)

       }else{

        res.sendStatus(404)
       }
    

   
  } catch (error) {
    console.log(error)
    res.sendStatus(400)

  }
}
async function generateKeyPairAsync() {
    return new Promise<{ publicKey: string; privateKey: string }>((resolve, reject) => {
      generateKeyPair(
        'rsa', // Key type
        {
          modulusLength: 2048, // Key size in bits
          publicKeyEncoding: {
            type: 'spki', // Public Key format
            format: 'pem', // Encoding format
          },
          privateKeyEncoding: {
            type: 'pkcs8', // Private Key format
            format: 'pem', // Encoding format
          },
        },
        (err, publicKey, privateKey) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              publicKey: publicKey.toString(),
              privateKey: privateKey.toString(),
            });
          }
        }
      );
    });
  }
  
  // Function to sign data using the private key
  function signData(data: string, privateKey: string): string {
    try {
      const signObject = sign('sha256', Buffer.from(data), {
        key: privateKey,
        padding: constants.RSA_PKCS1_PSS_PADDING,
      });
      return signObject.toString('base64');
    } catch (err) {
      console.error('Error signing data:', err);
      throw err;
    }
  }

