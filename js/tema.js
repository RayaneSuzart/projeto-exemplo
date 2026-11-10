// =====================================================
// tema.js — botão de tema claro/escuro (Aula 12)
// =====================================================
const botaoTema = document.getElementById('btn-tema');
 
// Aplica o tema recebido: 'escuro' ou 'claro'
function aplicarTema(tema) {
    if (tema === 'escuro') {
        document.body.classList.add('tema-escuro');        // COLOCA a classe
        botaoTema.innerHTML = '<i class="bi bi-sun-fill"></i> Tema claro';
    } else {
        document.body.classList.remove('tema-escuro');     // TIRA a classe
        botaoTema.innerHTML = '<i class="bi bi-moon-stars-fill"></i> Tema escuro';
    }
}
 
// Troca para o tema contrário do atual
function alternarTema() {
    if (document.body.classList.contains('tema-escuro')) {  // está escuro?
        aplicarTema('claro');
        localStorage.setItem('tema', 'claro');              // guarda a escolha
    } else {
        aplicarTema('escuro');
        localStorage.setItem('tema', 'escuro');
    }
}
 
// Quando clicar no botão, executa alternarTema
botaoTema.addEventListener('click', alternarTema);
 
// Ao abrir a página, usa o tema que estava guardado
aplicarTema(localStorage.getItem('tema'));

