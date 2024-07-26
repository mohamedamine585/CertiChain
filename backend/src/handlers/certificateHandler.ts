import { Request, Response } from 'express';
import { createHash, sign, generateKeyPair, constants } from 'crypto';
import { estimateTransactionCost, fundIssuer, getCertificateFromAptos } from '../services/aptosService';
import { Types } from 'mongoose';
import { ADMIN_ADDRESS, HASH_SALT } from '../utils/consts';



export async function getCertificate(req : Request , res : Response) {
   try {


    
    
    const hash = hashSHA256(req.params.id) 
    console.log(hash)

    const certAptos =  await getCertificateFromAptos(hash);
    if(certAptos != null){

      res.json({
        certAptos,
    
      });

    }
   
   
   } catch (error) {
    console.log(error)
   }
   return null;
}

export async function getCertificateHash(req : Request , res : Response){
  try {
    const certIssuanceId = new Types.ObjectId()
    const fundingAmout = await estimateTransactionCost();
    await fundIssuer(req.params.address,fundingAmout);
    res.json({
      'id':certIssuanceId,
      'ModuleAddress':ADMIN_ADDRESS,

      'hash':hashSHA256(certIssuanceId.toString())
    })

     

   
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

function hashSHA256(data: string): string {
  return createHash('sha256').update(data + HASH_SALT).digest('hex');
}
