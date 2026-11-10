// =====================================================
// componentes.js — liga os componentes do Bootstrap
// =====================================================

// 1) TOOLTIPS: todo elemento com data-bs-toggle="tooltip" vira tooltip
const listaTooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
listaTooltips.forEach(function (elemento) {
    new bootstrap.Tooltip(elemento);
});

// 2) POPOVERS: mesma ideia, para data-bs-toggle="popover"
const listaPopovers = document.querySelectorAll('[data-bs-toggle="popover"]');
listaPopovers.forEach(function (elemento) {
    new bootstrap.Popover(elemento);
});

// 3) FAVORITAR: troca o coração vazio pelo cheio a cada clique
const botoesFavoritar = document.querySelectorAll('.btn-favoritar');
botoesFavoritar.forEach(function (botao) {
    botao.addEventListener('click', function () {
        const icone = botao.querySelector('i');
        icone.classList.toggle('bi-heart');        // toggle: se tem, tira; se não tem, põe
        icone.classList.toggle('bi-heart-fill');
        botao.classList.toggle('active');
    });
});

// 4) MODAL: agradece a avaliação sem recarregar a página
const formFeedback = document.getElementById('form-feedback');
if (formFeedback) {                                // só roda se o formulário existir
    formFeedback.addEventListener('submit', function (evento) {
        evento.preventDefault();
        const nome = document.getElementById('fb-nome').value;
        const nota = document.querySelector('input[name="nota"]:checked').value;

        // fecha o modal usando o JavaScript do Bootstrap
        bootstrap.Modal.getInstance(document.getElementById('modalFeedback')).hide();

        document.getElementById('area-feedback').innerHTML =
            '<div class="alert alert-success" role="alert">Obrigado, <strong>' + nome +
            '</strong>! Recebemos sua nota ' + nota + '.</div>';
        formFeedback.reset();
    });
}


// ===== AULA 12 - Etapa 3: EVENTOS DE MOUSE com addEventListener =====
const cardsPacotes = document.querySelectorAll('article.card');
 
cardsPacotes.forEach(function (card) {
    // mouseover: o mouse ENTROU no card → coloca a classe
    card.addEventListener('mouseover', function () {
        card.classList.add('card-destaque');
    });
    // mouseout: o mouse SAIU do card → tira a classe
    card.addEventListener('mouseout', function () {
        card.classList.remove('card-destaque');
    });
});


