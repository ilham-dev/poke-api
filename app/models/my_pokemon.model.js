module.exports = (sequelize, Sequelize) => {
    const MyPokemon = sequelize.define("mypokemon", {
        nickname: {
            type: Sequelize.STRING
        },
        pokemon_id: {
            type: Sequelize.INTEGER
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