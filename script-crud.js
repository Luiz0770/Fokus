//encontrar o botao adicionar tarefa
const btnAdicionar = document.querySelector('.app__button--add-task');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const formAdicionar = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const tituloTarefa = document.querySelector('.app__section-active-task-description');
const btnRemoverConcluidos = document.querySelector('#btn-remover-concluidas')
const btnRemoverTotal = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let desativarSelecao = null;
let liTarefaSelecionado = null;

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}


function criarTarefa(conteudo) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = conteudo.descricao;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        //debugger
        const novoTarefa = prompt("Qual e o novo nome da tarefa?");
        if (novoTarefa) {
            paragrafo.textContent = novoTarefa;
            conteudo.descricao = novoTarefa;
            atualizarTarefas();
        }
    }

    const imgBotao = document.createElement('img');
    imgBotao.setAttribute('src', '/imagens/edit.png');

    botao.append(imgBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if (conteudo.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', 'disabled')
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })
            if (desativarSelecao == conteudo) {
                tituloTarefa.textContent = '';
                desativarSelecao = null
                liTarefaSelecionado = null;
                return
            }
            desativarSelecao = conteudo
            liTarefaSelecionado = li;
            tituloTarefa.textContent = conteudo.descricao;
            li.classList.add('app__section-task-list-item-active')
        }
    }


    return li;
}

btnAdicionar.addEventListener('click', () => {
    formAdicionar.classList.toggle('hidden')
})

btnCancelar.addEventListener('click', () => {
    formAdicionar.classList.toggle('hidden')
})

formAdicionar.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const conteudo = {
        descricao: textArea.value
    }
    tarefas.push(conteudo);
    const elementoTarfea = criarTarefa(conteudo);
    ulTarefas.append(elementoTarfea);
    atualizarTarefas();
    textArea.value = '';
    formAdicionar.classList.add('hidden');
})

tarefas.forEach(conteudo => {
    const elementoTarfea = criarTarefa(conteudo);
    ulTarefas.append(elementoTarfea);
})

document.addEventListener('FocoFinalizado', () => {
    if (desativarSelecao && liTarefaSelecionado) {
        liTarefaSelecionado.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionado.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionado.querySelector('button').setAttribute('disabled', 'disabled')
        desativarSelecao.completa = true;
        atualizarTarefas();
    }
})

const removerTarefa = (somenteCompletas) => {
    const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item';
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    if (somenteCompletas) {
        tarefas = tarefas.filter(tarefa => !tarefa.completa);
    }
    else {
        tarefas = []
    }
    atualizarTarefas();
}


btnRemoverConcluidos.onclick = () => removerTarefa(true);

btnRemoverTotal.onclick = () => removerTarefa(false);


// btnRemoverTotal.onclick = () => {
//     const seletor = '.app__section-task-list-item'
//     document.querySelectorAll(seletor).forEach(elemento => {
//         elemento.remove()
//     })
//     tituloTarefa.textContent = '';
//     tarefas = []
//     atualizarTarefas();
// }