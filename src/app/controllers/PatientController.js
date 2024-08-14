import PatientService from '../services/PatientService';

class PatientController {
    async Create(req, res) {
        try {
            const patient = await PatientService.createPatient(req.body);
            return res.status(201).json(patient);
        } catch (error) {
            return res.status(500).json({ error: 'Ocorreu um erro ao criar o paciente, informações erradas, ou paciente já existe.' });
        }
    }

    async GetAll(req, res) {
        try {
            const patients = await PatientService.getAllPatients();
            return res.status(200).json(patients);
        } catch (error) {
            return res.status(500).json({ error: 'Ocorreu um erro ao buscar os pacientes.' });
        }
    }

    async GetById(req, res) {
        const { id } = req.params;

        try {
            const patient = await PatientService.getPatientById(id);
            if (!patient) {
                return res.status(404).json({ error: 'Paciente não encontrado.' });
            }
            return res.status(200).json(patient);
        } catch (error) {
            return res.status(500).json({ error: 'Ocorreu um erro ao buscar o paciente.' });
        }
    }

    async Update(req, res) {
        const { id } = req.params;

        try {
            const patient = await PatientService.updatePatient(id, req.body);
            return res.status(200).json(patient);
        } catch (error) {
            return res.status(500).json({ error: 'Ocorreu um erro ao atualizar o paciente.' });
        }
    }

    async Delete(req, res) {
        const { id } = req.params;

        try {
            await PatientService.deletePatient(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Ocorreu um erro ao deletar o paciente.' });
        }
    }
}

export default new PatientController();
