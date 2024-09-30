const botao = document.getElementById('botaoDaTask');
const input = document.getElementById('input-task');
const lista = document.querySelector('.lista');

let tarefas = [];

function adicionarTarefa() {
    if (input.value.trim() === '') {
        return; // Não adiciona tarefas vazias
    }
    
    const id = Date.now();
    tarefas.push({ id, texto: input.value, concluida: false });
    input.value = '';

    salvarTarefas(); // Salva as tarefas no Local Storage
    mostrarTarefa(); // Atualiza a lista visível
}

function mostrarTarefa() {
    lista.innerHTML = ''; // Limpa a lista existente

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = 'task';
        if (tarefa.concluida) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <img
                src="assets/img/check.png"
                alt="check"
                onclick="toggleConcluida(${tarefa.id})"
            />
            <p>${tarefa.texto}</p>
            <img
                src="assets/img/delete.png"
                alt="delete"
                onclick="removerTarefa(${tarefa.id})"
            />
        `;
        
        lista.appendChild(li);
    });
}

function removerTarefa(idParaRemover) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== idParaRemover);
    salvarTarefas(); // Salva as tarefas no Local Storage
    mostrarTarefa();
}

function toggleConcluida(idParaToggle) {
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === idParaToggle) {
            tarefa.concluida = !tarefa.concluida; // Alterna o estado de concluída
        }
        return tarefa;
    });
    salvarTarefas(); // Salva as tarefas no Local Storage
    mostrarTarefa();
}

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }
    mostrarTarefa();
}

// Carrega as tarefas ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarTarefas);

botao.addEventListener('click', adicionarTarefa);
