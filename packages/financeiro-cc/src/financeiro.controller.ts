
import * as yup from "yup";
import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  History
} from "@worldsibu/convector-core";

import { Financeiro } from './financeiro.model';
import { Participant } from './participant.model';

@Controller("financeiro")

export class FinanceiroController extends ConvectorController<any> {
  @Invokable()
  public async initFinanceiro() {
    // Mock data
    let mockDataFinanceiro = [
      new Financeiro({
        id: "1",
        placa: "puf-000",
        datafim: "03/11/2020",
        contrato: "134311",
        assetOwner: "pedro",
        datasinistro: "",
        valor: 1500
      }),
      new Financeiro({
        id: "2",
        placa: "erw-000",
        datafim: "09/12/2020",
        contrato: "34356",
        assetOwner: "pedro",
        datasinistro: "",
        valor: 1750
      })
    ]
    await Promise.all(mockDataFinanceiro.map(financeiro => financeiro.save()));
  }

  // Create
  //-------

  @Invokable()
  public async createFinanceiro(@Param(Financeiro) financeiro: Financeiro) {
    await financeiro.save();
  }

  // Update
  //-------

  @Invokable()
  public async updateFinanceiroDataSinistro(
    @Param(yup.string()) id: string,
    @Param(yup.string()) datasinistro: string,
    @Param(yup.string()) assetOwner: string,
  ): Promise<Financeiro> {
    let financeiro = await Financeiro.getOne(id);
    if (!financeiro) {
      throw new Error("Registro nao existe!");
    }
    financeiro.assetOwner = assetOwner;
    financeiro.datasinistro = datasinistro;
    await financeiro.save();
    return financeiro;
  }

  @Invokable()
  public async updateFinanceiroPagoValor(
    @Param(yup.string()) id: string, 
    @Param(yup.string()) assetOwner: string
  ) {
    let financeiro = await Financeiro.getOne(id);
    if (!financeiro) {
      throw new Error("Registro nao existe!");
    }
    // Proximo codigo deve ser ativo na utilização do transfer
    // const owner = await Participant.getOne(financeiro.assetOwner);
    // console.log('Asset owner do financeiro:');
    // console.log(owner);

    // if (!owner || !owner.id || !owner.identities) {
    //   throw new Error('Este participante nao existe no blockchain');
    // }
    // const ownerCurrentIdentity = owner.identities.filter(identity => identity.status === true)[0];
    // if (ownerCurrentIdentity.fingerprint === this.sender) {
    //   console.log('Esta identidade pode atualizar o registro de financeiro');
    financeiro.assetOwner = assetOwner;
    financeiro.valor = 0;
    return await financeiro.save();
  }

  @Invokable()
  public async transferAssetOwnerFinanceiro(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    to: string
  ) {
    let financeiro = await Financeiro.getOne(id);

    if (!financeiro || !financeiro.id) {
      throw new Error(`Carro com id ${id} nao existe`);
    }
    const owner = await Participant.getOne(financeiro.assetOwner);

    if (!owner || !owner.id || !owner.identities) {
      throw new Error('Este participante nao existe no blockchain');
    }

    const ownerCurrentIdentity = owner.identities.filter(identity => identity.status === true)[0];
    if (ownerCurrentIdentity.fingerprint === this.sender) {
      financeiro.assetOwner = to;
      await financeiro.save();
    } else {
      throw new Error(`Identity ${this.sender} nao esta autorizado a transferrir, somente ${owner.name} ${ownerCurrentIdentity.fingerprint} pode`);
    }
  }

  // Delete
  //-------

  @Invokable()
  public async deleteOneFinanceiro(@Param(yup.string()) id: string) {
    let car = await Financeiro.getOne(id);
    if (!car) {
      throw new Error("Carro nao existe!");
    }
    await car.delete(car.id);
  }

  // Read
  //-------

  @Invokable()
  public async getOneFinanceiro(
    @Param(yup.string()) id: string
  ): Promise<Financeiro> {
    let financeiro = await Financeiro.getOne(id);
    if (!financeiro) {
      throw new Error("Carro nao existe!");
    }
    return financeiro;
  }

  @Invokable()
  public async getAllFinanceiro(): Promise<Financeiro[]> {
    let financeiro = await Financeiro.getAll();
    return financeiro;
  }

  @Invokable()
  public async getHistoryFinanceiro(@Param(yup.string()) id: string): Promise<History<Financeiro>[]> {
    let financeiro = await Financeiro.getOne(id);
    if (!financeiro) {
      throw new Error("Carro nao existe!");
    }

    return await financeiro.history();
  }
  //-------------------------- PARTICIPANTES --------------------------

  @Invokable()
  public async registerParticipant(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    name: string
  ) {
    // Retrieve to see if exists
    const existing = await Participant.getOne(id);

    if (!existing || !existing.id) {
      let participant = new Participant();
      participant.id = id;
      participant.name = name || id;
      participant.msp = this.tx.identity.getMSPID();
      // Create a new identity
      participant.identities = [{
        fingerprint: this.sender,
        status: true
      }];
      console.log(JSON.stringify(participant));
      await participant.save();
    } else {
      throw new Error('Identity exists already, please call changeIdentity fn for updates');
    }
  }
  @Invokable()
  public async changeParticipantIdentity(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    newIdentity: string
  ) {
    // Check permissions
    let isAdmin = this.tx.identity.getAttributeValue('admin');
    console.log(this.tx.identity);
    console.log(isAdmin);
    let requesterMSP = this.tx.identity.getMSPID();

    // Retrieve to see if exists
    const existing = await Participant.getOne(id);
    console.log('Existing participant:');
    console.log(existing);
    if (!existing || !existing.id) {
      throw new Error('No identity exists with that ID');
    }

    console.log(`existing.msp=${existing.msp} requesterMSP=${requesterMSP}`);
    if (existing.msp != requesterMSP) {
      throw new Error('Unathorized. MSPs do not match');
    }

    console.log(`isAdmin=${isAdmin}`);
    if (!isAdmin) {
      throw new Error('Unathorized. Requester identity is not an admin');
    }

    // Disable previous identities!
    existing.identities = existing.identities.map(identity => {
      identity.status = false;
      return identity;
    });

    // Set the enrolling identity 
    existing.identities.push({
      fingerprint: newIdentity,
      status: true
    });
    await existing.save();
  }
  @Invokable()
  public async getOneParticipant(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Participant.getOne(id);
    if (!existing || !existing.id) {
      throw new Error(`No identity exists with that ID ${id}`);
    }
    return existing;
  }

}