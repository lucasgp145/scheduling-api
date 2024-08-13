import { Op } from 'sequelize';
import Doctors from '../models/doctors'; // Ajustado para importar o modelo correto

class DoctorsService {
    async createDoctor(data) {
        const { name, council, cpf } = data;

        if (!name || !council || !cpf) {
            throw new Error('Os campos name, council e cpf são obrigatórios.');
        }

        const existingDoctor = await Doctors.findOne({
            where: {
                cpf
            }
        });

        if (existingDoctor) {
            throw new Error('Já existe um médico cadastrado com esse CPF.');
        }

        return await Doctors.create({
            name,
            council,
            cpf,
        });
    }

    async getAllDoctors() {
        return await Doctors.findAll();
    }

    async getDoctorById(id) {
        const doctor = await Doctors.findByPk(id);
        if (!doctor) {
            throw new Error('Médico não encontrado.');
        }
        return doctor;
    }

    async updateDoctor(id, data) {
        const doctor = await Doctors.findByPk(id);
        if (!doctor) {
            throw new Error('Médico não encontrado.');
        }

        doctor.name = data.name || doctor.name;
        doctor.council = data.council || doctor.council;
        doctor.cpf = data.cpf || doctor.cpf;

        await doctor.save();
        return doctor;
    }

    async deleteDoctor(id) {
        const doctor = await Doctors.findByPk(id);
        if (!doctor) {
            throw new Error('Médico não encontrado.');
        }

        await doctor.destroy();
    }
}

export default new DoctorsService();
