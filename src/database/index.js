import  Sequelize  from 'sequelize';
import databaseConfig from '../config/database';

import Patients from '../app/models/Patients';
import appointments from '../app/models/appointments';
import initAssociations from '../app/models/associations';
import doctors from '../app/models/doctors';
import procedures from '../app/models/procedures';


const models = [Patients, appointments, doctors, procedures];

class Database {
    constructor(){
        this.init();
    }


init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection))

    initAssociations(); 

}
}
export default new Database();