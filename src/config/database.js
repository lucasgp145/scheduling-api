module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'appointments',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
}