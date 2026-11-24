const conexao = require("../database");
function cadastrarMaterial(req, res) {
    const { titulo, disciplina, tipo, link } = req.body;
    if (!titulo || !disciplina || !tipo || !link) {
        return res.status(400).json({
            mensagem: "Preencha título, disciplina, tipo e link."
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
        const sqlMaterial = `
            INSERT INTO materiais
            (titulo, disciplina_id, professor_id, tipo, link)
            VALUES (?, ?, ?, ?, ?)
        `;
        const valores = [
            titulo,
            disciplina_id,
            2,
            tipo,
            link
        ];
        conexao.query(sqlMaterial, valores, (erro, resultado) => {
            if (erro) {
                console.log("Erro ao cadastrar material:", erro);
                return res.status(500).json({
                    mensagem: "Erro ao cadastrar material."
                });
            }
            res.status(201).json({
                mensagem: "Material cadastrado com sucesso!",
                material: {
                    id: resultado.insertId,
                    titulo: titulo,
                    disciplina: disciplina,
                    tipo: tipo,
                    link: link
                }
            });
        });
    });
}
module.exports = cadastrarMaterial;