import { object, string, number, mixed } from 'yup';

const appointmentsSchema = {
  create: {
    body: object({
      patient_id: number().nullable(),
      doctor_id: number()
        .required('O ID do médico é obrigatório.'),
      procedure_id: number()
        .required('O ID do procedimento é obrigatório.'),
      types_of_service: string()
        .required('O tipo de serviço é obrigatório.')
        .max(255, 'O tipo de serviço deve ter no máximo 255 caracteres.'),
      unit: string()
        .required('A unidade é obrigatória.')
        .max(100, 'A unidade deve ter no máximo 100 caracteres.'),
      description: string()
        .required('A descrição é obrigatória.')
        .max(500, 'A descrição deve ter no máximo 500 caracteres.'),
      status: mixed()
        .oneOf(['ATIVO', 'INATIVO'], 'O status deve ser "ATIVO" ou "INATIVO".')
        .default('ATIVO'),
    }),
  },
  find: {
    params: object({
      id: number().required('O ID do agendamento é obrigatório.'),
    }).noUnknown(),
  },
  list: {
    query: object({
      search: string().max(255).nullable(),
    }).noUnknown(),
  },
  update: {
    body: object({
      patient_id: number().nullable(),
      doctor_id: number().nullable(),
      procedure_id: number().nullable(),
      types_of_service: string().max(255).nullable(),
      unit: string().max(100).nullable(),
      description: string().max(500).nullable(),
      status: mixed()
        .oneOf(['ATIVO', 'INATIVO'], 'O status deve ser "ATIVO" ou "INATIVO".')
        .nullable(),
    }),
    params: object({
      id: number().required('O ID do agendamento é obrigatório.'),
    }).noUnknown(),
  },
  delete: {
    params: object({
      id: number().required('O ID do agendamento é obrigatório.'),
    }).noUnknown(),
  },
};

export default {
  create: object(appointmentsSchema.create),
  find: object(appointmentsSchema.find),
  list: object(appointmentsSchema.list),
  update: object({
    body: appointmentsSchema.update.body,
    params: appointmentsSchema.update.params,
  }),
  delete: object(appointmentsSchema.delete),
};
