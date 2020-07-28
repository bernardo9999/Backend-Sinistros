import * as yup from 'yup';
import {
  ConvectorModel,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Sinistro extends ConvectorModel<Sinistro> {
  @ReadOnly() @Required()
  public readonly type = 'io.worldsibu.sinistro';

  // Make should not change 
  @ReadOnly() @Required()
  @Validate(yup.string())
  public id: string;

  // Model should not change 
  @Required() @Validate(yup.string())
  public sinistro: string;

    // Model should not change 
    @Required() @Validate(yup.string())
    public ocorrencia: string;

  @Required() @Validate(yup.string())
  public descricao: string;

  @Required() @Validate(yup.string())
  public dataocorrencia: string;

}