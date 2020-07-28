import * as dotenv from 'dotenv';
dotenv.config();

const homedir = require('os').homedir();

export const chaincode = process.env.CHAINCODE || 'financeiro';
export const channel = process.env.CHANNEL || 'ch1';

// Automatically extract credentials by the user id
// If no .env config is found, fallback to Hurley defaults
export const identityId = process.env.IDENTITYID || 'admin';
export const identityName = process.env.IDENTITY || 'admin';
export const identityOrg = process.env.ORG || 'org2';

export const keyStore = process.env.KEYSTORE || '/' + homedir + '/hyperledger-fabric-network/.hfc-' + identityOrg;
export const networkProfile = process.env.NETWORKPROFILE || '/'+ homedir + 
'/hyperledger-fabric-network/network-profiles/' + 
identityOrg + '.network-profile.yaml';

export const port = process.env.PORT || 8001;

// Default to common values
export const couchDBView = process.env.COUCHDBVIEW || 'ch1_financeiro';
export const couchDBProtocol = process.env.COUCHDB_PROTOCOL || 'http';
export const couchDBHost = process.env.COUCHDB_HOST || 'localhost';
export const couchDBPort = process.env.COUCHDB_PORT || 5184;