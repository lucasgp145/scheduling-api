import Patients from './Patients';
import Appointments from './appointments'; // Corrigido: nome da importação para Appointments
import Doctors from './doctors'; // Importação do modelo Doctors
import Procedures from './procedures'; // Importação do modelo Procedures

const initAssociations = () => {
    Patients.hasMany(Appointments, { foreignKey: 'patient_id' }); // Um paciente pode ter muitos agendamentos
    Appointments.belongsTo(Patients, { foreignKey: 'patient_id' }); // Um agendamento pertence a um paciente

    Doctors.hasMany(Appointments, { foreignKey: 'doctor_id' }); // Um médico pode ter muitos agendamentos
    Appointments.belongsTo(Doctors, { foreignKey: 'doctor_id' }); // Um agendamento pertence a um médico

    Procedures.hasMany(Appointments, { foreignKey: 'procedure_id' }); // Um procedimento pode ter muitos agendamentos
    Appointments.belongsTo(Procedures, { foreignKey: 'procedure_id' }); // Um agendamento pertence a um procedimento
};

export default initAssociations;
