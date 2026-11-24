const conexao = require("../database");
function cadastrarTarefa(req, res) {
    const { titulo, disciplina, prazo } = req.body;
    if (!titulo || !disciplina || !prazo) {
        return res.status(400).json({
            mensagem: "Preencha título, disciplina e prazo."
        });
    }

    const sqlDisciplina = `
        SELECT id
        FROM disciplinas
        WHERE nome = ?
    `;

    conexao.query(sqlDisciplina, [disciplina], (erro, resultado) => {
        if (erro) {
            console.log("Erro ao consultar disciplina:", erro);

            return res.status(500).json({
                mensagem: "Erro ao consultar disciplina."
            });
        }
        if (resultado.length === 0) {
            return res.status(404).json({
                mensagem: "Disciplina não encontrada."
            });
        }

        const disciplina_id = resultado[0].id;
        const sqlTarefa = `
            INSERT INTO tarefas
            (titulo, disciplina_id, professor_id, prazo, status)
            VALUES (?, ?, ?, ?, ?)
        `;
        const valores = [
            titulo,
            disciplina_id,
            2,
            prazo,
            "Pendente"
        ];

        conexao.query(sqlTarefa, valores, (erro, resultado) => {
            if (erro) {
                console.log("Erro ao cadastrar tarefa:", erro);
                return res.status(500).json({
                    mensagem: "Erro ao cadastrar tarefa."
                });
            }

            res.status(201).json({
                mensagem: "Tarefa cadastrada com sucesso!",
                tarefa: {
                    id: resultado.insertId,
                    titulo: titulo,
                    disciplina: disciplina,
                    prazo: prazo,
                    status: "Pendente"
                }
            });

        });

    });
}
module.exports = cadastrarTarefa;