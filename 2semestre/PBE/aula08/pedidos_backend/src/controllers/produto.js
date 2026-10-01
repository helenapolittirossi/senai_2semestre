const produtos = require("../../dados/produtos.json")

const criar = (req, res) => {

    const dados = req.body

    dados.id = Number(produtos[produtos.length - 1].id) + 1

    produtos.push(dados)

    res.status(201).json(dados)
}

const listar = (req, res) => {

    res.json(produtos)
}

const alterar = (req, res) => {

    const id = Number(req.params.id)

    const produto = produtos.find(p => p.id === id)

    if (!produto) {
        return res.status(404).json("Produto não encontrado")
    }

    produto.nome = req.body.nome
    produto.preco = req.body.preco

    res.json(produto)
}

const excluir = (req, res) => {

    const id = Number(req.params.id)

    const indice = produtos.findIndex(p => p.id === id)

    if (indice === -1) {
        return res.status(404).json("Produto não encontrado")
    }

    const produto = produtos.splice(indice, 1)

    res.json(produto)
}

module.exports = {
    criar,
    listar,
    alterar,
    excluir
}