import * as yup from 'yup';
import {
  ConvectorModel,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Multas extends ConvectorModel<Multas> {
  @ReadOnly() @Required()
  public readonly type = 'io.worldsibu.financeiro';

  @ReadOnly() @Required()
  @Validate(yup.string())
  public id: string;

  @Required() @Validate(yup.string())
  public estado: string;

  @Required() @Validate(yup.string())
  public placa: string;

  @Required() @Validate(yup.string())
  public data: string;

  @Required() @Validate(yup.number())
  public valor: number;
}
