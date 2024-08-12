import { Op } from 'sequelize';
import Patients from '../models/Patients';
import Services from '../models/Services';

class ServicesController {
    async Create(req, res) {
        try {
            const { patient_id, types_of_service, unit, name, email, cpf, insurance, date_of_birth, description } = req.body;

            if (!types_of_service || !unit) {
                return res.status(400).json({ error: 'Os campos types_of_service e unit são obrigatórios.' });
            }

            let patient;

            if (patient_id) {
                patient = await Patients.findByPk(patient_id);
            }

            if (!patient) {
                if (!name || !email || !cpf || !insurance || !date_of_birth) {
                    return res.status(400).json({ error: 'Os campos name, email, cpf, insurance e date_of_birth são obrigatórios para criar um novo paciente.' });
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
                    return res.status(409).json({
                        error: 'Não foi possível cadastrar o paciente através do agendamento. O e-mail ou CPF já está cadastrado com outro paciente.',
                        patient: existingPatient
                    });
                }

                patient = await Patients.create({
                    name,
                    email,
                    cpf,
                    insurance,
                    date_of_birth,
                });
            }

            const serviceData = {
                types_of_service,
                unit,
                patient_id: patient.id,
                description,
            };

            const service = await Services.create(serviceData);

            res.status(201).json({ patient, service });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating the service or patient.' });
        }
    }

    async GetAll(req, res) {
        try {
            const services = await Services.findAll({ include: Patients }); // Inclui os dados do paciente
            res.status(200).json(services);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching services.' });
        }
    }

    async GetById(req, res) {
        try {
            const { id } = req.params;
            const service = await Services.findByPk(id, { include: Patients });

            if (!service) {
                return res.status(404).json({ error: 'Service not found.' });
            }

            res.status(200).json(service);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the service.' });
        }
    }

    async Update(req, res) {
        try {
            const { id } = req.params;
            const { types_of_service, unit } = req.body;

            const service = await Services.findByPk(id);

            if (!service) {
                return res.status(404).json({ error: 'Service not found.' });
            }

            service.types_of_service = types_of_service || service.types_of_service;
            service.unit = unit || service.unit;

            await service.save(); 

            res.status(200).json(service);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the service.' });
        }
    }

    async Delete(req, res) {
        try {
            const { id } = req.params;
            const service = await Services.findByPk(id);

            if (!service) {
                return res.status(404).json({ error: 'Service not found.' });
            }

            await service.destroy();
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the service.' });
        }
    }
}

export default new ServicesController();
