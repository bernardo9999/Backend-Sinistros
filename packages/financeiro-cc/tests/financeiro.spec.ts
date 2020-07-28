// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Financeiro, FinanceiroController } from '../src';

describe('Financeiro', () => {
  let adapter: MockControllerAdapter;
  let financeiroCtrl: ConvectorControllerClient<FinanceiroController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    financeiroCtrl = ClientFactory(FinanceiroController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'FinanceiroController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Financeiro({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await financeiroCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Financeiro>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});