import { object, string, date } from 'yup';

const schema = {
  create: {
    body: object({
      name: string()
        .max(100, 'O nome deve ter no máximo 100 caracteres.')
        .required('O nome é obrigatório.'),
      email: string()
        .email('O e-mail deve ser um endereço de e-mail válido.')
        .max(255, 'O e-mail deve ter no máximo 255 caracteres.')
        .required('O e-mail é obrigatório.'),
      cpf: string()
        .length(11, 'O CPF deve ter exatamente 11 dígitos.')
        .matches(/^\d+$/, 'O CPF deve conter apenas números.')
        .required('O CPF é obrigatório.'),
      insurance: string()
        .max(100, 'O seguro deve ter no máximo 100 caracteres.')
        .required('O seguro é obrigatório.'),
      date_of_birth: date()
        .max(new Date(), 'A data de nascimento não pode ser no futuro.')
        .required('A data de nascimento é obrigatória.'),
    }),
  },
};

export default {
  create: object(schema.create.body),
};
