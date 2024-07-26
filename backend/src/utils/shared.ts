
import { Account, Aptos, Ed25519Account, Ed25519PrivateKey, FeePayerRawTransaction, RawTransaction } from '@aptos-labs/ts-sdk';
import { AptosClient } from 'aptos';
import * as fs from 'fs';
import * as path from 'path';
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com');


// Path to the file storing the private key
const PRIVATE_KEY_PATH = path.join(__dirname, 'private_key.txt');

// Function to save the private key to a file
export const savePrivateKey = (privateKey: Uint8Array) => {
  fs.writeFileSync(PRIVATE_KEY_PATH, Buffer.from(privateKey).toString('hex'));
};

// Function to load the private key from a file
export const loadPrivateKey = (): string | null => {
    if (fs.existsSync(PRIVATE_KEY_PATH)) {
      return fs.readFileSync(PRIVATE_KEY_PATH, 'utf-8');
    }
    return null;
  };
const moduleName = 'CertIss'; // Move module name
const functionName = 'issue_cert'; // Move function name


  let account : Ed25519Account;
  const loadpv =  loadPrivateKey()
    if(loadpv != null){
      // get Existing Account ye foued
    account =  Account.fromPrivateKey({privateKey:new Ed25519PrivateKey(loadpv)});

    }else{
      // generate new one
      account =  Account.generate();
      savePrivateKey(account.privateKey.toUint8Array());

    }


   const aptos = new Aptos();

   export  async function issueCertificate(moduleAddress:string,hash:string ) {
     try{       // To issue certificate call this 
        const moduleName = 'CertModule'; // Move module name
        const functionName = 'issue_certificate'; // Move function name
        
        
      const transaction = await aptos.transaction.build.simple({
        sender: account.accountAddress,
        data: {
          function:
           ` ${moduleAddress}::${moduleName}::${functionName}`,
          // Pass in arguments for the function you specify above
          functionArguments: [
            // details de certif (use hash as Id)
          ],
        },
       })
     const transactionSigned = await aptos.signAndSubmitTransaction({signer:account,transaction:transaction});
      const commitedTransaction =  await aptos.waitForTransaction({transactionHash:transactionSigned.hash});
      
      return commitedTransaction.success
    }
      catch(e){
        return false;
      }
   }
    
 