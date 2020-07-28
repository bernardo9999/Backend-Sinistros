
import * as yup from "yup";
import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  History
} from "@worldsibu/convector-core";

import { Multas } from "./multas.model";

@Controller("multas")

export class MultasController extends ConvectorController<any> {
  @Invokable()
  public async initMultas() {
    // Mock data
    let mockDataMultas = [
      new Multas({
        id: "1",
        placa: "puf-000",
        estado: "SP",
        data: "17/01/2020",
        valor: 100
      }),
      new Multas({
        id: "2",
        placa: "erw-000",
        estado: "SP",
        data: "22/08/2019",
        valor: 500
      }),
      new Multas({
        id: "5",
        placa: "brt-000",
        estado: "RJ",
        data: "02/04/2018",
        valor: 1200
      })]
    await Promise.all(mockDataMultas.map(multas => multas.save()));
  }

  // Create
  //-------

  @Invokable()
  public async createMultas(@Param(Multas) multas: Multas) {
    await multas.save();
  }

  // Read
  //-------

  @Invokable()
  public async getOneMultas(
    @Param(yup.string()) id: string
  ): Promise<Multas> {
    let multas = await Multas.getOne(id);
    if (!multas) {
      throw new Error("Carro nao existe!");
    }
    return multas;
  }

  @Invokable()
  public async updateMultasPagoValor(
    @Param(yup.string()) id: string
  ) {
    let multas = await Multas.getOne(id);
    if (multas.id) {
      multas.valor = 0;
      return await multas.save();
    } else {
      throw new Error("Carro nao possui registro de multas");
    }
  }
  @Invokable()
  public async getAllMultas(): Promise<Multas[]> {
    let multas = await Multas.getAll();
    return multas;
  }
  @Invokable()
  public async getHistoryMultas(@Param(yup.string()) id: string): Promise<History<Multas>[]> {
    let multas = await Multas.getOne(id);
    if (!multas) {
      throw new Error("Carro nao existe!");
    }

    return await multas.history();
  }
}