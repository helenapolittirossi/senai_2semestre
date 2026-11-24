const conexao = require("../database");
function consultarAvisos(req, res) {

    const sql = `
        SELECT
            avisos.id,
            avisos.titulo,
            avisos.mensagem,
            avisos.data,
            usuarios.nome AS autor
        FROM avisos
        INNER JOIN usuarios
            ON avisos.usuario_id = usuarios.id
        ORDER BY avisos.data DESC
    `;

    conexao.query(sql, (erro, resultados) => {

        if (erro) {
            console.log("Erro ao consultar avisos:", erro);

            return res.status(500).json({
                mensagem: "Erro ao consultar avisos."
            });
        }

        res.json({
            avisos: resultados
        });

    });

}

module.exports = consultarAvisos;