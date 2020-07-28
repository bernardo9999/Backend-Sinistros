import { join, resolve } from "path";
import { keyStore, identityName, channel, chaincode, networkProfile, identityId } from './env';
import * as fs from 'fs';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { ClientFactory } from '@worldsibu/convector-core';
import { FabcarController } from 'fabcar-cc';
import { FinanceiroController } from 'financeiro-cc';
import { MultasController } from 'multas-cc';


const adapter = new FabricControllerAdapter({
    txTimeout: 300000,
    user: identityName,
    channel,
    chaincode,
    keyStore: resolve(__dirname, keyStore),
    networkProfile: resolve(__dirname, networkProfile)
    // userMspPath: keyStore
});

export const initAdapter = adapter.init();


export const FabcarControllerBackEnd = 
    ClientFactory(FabcarController, adapter);

export const FinanceiroControllerBackEnd = 
    ClientFactory(FinanceiroController, adapter);

export const MultasControllerBackEnd = 
    ClientFactory(MultasController, adapter);


const contextPath = join(keyStore + '/' + identityName);
fs.readFile(contextPath, 'utf8', async function (err, data) {
    if (err) {
        throw new Error('Context in ' + contextPath 
        + ' does not exist. Make sure that path resolves to your key stores folder');
    } else {
        console.log('Context path with cryptographic materials exists');
    }
});

    