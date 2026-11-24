const conexao = require("../database");

function consultarAgenda(req, res) {

    const sql = `
        SELECT
            id,
            titulo,
            data,
            horario,
            local
        FROM agenda
        ORDER BY data ASC
    `;

    conexao.query(sql, (erro, resultados) => {

        if (erro) {
            console.log("Erro ao consultar agenda:", erro);

            return res.status(500).json({
                mensagem: "Erro ao consultar agenda."
            });
        }

        res.json({
            eventos: resultados
        });

    });

}

module.exports = consultarAgenda;
