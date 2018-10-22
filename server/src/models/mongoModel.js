/**
 * This module leverages mongo queries to search for assets. Since, bigchaindb uses mongodb, querying using
 * mongo queries is more flexible and faster approach to query tons of data (in terms of thousands of records).
 * You can also use bigchaindb-orm (https://github.com/bigchaindb/js-driver-orm) api function - 
 * retrieve(). or for bigchaindb-driver (https://github.com/bigchaindb/js-bigchaindb-driver), you can use searchAssets().
 * But, querying by mongodb is preferable and recommended. 
 */
import MongoClient from 'mongodb';
import { Mongo } from '../constants';

const dbName = Mongo.BDB_DB;

export default class MongoModel {

	constructor(mongoUrl){
		this.url = mongoUrl;
	}
	 
	/**
	 * searches existing assets from bigchaindb "assets" collection
	 * @param {object} dataToSearch - asset data to search
	 */
	async findAsset(dataToSearch){

		const client = await MongoClient.connect(this.url,
				{ useNewUrlParser: true });
	
		//data to search address in bigchaindb
		let _dataToSearchInAssets = {
			"data.address": dataToSearch.address,
			"data.account": dataToSearch.account,
			"data.coinType": dataToSearch.coinType
		}
		
		const db = client.db(dbName);
	
		try {
			 const res = await db.collection(Mongo.ASSET_COLLECTION).find(_dataToSearchInAssets)
			 let listOfAssets= await res.toArray(); //ideally should be 1
	
			 if(listOfAssets.length == 1){
					return listOfAssets[0];
			 }
			 else if(listOfAssets.length == 0){
				 console.log(`Address ${dataToSearch.address} yet doesn't exist for cointype `+
				 `${dataToSearch.coinType} in Bigchaindb Network.`);
			 }
			 else {
				throw new Error(`MongoModelError : There are more than one entries for address`+
				` - ${dataToSearch.address} for the cointype ${dataToSearch.coinType}.`)
			 }
		}
		finally {
				client.close();
		}
	}

	/**
	 * get last transaction for a given asset
	 * @param {string} assetId - id of asset to find transaction
	 */
	async findLatestTx(assetId){
		
		const client = await MongoClient.connect(this.url,
			{ useNewUrlParser: true });
	
		const db = client.db(dbName);
	
		let _query = {
			$or:[
				{"asset.id" : assetId}, 
				{"id" : assetId}
				]
			}
	
		try {
			const res = await db.collection(Mongo.TRANSACTIONS_COLLECTION).find(_query).sort({"_id":1})
			
				let listOfTx= await res.toArray(); 
				
				//check and return if its only CREATE transaction
				if(listOfTx.length == 1
				&& listOfTx[0].operation === 'CREATE'){
					return listOfTx[0];
				}
				//check and return last TRANSFER transaction
				else if (listOfTx.length > 1
					&& listOfTx[listOfTx.length - 1].operation === 'TRANSFER'){
					return listOfTx[listOfTx.length - 1];

				}
				
		}
		finally {
				client.close();
		}
	}

	/**
	 * search metadata for a given asset
	 * @param {string} txId - id of transaction/asset to find metadata for
	 */
	async findAssetMetadata(txId){

		const client = await MongoClient.connect(this.url,
			{ useNewUrlParser: true });

		try {
			const db = client.db(dbName);

			//find metadata for the last transaction
			const res = await db.collection(Mongo.METADATA_COLLECTION).find({id: txId})
			
			let listOfMetadataResp = await res.toArray();  //should be only 1
			let listOfMetadata = listOfMetadataResp.map(obj => obj.metadata);
			
			return listOfMetadata[0];
		}
		finally {
				client.close();
		}
	}
}
