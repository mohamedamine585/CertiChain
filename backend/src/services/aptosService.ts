import { Account, AccountAddress, Aptos, AptosConfig, Ed25519PrivateKey,Hex,HexInput, Network, Serializer } from '@aptos-labs/ts-sdk';
import { AptosClient, AptosAccount, TokenClient, TokenTypes, HexString } from 'aptos';
import CertificateIssuance from '../data/transactions';
import { Types } from 'mongoose';
import Certificate from '../data/cert';
import Issuer from '../data/issuer';
 
const aptosConfig = new AptosConfig({ network: Network.MAINNET });
const aptos = new Aptos(aptosConfig);


const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');


/// should be constant
const privateKey = 'YOUR_PRIVATE_KEY';
const server = new AptosAccount(HexString.ensure(privateKey).toUint8Array());

export async function issueCertificateToAptos(payload : any) {
    
    try {
      const transaction = await client.generateTransaction(server.address(), payload);
      const signedTransaction = await client.signTransaction(server, transaction);

      const transactionResult = await client.submitTransaction(signedTransaction);
      return transactionResult;

    } catch (error) {
        console.log(error)
    }
    return null;
}


export async function getCertificateFromAptos(transactionHash : string) {

  try {
    const transaction = await client.getTransactionByHash(transactionHash)
    if(transaction.hash != null){
       const certIssuance = await CertificateIssuance.findById(new Types.ObjectId(transaction.hash))
       if(certIssuance != null){
        const cert = await Certificate.findById(new Types.ObjectId(certIssuance.certId as string))
        const issuer = await Issuer.findById(new Types.ObjectId(certIssuance.issuerId as string))

        return {
          cert,
          issuer,
          certIssuance
        }
       }
    }
  } catch (error) {
    console.log(error)
  }
  return null;
  
}

// Function to query account balance
export async function getAccountBalance(accountAddress: string) {
  try {
    // Fetch account state
    const accountState = await client.getAccountResource(accountAddress,"0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");

    // Extract and log balance
    console.log(accountState.data)

  } catch (error) {
    console.error('Error fetching account balance:', error);
  }
}