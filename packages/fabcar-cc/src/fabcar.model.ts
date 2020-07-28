import * as yup from "yup";
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from "@worldsibu/convector-core-model";
export type TSinistro = {
  id: string;
  sinistro: string;
  ocorrencia: string;
  descricao: string;
};

export class Fabcar extends ConvectorModel<Fabcar> {
  @ReadOnly()
  @Required()
  public readonly type = "io.worldsibu.fabcar";

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public marca: string;

  @Required() @Validate(yup.string())
  public placa: string;

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public modelo: string;

  @Required()
  @Validate(yup.string())
  public cor: string;

  @Required()
  @Validate(yup.boolean())
  public alienado: boolean;

  @Required()
  @Validate(yup.array())
  public sinistros: Array<TSinistro>;

  @Required()
  @Validate(yup.string())
  public datafim: string;

  @Required()
  @Validate(yup.number())
  public  valor: number;

  @Required()
  @Validate(yup.number())
  public  multas: number;

  @Required()
  @Validate(yup.string())
  public proprietario: string;

  @Required()
  @Validate(yup.string())
  // Reference to a participant id
  public assetOwner: string;
}