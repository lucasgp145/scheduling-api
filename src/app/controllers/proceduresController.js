import proceduresService from '../services/preceduresService';

class ProceduresController {
    async Create(req, res) {
        try {
            const procedure = await proceduresService.createProcedure(req.body);
            res.status(201).json(procedure);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async GetAll(req, res) {
        try {
            const procedures = await proceduresService.getAllProcedures();
            res.status(200).json(procedures);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao buscar os procedimentos.' });
        }
    }

    async GetById(req, res) {
        try {
            const { id } = req.params;
            const procedure = await proceduresService.getProcedureById(id);
            res.status(200).json(procedure);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async Update(req, res) {
        try {
            const { id } = req.params;
            const procedure = await proceduresService.updateProcedure(id, req.body);
            res.status(200).json(procedure);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async Delete(req, res) {
        try {
            const { id } = req.params;
            await proceduresService.deleteProcedure(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

export default new ProceduresController();
