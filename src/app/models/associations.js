// src/app/models/associations.js

import Patients from './Patients';
import Services from './Services';

const initAssociations = () => {
    Patients.hasMany(Services, { foreignKey: 'patient_id' }); // Um paciente pode ter muitos serviços
    Services.belongsTo(Patients, { foreignKey: 'patient_id' }); // Um serviço pertence a um paciente
};

export default initAssociations;
