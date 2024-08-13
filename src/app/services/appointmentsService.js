import { Op } from 'sequelize';
import Patients from '../models/Patients';
import Appointments from '../models/appointments'; 
import Doctors from '../models/doctors'; // Importa o modelo Doctors
import Procedures from '../models/procedures'; // Importa o modelo Procedures

class AppointmentsService {
    async createAppointment(data) {
        const { 
            patient_id, 
            types_of_service, 
            unit, 
            name, 
            email, 
            cpf, 
            insurance, 
            date_of_birth, 
            description, 
            status,
            doctor_id,
            procedure_id
        } = data;

        const doctor = await Doctors.findByPk(doctor_id);
        if (!doctor) {
            throw new Error('O médico com o ID fornecido não existe.');
        }

        const procedure = await Procedures.findByPk(procedure_id);
        if (!procedure) {
            throw new Error('O procedimento com o ID fornecido não existe.');
        }

        if (!types_of_service || !unit) {
            throw new Error('Os campos types_of_service e unit são obrigatórios.');
        }

        let patient;

        // Verifica se já existe um paciente ou cria um novo
        if (patient_id) {
            patient = await Patients.findByPk(patient_id);
        }

        if (!patient) {
            if (!name || !email || !cpf || !insurance || !date_of_birth) {
                throw new Error('Os campos name, email, cpf, insurance e date_of_birth são obrigatórios para criar um novo paciente.');
            }

            const existingPatient = await Patients.findOne({
                where: {
                    [Op.or]: [
                        { email },
                        { cpf }
                    ]
                }
            });

            if (existingPatient) {
                patient = existingPatient;
            } else {
                patient = await Patients.create({
                    name,
                    email,
                    cpf,
                    insurance,
                    date_of_birth,
                });
            }
        }

        const appointmentData = {
            types_of_service,
            unit,
            patient_id: patient.id,
            doctor_id: doctor.id, 
            procedure_id: procedure.id,
            description,
            status: status || 'ATIVO', 
        };

        // Cria o agendamento no banco de dados
        return await Appointments.create(appointmentData); 
    }

    async getAllAppointments() {
        return await Appointments.findAll({ include: Patients }); 
    }

    async getAppointmentById(id) {
        const appointment = await Appointments.findByPk(id, { include: Patients }); 
        if (!appointment) {
            throw new Error('Agendamento não encontrado.'); 
        }
        return appointment;
    }

    async updateAppointment(id, data) {
        const appointment = await Appointments.findByPk(id); 
        if (!appointment) {
            throw new Error('Agendamento não encontrado.'); 
        }

        appointment.types_of_service = data.types_of_service || appointment.types_of_service;
        appointment.unit = data.unit || appointment.unit;
        appointment.status = data.status || appointment.status;

        await appointment.save();
        return appointment;
    }

    async deleteAppointment(id) {
        const appointment = await Appointments.findByPk(id); 
        if (!appointment) {
            throw new Error('Agendamento não encontrado.'); 
        }

        await appointment.destroy();
    }
}

export default new AppointmentsService();
