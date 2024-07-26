import { Account, AccountAddress, Aptos, AptosConfig, Ed25519PrivateKey,Hex,HexInput, Network, Serializer,AptosRequest, InputViewFunctionData, RawTransaction, TypeTagStruct, TransactionPayloadEntryFunction, EntryFunction, ModuleId, Identifier, isEncodedEntryFunctionArgument, TransactionPayload, MoveVector, MoveValue } from '@aptos-labs/ts-sdk';
import { AptosClient, AptosAccount, TokenClient, TokenTypes, HexString, aptosRequest, Ledger_Infos_Select_Column, TxnBuilderTypes } from 'aptos';
import { ADMIN_ADDRESS } from '../utils/consts';

const aptosConfig = new AptosConfig({ fullnode: "https://fullnode.devnet.aptoslabs.com/v1" });
const aptos = new Aptos(aptosConfig)
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');





const alice = Account.fromPrivateKey({privateKey:new Ed25519PrivateKey(ADMIN_ADDRESS)})

const aliceAptos =   new AptosAccount(new HexString("0xbd13e594df02ddadae74ecbad8f4d53d14d5961230023a006d25ed7bd7f7e605").toUint8Array())


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