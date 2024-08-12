import Sequelize, { Model } from "sequelize";

class Patients extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                cpf: Sequelize.STRING,
                date_of_birth: Sequelize.DATE,
                insurance: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'patients', 
                timestamps: true, 
                createdAt: 'created_at', 
                updatedAt: 'updated_at', 
            }
        );  
        
    }


}


export default Patients;
