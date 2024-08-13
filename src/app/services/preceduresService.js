import Procedures from '../models/procedures'; // Ajustado para importar o modelo correto

class ProceduresService {
    async createProcedure(data) {
        const { procedure_name, types_of_service } = data;

        if (!procedure_name || !types_of_service) {
            throw new Error('Os campos procedure_name e types_of_service são obrigatórios.');
        }

        return await Procedures.create({
            procedure_name,
            types_of_service,
        });
    }

    async getAllProcedures() {
        return await Procedures.findAll();
    }

    async getProcedureById(id) {
        const procedure = await Procedures.findByPk(id);
        if (!procedure) {
            throw new Error('Procedimento não encontrado.');
        }
        return procedure;
    }

    async updateProcedure(id, data) {
        const procedure = await Procedures.findByPk(id);
        if (!procedure) {
            throw new Error('Procedimento não encontrado.');
        }

        procedure.procedure_name = data.procedure_name || procedure.procedure_name;
        procedure.types_of_service = data.types_of_service || procedure.types_of_service;

        await procedure.save();
        return procedure;
    }

    async deleteProcedure(id) {
        const procedure = await Procedures.findByPk(id);
        if (!procedure) {
            throw new Error('Procedimento não encontrado.');
        }

        await procedure.destroy();
    }
}

export default new ProceduresService();
