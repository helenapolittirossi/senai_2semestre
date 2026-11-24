const conexao = require("../database");
function cadastrarAviso(req, res) {
    const tipo = req.headers["tipo-usuario"];
    if (tipo !== "professor" && tipo !== "coordenacao") {
        return res.status(403).json({
            mensagem: "Você não tem permissão para cadastrar avisos."
        });
    }

    const { titulo, mensagem, data } = req.body;
    if (!titulo || !mensagem || !data) {
        return res.status(400).json({
            mensagem: "Preencha título, mensagem e data."
        });
    }

    let usuario_id;
    if (tipo === "professor") {
        usuario_id = 2;
    } else {
        usuario_id = 3;
    }
    const sql = `
        INSERT INTO avisos
        (titulo, mensagem, data, usuario_id)
        VALUES (?, ?, ?, ?)
    `;
    const valores = [
        titulo,
        mensagem,
        data,
        usuario_id
    ];
    conexao.query(sql, valores, (erro, resultado) => {
        if (erro) {
            console.log("Erro ao cadastrar aviso:", erro);
            return res.status(500).json({
                mensagem: "Erro ao cadastrar aviso."
            });
        }
        res.status(201).json({
            mensagem: "Aviso cadastrado com sucesso!",
            aviso: {
                id: resultado.insertId,
                titulo: titulo,
                mensagem: mensagem,
                data: data
            }
        });
    });
}

module.exports = cadastrarAviso;