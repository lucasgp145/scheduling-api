import  Sequelize  from 'sequelize';
import databaseConfig from '../config/database';

import Patients from '../app/models/Patients';
import Services from '../app/models/Services';
import initAssociations from '../app/models/associations';


const models = [Patients, Services];

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