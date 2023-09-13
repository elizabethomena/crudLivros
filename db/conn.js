const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('nodesequelize2', 'aluno_medio', '@lunoSenai23.', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
})

// try{ //tente
//     sequelize.authenticate()
//     console.log('Conectado com sucesso');
// }catch(error){ //erro
//     console.log(error);
// }

module.exports = sequelize