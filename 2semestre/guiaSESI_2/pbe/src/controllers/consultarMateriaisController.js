const conexao = require("../database");
function consultarMateriais(req, res) {

    const sql = `
        SELECT
            materiais.id,
            materiais.titulo,
            disciplinas.nome AS disciplina,
            usuarios.nome AS professor,
            materiais.tipo,
            materiais.link
        FROM materiais
        INNER JOIN disciplinas
            ON materiais.disciplina_id = disciplinas.id
        INNER JOIN usuarios
            ON materiais.professor_id = usuarios.id
        ORDER BY materiais.id ASC
    `;

    conexao.query(sql, (erro, resultados) => {
        console.log("Quantidade de materiais:", resultados.length);
        console.log(resultados);

        if (erro) {
            console.log("Erro ao consultar materiais:", erro);

            return res.status(500).json({
                mensagem: "Erro ao consultar materiais."
            });
        }

        res.json({
            materiais: resultados
        });

    });

}

module.exports = consultarMateriais;