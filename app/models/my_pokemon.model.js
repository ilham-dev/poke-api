module.exports = (sequelize, Sequelize) => {
    const MyPokemon = sequelize.define("mypokemon", {
        nickname: {
            type: Sequelize.STRING
        },
        pokemon: {
            type: Sequelize.STRING
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
        },
    }, {
        freezeTableName: true
    });
    return MyPokemon;
};