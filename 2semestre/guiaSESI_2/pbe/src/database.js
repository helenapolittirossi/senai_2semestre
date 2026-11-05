const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "guiasesi"
});

conexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar com o banco:", erro);
        return;
    }

    console.log("Conectado ao banco de dados GuiaSESI!");
});

module.exports = conexao;