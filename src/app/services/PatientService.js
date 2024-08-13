import Patients from '../models/Patients';

class PatientService {
    async createPatient(data) {
        return await Patients.create(data);
    }

    async getAllPatients() {
        return await Patients.findAll();
    }

    async getPatientById(id) {
        return await Patients.findByPk(id);
    }

    async updatePatient(id, data) {
        const patient = await Patients.findByPk(id);
        if (!patient) {
            throw new Error('Paciente não encontrado.');
        }
        return await patient.update(data);
    }

    async deletePatient(id) {
        const patient = await Patients.findByPk(id);
        if (!patient) {
            throw new Error('Paciente não encontrado.');
        }
        await patient.destroy();
    }
}

export default new PatientService();
