// Função que alterna entre visível e oculto o menu vertical
function Menu() {
    // Seleciona o menu pelo ID
    var menu = document.getElementById("menu_vertical");

    // Verifica se o menu está oculto (display: none) ou visível
    if (menu.style.display == "none") {
        // Torna o menu visível
        menu.style.display = "block";
    }
    else {
        // Oculta o menu
        menu.style.display = "none";
    }
}

// Seleciona o campo de input com a classe 'escrever'
const input = document.querySelector('.escrever');

// Adiciona um listener para o evento de tecla pressionada no input
input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {    // Verifica se a tecla pressionada foi ENTER
        // Se Shift+Enter foi pressionado, não faz nada (permite quebra de linha)
        if(event.shiftKey) {
            return;
        }
        else {
            // Remove espaços em branco no início e fim do texto
            const tarefas = input.value.trim();

            // Verifica se há texto para adicionar
            if (tarefas) {
                // Chama função para adicionar tarefa
                adicionarTarefa(tarefas);
                // Previne o comportamento padrão do Enter (como submeter formulário)
                event.preventDefault();
                // Limpa o campo de input
                input.value = '';
            }
        }
    }
});

// Função para adicionar uma nova tarefa via API
function adicionarTarefa(tarefa) {
    // Faz uma requisição POST para a API
    fetch("http://127.0.0.1:3000/tarefas", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        // Converte o objeto para JSON
        body: JSON.stringify({ descricao: tarefa }),
    })
    .then(response => { response.json() })
    .then(tarefas => {
        // Atualiza a tela após adicionar
        atualizarTela()
        // Chama função para criar bloco de tarefa
        blocoTarefa()
    })
    .catch(error => {
        console.log("DEU RUIM: ", error) // Log de erro
    })
}

// Função para atualizar a lista de tarefas na tela
function atualizarTela() {
    // Faz requisição GET para obter todas as tarefas
    fetch("http://127.0.0.1:3000/tarefas")
        .then(response => response.json())
        .then(tarefas => {
            // Limpa o container de tarefas
            document.getElementById('quadrado').innerHTML = '';
            
            // Para cada tarefa retornada, cria um bloco na tela
            tarefas.forEach(item => {
                blocoTarefa(item.descricao, item.id);
                console.log(item); // Log da tarefa no console
            });
        })
        .catch(error => { console.log("DEU RUIM: ", error) }); // Log de erro
}

// Função para criar um bloco visual de tarefa
function blocoTarefa(tarefaDescricao, id) {
    // Cria um elemento div para a tarefa
    const quadrado = document.createElement('div');
    quadrado.className = "quadrado"; // Adiciona classe CSS
    quadrado.id = id; // Define o ID com o ID da tarefa
    
    // Adiciona evento de clique para deletar a tarefa
    quadrado.addEventListener('click', () => {
        // Faz requisição DELETE para a API
        fetch("http://127.0.0.1:3000/tarefas/" + id, {
        method: "DELETE"
        })
        .then(response => { response.json() })
        .then(tarefas => {
            atualizarTela(); // Atualiza a tela após deletar
        })
        .catch(error => {
            console.log("DEU RUIM: ", error) // Log de erro
        })
        quadrado.remove(); // Remove o elemento da tela
    });

    // Cria elemento de parágrafo para o texto da tarefa
    const texto = document.createElement('p');
    texto.className = "txt"; // Adiciona classe CSS
    texto.innerText = tarefaDescricao; // Define o texto
    
    // Adiciona o parágrafo dentro da div
    quadrado.appendChild(texto);
    
    // Adiciona a div ao container principal
    document.getElementById('quadrado').appendChild(quadrado);
}