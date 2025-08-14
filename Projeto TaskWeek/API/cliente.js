/*
fetch("http://127.0.0.1:3000/produtos")
.then(response => response.json())
.then(produtos=> {
    produtos.map(item =>{
        console.log(item)
    })
})
.catch(error => {console.log("DEU RUIM: ", error)})
*/

fetch("http://127.0.0.1:3000/tarefas", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: 4, marca: "Nike", tamanho: 42, modelo: "Air Force", cor: "Verda com Roxo", preco: "R$ 723,93" }),
})

    .then(response => response.json())
    .then(tarefas => {
        console.log(tarefas)
    })
    .catch(error => { console.log("DEU RUIM: ", error) })
