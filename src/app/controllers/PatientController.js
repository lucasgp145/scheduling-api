import Patients from '../models/Patients';

class PatientController {
    async Create(req, res) {
        try {
            const { id, name, email, cpf, insurance, date_of_birth } = await Patients.create(req.body);
            return res.status(201).json({ id, name, email, cpf, insurance, date_of_birth });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ocorreu um erro ao criar o paciente, informações erradas, ou paciente já existe.' });
        }
    }

    async GetAll(req, res) {
        try {
            const patients = await Patients.findAll();
            return res.status(200).json(patients);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ocorreu um erro ao buscar os pacientes.' });
        }
    }

    async GetById(req, res) {
        const { id } = req.params;

        try {
            const patient = await Patients.findByPk(id);
            if (!patient) {
                return res.status(404).json({ error: 'Paciente não encontrado.' });
            }
            return res.status(200).json(patient);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ocorreu um erro ao buscar o paciente.' });
        }
    }

    async Update(req, res) {
        const { id } = req.params;

        try {
            const patient = await Patients.findByPk(id);
            if (!patient) {
                return res.status(404).json({ error: 'Paciente não encontrado.' });
            }

            await patient.update(req.body);
            return res.status(200).json(patient);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ocorreu um erro ao atualizar o paciente.' });
        }
    }

    async Delete(req, res) {
        const { id } = req.params;

        try {
            const patient = await Patients.findByPk(id);
            if (!patient) {
                return res.status(404).json({ error: 'Paciente não encontrado.' });
            }

            await patient.destroy();
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ocorreu um erro ao deletar o paciente.' });
        }
    }
}

export default new PatientController();
