import Sequelize, { Model } from "sequelize";

class Doctors extends Model {
    static init(sequelize) {
        super.init(
            {
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                council: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                cpf: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        is: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, // Formato válido do CPF
                    },
                },
            },
            {
                sequelize,
                tableName: 'doctors',
                timestamps: true,
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            }
        );
    }
}

export default Doctors;
