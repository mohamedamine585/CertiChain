import { Account, AccountAddress, Aptos, AptosConfig, Ed25519PrivateKey, RawTransaction, TransactionPayload } from '@aptos-labs/ts-sdk';
import { AptosClient, AptosAccount, TokenClient, TokenTypes, HexString, aptosRequest, Ledger_Infos_Select_Column, TxnBuilderTypes } from 'aptos';
import { ADMIN_ADDRESS } from '../utils/consts';
import { aw } from '@aptos-labs/ts-sdk/dist/common/accountAddress-D9blTwwp';

const aptosConfig = new AptosConfig({ fullnode: "https://fullnode.devnet.aptoslabs.com/v1" });
const aptos = new Aptos(aptosConfig)
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');





const admin = Account.fromPrivateKey({privateKey:new Ed25519PrivateKey(ADMIN_ADDRESS)})


export async function estimateTransactionCost() : Promise<number>{
  return 1000;
}

export async function fundIssuer(toAddress:string,amount : number) {
 
  const moduleAddress = '0x1'; // Move module address
  const moduleName = 'coin'; // Move module name
  const functionName = 'transfer'; // Move function nam
  const transaction = await aptos.transaction.build.simple({
      sender: admin.accountAddress,
      data: {
        function:
         ` ${moduleAddress}::${moduleName}::${functionName}`,
        // Pass in arguments for the function you specify above
        functionArguments: [
          toAddress,amount
          // details de certif
        ],
      },
     })


  const signedTransaction =await aptos.signAndSubmitTransaction({signer:admin,transaction:transaction});
  const commitedTransaction =  await aptos.waitForTransaction({transactionHash:signedTransaction.hash});
    
  return commitedTransaction.success

 } 

export async function getCertificateFromAptos(certficateIssuanceId: String) {

  try {
    try {
 
   
        // Call the function
        const result = await client.view(
             {
              arguments:[ADMIN_ADDRESS,certficateIssuanceId],
              function:   `${ADMIN_ADDRESS}::CertStore::get_certificate_issuance`,
              type_arguments: [],
     
             }
            
        );

        
        return {
          certificateId: result.at(0),
          certificateIssuanceId: result.at(1),
          ReciepientName: result.at(2),
          ReciepientEmail: result.at(3),
          ReciepientPhotoUrl: result.at(4),
          certificateUrl: result.at(5),
          certificateDesc: result.at(6),
          issuanceDate: result.at(7),


        }
    } catch (error) {
        console.error('Error calling function:', error);
        return null;
    }

  } catch (error) {
    console.log(error)
  }
  return null;
  
}