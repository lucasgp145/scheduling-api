import { object, string, number } from 'yup';

const doctorsSchema = {
  create: {
    body: object({
      name: string()
        .required('O nome é obrigatório.')
        .max(255, 'O nome deve ter no máximo 255 caracteres.'),
      council: string()
        .required('O conselho é obrigatório.')
        .max(100, 'O conselho deve ter no máximo 100 caracteres.'),
      cpf: string()
        .required('O CPF é obrigatório.')
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, 'O CPF deve estar no formato válido: 000.000.000-00 ou 00000000000.'),
    }),
  },
  find: {
    params: object({
      id: number().required('O ID do médico é obrigatório.'),
    }).noUnknown(),
  },
  list: {
    query: object({
      search: string().max(255).nullable(),
    }).noUnknown(),
  },
  update: {
    body: object({
      name: string().max(255).nullable(),
      council: string().max(100).nullable(),
      cpf: string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, 'O CPF deve estar no formato válido: 000.000.000-00 ou 00000000000.').nullable(),
    }),
    params: object({
      id: number().required('O ID do médico é obrigatório.'),
    }).noUnknown(),
  },
  delete: {
    params: object({
      id: number().required('O ID do médico é obrigatório.'),
    }).noUnknown(),
  },
};

export default {
  create: object(doctorsSchema.create),
  find: object(doctorsSchema.find),
  list: object(doctorsSchema.list),
  update: object({
    body: doctorsSchema.update.body,
    params: doctorsSchema.update.params,
  }),
  delete: object(doctorsSchema.delete),
};
