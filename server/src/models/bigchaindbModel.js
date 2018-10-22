/**
 * this module is a model containing functions to commit transactions in bigchaindb network
 * It uses 'bigchaindb-driver'(https://github.com/bigchaindb/js-bigchaindb-driver) to commit transactions into bigchaindb nodes, but there is
 * also another variation that is built on top of this driver, that can be used to perform
 * CRAB operations. Check it out - https://github.com/bigchaindb/js-driver-orm
 */
import { Transaction, Connection } from 'bigchaindb-driver';
import { BDB_NODE_URL, 
        BDB_APP_ID, 
        BDB_APP_KEY, 
        PUB_KEY,
        PRIV_KEY } from 'babel-dotenv';

export default class BigchainDBModel {

    constructor(){
        this.url = BDB_NODE_URL;
        this.appKey =  BDB_APP_KEY;
        this.appId = BDB_APP_ID;
        this.keypair = {
            publicKey: PUB_KEY,
            privateKey: PRIV_KEY
        };
    }

    /**
     * commits the CREATE transaction in a bigchaindb network
     * @param {object} assetData - data to store in 'assets' collection (immutable) 
     * @param {object} metaData  - data to store in 'metadata' collection (mutable)
     */
    async create(assetData, metaData){
        
        // Construct a transaction payload
        const createTx = Transaction.makeCreateTransaction(
            //asset data cannot be changed later
            assetData,
            //metadata can be updated
            metaData,
            //ownership of this asset can be assigned here
            [ Transaction.makeOutput(
                    Transaction.makeEd25519Condition(this.keypair.publicKey))
            ],
            //issuer
            this.keypair.publicKey
        )

        // Sign the transaction with private keys
        const txSigned = Transaction.signTransaction(createTx, this.keypair.privateKey)

        // Send the transaction off to BigchainDB
        const conn = new Connection(this.url,{
            app_id: this.appId,
            app_key: this.appKey
        });
        let createdTx = await conn.postTransactionCommit(txSigned);
        return createdTx;
    }

    /**
     * commits TRANSFER transaction into Bigchaindb network
     * @param {object} createdTx - existing transaction on which this transaction will be appended to
     * @param {object} metadata - metadata object containing mutable values like status, lastmodifiedOn etc 
     */
    async append(createdTx, metadata){

        const transferTx = Transaction.makeTransferTransaction(
                // The output index 0 is the one that is being spent
                [{
                    tx: createdTx,
                    output_index: 0
                }],
                [Transaction.makeOutput(
                    Transaction.makeEd25519Condition(
                        this.keypair.publicKey))],
                metadata
            );

        // Sign with the key of the owner (in this case this api )
        const signedTransfer = Transaction
            .signTransaction(transferTx, this.keypair.privateKey)
        
       
        // Send the transaction off to BigchainDB
         const conn = new Connection(this.url,{
            app_id: this.appId,
            app_key: this.appKey
        });
   
        let transfferedTx = await conn.postTransactionCommit(signedTransfer);
        return transfferedTx;
    }
    
}


