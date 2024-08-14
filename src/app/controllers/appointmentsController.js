import appointmentsService from '../services/appointmentsService';

class AppointmentsController {
    async Create(req, res) {
        try {
            const appointment = await appointmentsService.createAppointment(req.body);
            res.status(201).json(appointment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async GetAll(req, res) {
        try {
            const appointments = await appointmentsService.getAllAppointments();
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao buscar os serviços.' });
        }
    }

    async GetById(req, res) {
        try {
            const { id } = req.params;
            const appointment = await appointmentsService.getAppointmentById(id);
            res.status(200).json(appointment);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async Update(req, res) {
        try {
            const { id } = req.params;
            const appointment = await appointmentsService.updateAppointment(id, req.body);
            res.status(200).json(appointment);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async Delete(req, res) {
        try {
            const { id } = req.params;
            await appointmentsService.deleteAppointment(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

export default new AppointmentsController();
