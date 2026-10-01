const pedidos = require("../../dados/pedidos.json")
const clientes = require("../../dados/clientes.json")
const itens = require("../../dados/itens.json")

function comporCliente() {
    pedidos.forEach(p => {
        p.cliente = clientes.find(c => c.id == p.cliente_id)
    })
}

function agregarItens() {
    pedidos.forEach(p => {
        p.itens = itens.filter(item => item.pedido_id == p.id)
    })
}

function calcTotais() {
    pedidos.forEach(p => {
        p.total = p.itens.reduce((total, item) => {
            return total + (item.preco * item.quantidade)
        }, 0)
    })
}

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(pedidos[pedidos.length - 1].id) + 1
    pedidos.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    comporCliente()
    agregarItens()
    calcTotais()
    res.json(pedidos)
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const pedido = pedidos.find(p => p.id === id)
    if (!pedido) {
        return res.status(404).json("Pedido não encontrado")
    }
    pedido.cliente_id = req.body.cliente_id
    pedido.data = req.body.data
    res.json(pedido)
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    const indice = pedidos.findIndex(p => p.id === id)
    if (indice === -1) {
        return res.status(404).json("Pedido não encontrado")
    }
    const pedido = pedidos.splice(indice, 1)
    res.json(pedido)
}

module.exports = {
    criar,
    listar,
    alterar,
    excluir
}