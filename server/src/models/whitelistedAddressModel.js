/**
 * this module implements cryptaldash business logic for different
 * operations to manage whitelisted addresses
 */
import { CONFIDENCE_NEEDED, MONGODB_URL} from 'babel-dotenv';
import MongoModel from './mongoModel';
import BigchaindbModel from './bigchaindbModel';
import { State } from '../constants';

export default class WhitelistedAddressModel {
    
    constructor(){
        this.bdb = new BigchaindbModel();
        this.mongo = new MongoModel(MONGODB_URL);
    }

    /**
     * activate/store address into bigchaindb network
     * @param {object} dataToActivate - object containing {creator, cointype,
     * address, account} details needed to store address
     */
     async activateAddress(dataToActivate){
        //get asset from mongodb based on search criteria
        let asset = await this.mongo.findAsset(dataToActivate);

        //prepare metadata to be stored in 'metadata' collection
        let metadata = {};
        metadata.lastModifiedOn = new Date();

        //check if asset exists
        if(asset){  //asset exists (already CREATED) so we perform TRANSFER operation
            //get last transaction from mongodb
            let lastTx = await this.mongo.findLatestTx(asset.id);

            //get metadata for this last transaction from mongodb
            let metadata = await this.mongo.findAssetMetadata(lastTx.id);

            
            //asset should already be INACTIVE status
            if(metadata.status === State.INACTIVE){

                metadata.status = State.ACTIVE;
                //append this updated metadata in bigchaindb
                let updatedAsset = await this.bdb.append(lastTx, metadata);
                return updatedAsset;
            }
            else{
                throw new Error(`CryptaldashError: ${asset.data.address} already exists and is in ACTIVE state.`);
            }
            
        }
        else {  //asset needs to be CREATED
            //prepare asset to be stored in 'assets' collection
            let asset = Object.assign({}, dataToActivate);
            //since it's a new asset, address will always be ACTIVE
            metadata.status = State.ACTIVE;
            //create new assets and metadata in bigchaindb
            let createdAsset = await this.bdb.create(asset, metadata);
            return createdAsset;
    
        }
       throw new Error(`CryptaldashError:Address ${dataToActivate.address} neither found nor created.`);
    }

     /**
     * search whitelisted address from bigchaindb network via mongodb queries
     * @param {object} dataToSearch - object with {cointype, 
     * address, account} details needed to search address
     * @param {string} mongoUrl - optional mongoUrl to connect to
     */
   async searchForAddress(dataToSearch, mongoUrl){

        let mongo = new MongoModel(mongoUrl);
        //get asset from mongodb based on search criteria
        let asset = await mongo.findAsset(dataToSearch);

        //check if asset exists
        if(asset){  

            //get last transaction from mongodb
            let lastTx = await mongo.findLatestTx(asset.id);

            //get metadata for this last transaction from mongodb
            let metadata = await mongo.findAssetMetadata(lastTx.id);

            //asset should be in ACTIVE state
            if(metadata.status === State.ACTIVE){
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }

    /**
     * search stored address from bigchaindb network via mongodb queries
     * @param {object} dataToSearch - object with {cointype, 
     * address, account} details needed to search address
     * @param {array} nodesInNetwork - no. of active nodes in bigchaindb network 
     * @param {number} currentConfidence - (optional) current confidence level of address found
     * across network
     * @param {number} confidenceLevelPerNode - (optional) confidence level of each node in a network
     */
    async searchForAddressConsensus(dataToSearch, nodesInNetwork, currentConfidence = 0, confidenceLevelPerNode = 0){
        
        if(confidenceLevelPerNode === 0){
            //how much confidence level each node can contribute
            confidenceLevelPerNode = Math.ceil(100/nodesInNetwork.length);
        }
    
        //if all nodes have been queried, respond
        if(nodesInNetwork.length == 0){
            return currentConfidence;
        }
            
        //how much confidence level we still require
        let confidenceLevelStillNeeded = CONFIDENCE_NEEDED - currentConfidence;
    
        //calculate count of nodes that fulfils our CONFIDENCE_NEEDED requirement
        let totalNodesNeededForConfidence = Math.ceil(confidenceLevelStillNeeded / confidenceLevelPerNode);
        
        //search address in needed nodes
        let listOfNodesNeeded = nodesInNetwork.slice(0, totalNodesNeededForConfidence)
       
        //remove already queried nodes
        nodesInNetwork = nodesInNetwork.slice(totalNodesNeededForConfidence);
    
        await Promise.all(listOfNodesNeeded.map(async (node) => {
            //check mongodb of each node 
            let mongoUrl = "mongodb://" + node + ":27017";
            let isAddressFound = await this.searchForAddress(dataToSearch, mongoUrl);

            if(isAddressFound){
                currentConfidence += confidenceLevelPerNode;
            }
        }));
    
        if(currentConfidence >= CONFIDENCE_NEEDED){
            return currentConfidence;
        }
        else {
            //recurse if confidence level is below confidenceNeeded to query remaining nodes
            this.searchForAddressConsensus(dataToSearch, nodesInNetwork, currentConfidence, confidenceLevelPerNode);
        }
    
    }

    /**
     * deactivate address from bigchaindb network
     * @param {object} dataToDeactivate - object with {creator, cointype,
     * address, account} details needed to deactivate address
     */
    async deactivateAddress(dataToDeactivate){
        //get asset from mongodb based on search criteria
        let asset = await this.mongo.findAsset(dataToDeactivate);
       
        //prepare metadata to be stored in 'metadata' collection
        let metadata = {};
        metadata.lastModifiedOn = new Date();

        //check if asset exists
        if(asset){ 
            //get last transaction from mongodb
            let lastTx = await this.mongo.findLatestTx(asset.id);

            //get metadata for this last transaction from mongodb
            let metadata = await this.mongo.findAssetMetadata(lastTx.id);
            
            //asset should already be ACTIVE status
            if(metadata.status === State.ACTIVE){

                metadata.status = State.INACTIVE;
                //append this updated metadata in bigchaindb
                let updatedAsset = await this.bdb.append(lastTx, metadata);
                return updatedAsset;
            }
            else{
                throw new Error(`CryptaldashError : ${dataToDeactivate.address} is already in INACTIVE state.`);
            }  
        }
        else { 
            throw new Error(`CryptaldashError : Address ${dataToDeactivate.address} could not be deactivated`+
            ` because it doesn't exists.`);
        }
        throw new Error(`CryptaldashError : Address ${dataToDeactivate.address} neither found nor deactivated.`);
    }
}

