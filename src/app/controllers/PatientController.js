import Patients from '../models/Patients';

class PatientControllerController {
    async Create(req, res) {

        const {id, name, email} = await Patients.create(req.body);

        return res.json({id, name, email});

    }
}

export default new PatientControllerController();