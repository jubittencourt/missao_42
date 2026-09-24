// Garante que o script rode apenas após o DOM carregar usando o jQuery
$(function() {
    const $btnAdd =$('#b_new');
    const $ftList =$('#ft_list');

    if (!$btnAdd.length \vert{}\vert{} !$ftList.length) {
        console.error("Elementos não encontrados!");
        return;
    }

    // Carregar tarefas dos cookies ao iniciar
    loadTasksFromCookie();

    // Botão para adicionar nova tarefa
    $btnAdd.click(function() {
        const taskText = prompt('Digite a nova TAREFA:');
        
        if (taskText !== null && taskText.trim() !== '') {
            createTaskElement(taskText.trim(), true);
        }
    });

    // Função para criar o elemento da tarefa no DOM
    function createTaskElement(text, save) {
        const $taskDiv =$('<div>', {
            class: 'task-item',
            text: text
        });

        // Evento para remover a tarefa ao clicar
        $taskDiv.click(function() {
            const confirmDelete = confirm('Deseja realmente remover esta TAREFA?');
            if (confirmDelete) {
                $taskDiv.remove(); // Remove permanentemente do DOM
                saveTasksToCookie(); // Atualiza os cookies
            }
        });

        // Insere no topo da lista usando .prepend()
        $ftList.prepend($taskDiv);

        if (save) {
            saveTasksToCookie();
        }
    }

    // Função para salvar todas as tarefas atuais no cookie
    function saveTasksToCookie() {
        const tasks = [];
        
        // Usa o .each() do jQuery para percorrer os itens da lista
        $('#ft_list .task-item').each(function() {
            tasks.push($(this).text());
        });

        const d = new Date();
        d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))};expires=${d.toUTCString()};path=/`;
    }

    // Função para carregar as tarefas do cookie
    function loadTasksFromCookie() {
        const cookies = document.cookie.split(';');
        let taskCookie = '';

        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith('tasks=')) {
                taskCookie = cookie.substring('tasks='.length);
                break;
            }
        }

        if (taskCookie) {
            try {
                const tasks = JSON.parse(decodeURIComponent(taskCookie));
                tasks.reverse().forEach(text => {
                    createTaskElement(text, false);
                });
            } catch (e) {
                console.error('Erro ao analisar os cookies de tarefas:', e);
            }
        }
    }
});