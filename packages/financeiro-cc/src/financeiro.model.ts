import * as yup from 'yup';
import {
  ConvectorModel,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Financeiro extends ConvectorModel<Financeiro> {
  @ReadOnly() @Required()
  public readonly type = 'io.worldsibu.financeiro';

  @ReadOnly() @Required()
  @Validate(yup.string())
  public id: string;

  @Required() @Validate(yup.string())
  public placa: string;

  @Required() @Validate(yup.string())
  public datafim: string;

  @Required() @Validate(yup.string())
  public datasinistro: string;

  @Required() @Validate(yup.number())
  public valor: number;

  @ReadOnly() @Required()
  @Validate(yup.string())
  public contrato: string;

  @Required()
  @Validate(yup.string())
  // Reference to a participant id
  public assetOwner: string;
}
