
const conexao = require("../database");
function consultarBoletim(req, res) {

    const sql = `
        SELECT
            usuarios.nome AS aluno,
            disciplinas.nome AS disciplina,
            notas.nota,
            notas.faltas
        FROM notas
        INNER JOIN usuarios
            ON notas.aluno_id = usuarios.id
        INNER JOIN disciplinas
            ON notas.disciplina_id = disciplinas.id
        WHERE notas.aluno_id = 1
    `;

    conexao.query(sql, (erro, resultados) => {
        if (erro) {
            console.log("Erro ao consultar boletim:", erro);

            return res.status(500).json({
                mensagem: "Erro ao consultar boletim."
            });
        }
        if (resultados.length === 0) {
            return res.status(404).json({
                mensagem: "Boletim não encontrado."
            });
        }
        res.json({
            aluno: resultados[0].aluno,
            disciplinas: resultados.map((item) => ({
                disciplina: item.disciplina,
                nota: item.nota,
                faltas: item.faltas
            }))
        });
    });

}

module.exports = consultarBoletim;