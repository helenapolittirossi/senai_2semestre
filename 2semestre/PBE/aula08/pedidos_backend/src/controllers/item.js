const itens = require("../../dados/itens.json")
const produtos = require("../../dados/produtos.json")

function comporProduto() {
    itens.forEach(item => {
        item.produto = produtos.find(p => p.id == item.produto_id)
    })
}

const criar = (req, res) => {

    const dados = req.body

    dados.id = Number(itens[itens.length - 1].id) + 1

    itens.push(dados)

    res.status(201).json(dados)
}

const listar = (req, res) => {

    comporProduto()

    itens.forEach(item => {
        item.subtotal = item.preco * item.quantidade
    })

    res.json(itens)
}

const alterar = (req, res) => {

    const id = Number(req.params.id)

    const item = itens.find(i => i.id === id)

    if (!item) {
        return res.status(404).json("Item não encontrado")
    }

    item.pedido_id = req.body.pedido_id
    item.produto_id = req.body.produto_id
    item.preco = req.body.preco
    item.quantidade = req.body.quantidade

    res.json(item)
}

const excluir = (req, res) => {

    const id = Number(req.params.id)

    const indice = itens.findIndex(i => i.id === id)

    if (indice === -1) {
        return res.status(404).json("Item não encontrado")
    }

    const item = itens.splice(indice, 1)

    res.json(item)
}

module.exports = {
    criar,
    listar,
    alterar,
    excluir
}