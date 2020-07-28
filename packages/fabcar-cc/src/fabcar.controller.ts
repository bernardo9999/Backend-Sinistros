import * as yup from "yup";
import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  History
} from "@worldsibu/convector-core";

import { Fabcar } from "./fabcar.model";
import { Sinistro } from "./sinistro.model";
import { Participant } from './participant.model';

@Controller("fabcar")

export class FabcarController extends ConvectorController<any> {
  @Invokable()
  public async initCar() {
    // Mock data
    let mockDataCar = [
      new Fabcar({
        id: "1",
        placa: "puf-000",
        marca: "Toyota",
        modelo: "Prius",
        cor: "blue",
        sinistros: [],
        datafim: "03/02/2020",
        valor: 0,
        multas: 0,
        alienado: false,
        proprietario: "Tomoko",
        assetOwner: "joao"
      }),
      new Fabcar({
        id: "2",
        placa: "erw-000",
        marca: "Ford",
        modelo: "Mustang",
        cor: "red",
        sinistros: [],
        datafim: "09/11/2020",
        valor: 320,
        multas: 0,
        alienado: true,
        proprietario: "Brad",
        assetOwner: "joao"
      }),
      new Fabcar({
        id: "3",
        placa: "ldj-000",
        marca: "Tesla",
        modelo: "S",
        cor: "black",
        sinistros: [],
        datafim: "15/11/2020",
        valor: 140,
        multas: 750,
        alienado: true,
        proprietario: "Adriana",
        assetOwner: "joao"
      }),
      new Fabcar({
        id: "4",
        placa: "rts-000",
        marca: "Peugeot",
        modelo: "205",
        cor: "purple",
        sinistros: [],
        datafim: "23/03/2020",
        valor: 800,
        multas: 50,
        alienado: true,
        proprietario: "Michel",
        assetOwner: "joao"
      }),
      new Fabcar({
        id: "5",
        placa: "brt-000",
        marca: "Chery",
        modelo: "S22L",
        cor: "white",
        sinistros: [],
        datafim: "29/05/2020",
        valor: 1600,
        multas: 50,
        alienado: true,
        proprietario: "Aarav",
        assetOwner: "joao"
      }),
      new Fabcar({
        id: "6",
        placa: "asd-000",
        marca: "Fiat",
        modelo: "Punto",
        cor: "violet",
        sinistros: [],
        datafim: "09/03/2020",
        valor: 180,
        multas: 250,
        alienado: true,
        proprietario: "Pari",
        assetOwner: "joao"
      }),
      new Fabcar({
        id: "7",
        placa: "okd-000",
        marca: "Tata",
        modelo: "Nano",
        cor: "indigo",
        sinistros: [],
        datafim: "07/12/2020",
        valor: 2300,
        multas: 150,
        alienado: true,
        proprietario: "Valeria",
        assetOwner: "joao"

      }),
      new Fabcar({
        id: "8",
        placa: "fhw-000",
        marca: "Holden",
        modelo: "Barina",
        cor: "brown",
        sinistros: [],
        datafim: "16/05/2020",
        valor: 1100,
        multas: 50,
        alienado: true,
        proprietario: "Shotaro",
        assetOwner: "joao"
      })
    ];
    await Promise.all(mockDataCar.map(car => car.save()));
  }

  //-------------------------- CARRO --------------------------

  // Create
  //-------
  @Invokable()
  public async createCar(@Param(Fabcar) car: Fabcar, @Param(yup.string())
  ownerID: string) {
    car.assetOwner = ownerID;
    await car.save();
  }

  // Delete
  //-------
  @Invokable()
  public async deleteOneCar(@Param(yup.string()) id: string) {
    let car = await Fabcar.getOne(id);
    if (!car) {
      throw new Error("Carro nao existe!");
    }
    await car.delete(car.id);
  }

  // Update
  //-------
  @Invokable()
  public async updateProprietarioCar(
    @Param(yup.string()) id: string,
    @Param(yup.string()) proprietario: string
  ): Promise<Fabcar> {
    let car = await Fabcar.getOne(id);
    if (!car) {
      throw new Error("Carro nao existe!");
    }
    const owner = await Participant.getOne(car.assetOwner);
    console.log('Asset owner do carro:');
    console.log(owner);

    if (!owner || !owner.id || !owner.identities) {
      throw new Error('Este participante nao existe no blockchain');
    }
    const ownerCurrentIdentity = owner.identities.filter(identity => identity.status === true)[0];
    if (ownerCurrentIdentity.fingerprint === this.sender) {
      console.log('Esta identidade pode atualizar o carro');
      car.proprietario = proprietario;
      await car.save();
      return car;
    }
  }

  @Invokable()
  public async transferAssetOwnerCar(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    to: string
  ) {
    let car = await Fabcar.getOne(id);

    if (!car || !car.id) {
      throw new Error(`Carro com id ${id} nao existe`);
    }
    const owner = await Participant.getOne(car.assetOwner);

    if (!owner || !owner.id || !owner.identities) {
      throw new Error('Este participante nao existe no blockchain');
    }

    const ownerCurrentIdentity = owner.identities.filter(identity => identity.status === true)[0];
    if (ownerCurrentIdentity.fingerprint === this.sender) {
      car.assetOwner = to;
      await car.save();
    } else {
      throw new Error(`Identity ${this.sender} nao esta autorizado a transferrir, somente ${owner.name} ${ownerCurrentIdentity.fingerprint} pode`);
    }
  }

  // Read
  //-------
  @Invokable()
  public async getOneCar(@Param(yup.string()) id: string) {
    let car = await Fabcar.getOne(id);
    if (!car) {
      throw new Error("Carro nao existe!");
    }
    return car;
  }

  @Invokable()
  public async getAllCar(): Promise<Fabcar[]> {
    let car = await Fabcar.getAll();
    return car;
  }

  @Invokable()
  public async getHistoryCar(@Param(yup.string()) id: string): Promise<History<Fabcar>[]> {
    let car = await Fabcar.getOne(id);
    if (!car) {
      throw new Error("Carro nao existe!");
    }

    return await car.history();
  }

  //-------------------------- SINISTRO --------------------------

  // Create
  //-------

  @Invokable()
  public async createSinistro(@Param(yup.object()) data: Sinistro) {
    const sinistro = new Sinistro(data);
    await sinistro.save(sinistro);
    const { id } = data; // id = Renavam
    let car = await Fabcar.getOne(id);
    if (car.id) {
      car.sinistros.push(sinistro);
      await car.save();
    } else {
      throw new Error("Carro nao existe!");
    }
    return car.id, sinistro;
  }

  // Read
  //-------

  @Invokable()
  public async getOneSinistro(@Param(yup.string()) id: string) {
    let car = await Fabcar.getOne(id);
    if (!car) {
      throw new Error("Carro nao existe!");
    }
    let onesinistro = car.sinistros.map(car => {
      car;
      return car;
    });
    return onesinistro;
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