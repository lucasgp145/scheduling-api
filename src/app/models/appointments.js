import Sequelize, { Model } from "sequelize";

class appointments extends Model {
    static init(sequelize) {
        super.init(
            {
                types_of_service: Sequelize.STRING,
                unit: Sequelize.STRING,
                description: Sequelize.STRING,

                patient_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'patients',
                        key: 'id',
                    },
                },
                status: { 
                    type: Sequelize.ENUM('ATIVO', 'INATIVO'), 
                    allowNull: false,
                    defaultValue: 'ATIVO',
                },
            },
            {
                sequelize,
                tableName: 'appointments',
                timestamps: true, 
                createdAt: 'created_at', 
                updatedAt: 'updated_at', 
            }
        ); 
    }
}

export default appointments;
