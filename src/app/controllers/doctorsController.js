import doctorsService from '../services/doctorsService';

class DoctorsController {
    async Create(req, res) {
        try {
            const doctor = await doctorsService.createDoctor(req.body);
            res.status(201).json(doctor);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }

    async GetAll(req, res) {
        try {
            const doctors = await doctorsService.getAllDoctors();
            res.status(200).json(doctors);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocorreu um erro ao buscar os médicos.' });
        }
    }

    async GetById(req, res) {
        try {
            const { id } = req.params;
            const doctor = await doctorsService.getDoctorById(id);
            res.status(200).json(doctor);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    }

    async Update(req, res) {
        try {
            const { id } = req.params;
            const doctor = await doctorsService.updateDoctor(id, req.body);
            res.status(200).json(doctor);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    }

    async Delete(req, res) {
        try {
            const { id } = req.params;
            await doctorsService.deleteDoctor(id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    }
}

export default new DoctorsController();
