/*
//npm i express
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const produtos = [
    {id: 0, marca: "Nike", tamanho: 42, modelo: "Air Force", cor: "Verda com Roxo", preco: "R$ 723,93"},
    {id: 1, marca: "Nike", tamanho: 42, modelo: "Air Force", cor: "Verda com Roxo", preco: "R$ 723,93"},
    {id: 2, marca: "Nike", tamanho: 42, modelo: "Air Force", cor: "Verda com Roxo", preco: "R$ 723,93"},
    {id: 3, marca: "Nike", tamanho: 42, modelo: "Air Force", cor: "Verda com Roxo", preco: "R$ 723,93"}
]

app.get('/series', (req, res) => {
    //será executado ao requisitar o endpoint /series
    console.log('series funcionando')
    res.json({melhorSerie: "The Office"})
})

app.get('/produtos', (req, res) => {
    res.json(produtos)
})

app.listen(port, () => {
    console.log('Servidor rodando em http://127.0.0.1:' + port)
})
*/
//npm i express
// Importa o Express
const express = require('express');
// Importa o CORS para permitir requisições de diferentes origens
let cors = require('cors');
// Cria uma instância do aplicativo Express
const app = express();
// Define a porta que o servidor vai escutar
const port = 3000;

// Habilita o CORS para todas as rotas
app.use(cors());
// Habilita para parsear JSON no corpo das requisições
app.use(express.json());

// Array para armazenar as tarefas (simulando um banco de dados em memória)
let tarefas = [];

// Rota GET para listar todas as tarefas
app.get('/tarefas', (req, res) => {
    // Retorna o array de tarefas como JSON
    res.json(tarefas);
})

// Rota POST para adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
    // Obtém os dados da nova tarefa do corpo da requisição
    const novaTarefa = req.body;
    
    // Adiciona a nova tarefa ao array com um ID sequencial
    tarefas.push({id: tarefas.length, descricao: novaTarefa.descricao});

    // Log das tarefas atualizadas no console (para debug)
    console.log(tarefas);

    // Retorna a lista atualizada de tarefas
    res.json(tarefas);
})

// Rota DELETE para remover uma tarefa pelo ID
app.delete('/tarefas/:id', (req, res) => {
    // Obtém o ID da tarefa a ser removida dos parâmetros da URL
    const { id } = req.params;
    // Converte o ID para número inteiro
    const idNum = parseInt(id);
    
    // Filtra o array, mantendo apenas as tarefas com IDs diferentes do informado
    tarefas = tarefas.filter(tarefa => tarefa.id !== idNum);
    
    // Log da remoção no console (para debug)
    console.log(`Tarefa com ID ${idNum} removida`);
    
    // Retorna a lista atualizada de tarefas
    res.json(tarefas);
})

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log('Servidor rodando em http://127.0.0.1:' + port);
})