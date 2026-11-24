const conexao = require("../database");
function login(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({
            mensagem: "Preencha e-mail e senha."
        });
    }
    const sql = `
        SELECT id, nome, email, tipo
        FROM usuarios
        WHERE email = ? AND senha = ?
    `;
    conexao.query(sql, [email, senha], (erro, resultados) => {
        if (erro) {
            console.log("Erro ao realizar login:", erro);
            return res.status(500).json({
                mensagem: "Erro ao realizar login."
            });
        }
        if (resultados.length === 0) {
            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });
        }
        const usuario = resultados[0];
        res.json({
            mensagem: "Login realizado com sucesso!",
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });
    });
}
module.exports = login;