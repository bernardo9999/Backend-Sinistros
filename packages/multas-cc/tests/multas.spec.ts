// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Multas, MultasController } from '../src';

describe('Multas', () => {
  let adapter: MockControllerAdapter;
  let multasCtrl: ConvectorControllerClient<MultasController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    multasCtrl = ClientFactory(MultasController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'MultasController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Multas({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await multasCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Multas>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});