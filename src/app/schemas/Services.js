import { object, string, number, date, cpf } from 'yup';

const ServiceSchema = {
  create: {
    body: object({
      patient_id: number(),
      types_of_service: string()
        .max(255, 'O tipo de serviço deve ter no máximo 255 caracteres.')
        .required('O tipo de serviço é obrigatório.'),
      unit: string()
        .max(100, 'A unidade deve ter no máximo 100 caracteres.')
        .required('A unidade é obrigatória.'),
      name: string()
        .max(255, 'O nome deve ter no máximo 255 caracteres.')
        .required('O nome é obrigatório.'),
      email: string()
        .email('Deve ser um e-mail válido.')
        .required('O e-mail é obrigatório.'),
      cpf: string()
        .max(14, 'O CPF deve ter no máximo 14 caracteres.')
        .required('O CPF é obrigatório.'),
      insurance: string().nullable(),
      date_of_birth: string()
        .required('A data de nascimento é obrigatória.')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'A data de nascimento deve estar no formato YYYY-MM-DD.'),
    }),
  },
  find: {
    params: object({
      id: number().required('O ID do serviço é obrigatório.'),
    }).noUnknown(),
  },
  list: {
    query: object({
      search: string().max(255).nullable(),
    }).noUnknown(),
  },
  update: {
    body: object({
      types_of_service: string().max(255).nullable(),
      unit: string().max(100).nullable(),
      description: string().max(500).nullable(),
    }),
    params: object({
      id: number().required('O ID do serviço é obrigatório.'),
    }).noUnknown(),
  },
  delete: {
    params: object({
      id: number().required('O ID do serviço é obrigatório.'),
    }).noUnknown(),
  },
};

export default {
  create: object(ServiceSchema.create),
  find: object(ServiceSchema.find),
  list: object(ServiceSchema.list),
  update: object({
    body: ServiceSchema.update.body,
    params: ServiceSchema.update.params,
  }),
  delete: object(ServiceSchema.delete),
};
