import { object, string, number } from 'yup';

const proceduresSchema = {
  create: {
    body: object({
      procedure_name: string()
        .required('O nome do procedimento é obrigatório.')
        .max(255, 'O nome do procedimento deve ter no máximo 255 caracteres.'),
      types_of_service: string()
        .required('O tipo de serviço é obrigatório.')
        .max(255, 'O tipo de serviço deve ter no máximo 255 caracteres.'),
    }),
  },
  find: {
    params: object({
      id: number().required('O ID do procedimento é obrigatório.'),
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
      types_of_service: string().max(255).nullable(),
    }),
    params: object({
      id: number().required('O ID do procedimento é obrigatório.'),
    }).noUnknown(),
  },
  delete: {
    params: object({
      id: number().required('O ID do procedimento é obrigatório.'),
    }).noUnknown(),
  },
};

export default {
  create: object(proceduresSchema.create),
  find: object(proceduresSchema.find),
  list: object(proceduresSchema.list),
  update: object({
    body: proceduresSchema.update.body,
    params: proceduresSchema.update.params,
  }),
  delete: object(proceduresSchema.delete),
};
