const conexao = require("../database");

function consultarTarefas(req, res) {

    const sql = `
        SELECT
            tarefas.id,
            tarefas.titulo,
            disciplinas.nome AS disciplina,
            usuarios.nome AS professor,
            tarefas.prazo,
            tarefas.status
        FROM tarefas
        INNER JOIN disciplinas
            ON tarefas.disciplina_id = disciplinas.id
        INNER JOIN usuarios
            ON tarefas.professor_id = usuarios.id
        ORDER BY tarefas.prazo ASC
    `;

    conexao.query(sql, (erro, resultados) => {

        if (erro) {
            console.log("Erro ao consultar tarefas:", erro);

            return res.status(500).json({
                mensagem: "Erro ao consultar tarefas."
            });
        }

        res.json({
            tarefas: resultados
        });
    });
}

module.exports = consultarTarefas;