/**
 * this module contains enums and constants for keywords used in this api
 */
const Mongo = {
    ASSET_COLLECTION : 'assets',
    TRANSACTIONS_COLLECTION : 'transactions',
    METADATA_COLLECTION : 'metadata',
    BDB_DB : 'bigchain'
};

const State = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
}
 
const Operations = {
    CREATE: 'CREATE',
    TRANSFER: 'TRANSFER'
}

export
{
   Mongo,
   State,
   Operations
}