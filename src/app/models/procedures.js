import Sequelize, { Model } from "sequelize";

class Procedures extends Model {
    static init(sequelize) {
        super.init(
            {
                procedure_name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                types_of_service: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'procedures',
                timestamps: true,
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            }
        );
    }
}

export default Procedures;
