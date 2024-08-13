import Sequelize, { Model } from "sequelize";

class Patients extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                cpf: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        is: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, // Formato válido do CPF
                    },
                },
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
