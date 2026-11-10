// =====================================================
// loja.js — Loja do Viajante (Aula 12)
// =====================================================
 
// ARRAY de OBJETOS: cada objeto é um produto
const produtos = [
    { nome: 'Mala de bordo 10 kg', preco: 349.90, icone: 'bi-suitcase2' },
    { nome: 'Travesseiro de pescoço', preco: 59.90, icone: 'bi-cloud' },
    { nome: 'Adaptador universal de tomada', preco: 79.90, icone: 'bi-plug' },
    { nome: 'Garrafa térmica', preco: 89.90, icone: 'bi-cup-straw' },
    { nome: 'Necessaire', preco: 49.90, icone: 'bi-bag' },
    { nome: 'Cadeado com senha', preco: 39.90, icone: 'bi-lock' },
    { nome: 'Carregador portátil', preco: 149.90, icone: 'bi-battery-charging' },
    { nome: 'Guarda-chuva compacto', preco: 34.90, icone: 'bi-umbrella' }
];
 
// Função que transforma 59.9 em "R$ 59,90"
function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
 
// ===== Etapa 7: LOOP for — um <li> para cada produto =====
const lista = document.getElementById('lista-produtos');
 
// i começa em 0; repete enquanto i for menor que o total; soma 1 a cada volta
for (let i = 0; i < produtos.length; i++) {
    const produto = produtos[i];                        // o produto da vez
 
    const item = document.createElement('li');          // CRIA um <li> novo
    item.className = 'list-group-item d-flex justify-content-between';
    item.innerHTML = `<span>${produto.nome}</span> <strong>${formatarPreco(produto.preco)}</strong>`;
 
    lista.appendChild(item);                            // COLOCA o <li> dentro da <ul>
}

// ===== Etapa 8: forEach — um CARD para cada produto =====
const vitrine = document.getElementById('vitrine');
 
// Recebe uma lista de produtos e desenha um card para cada um
function mostrarProdutos(listaDeProdutos) {
    vitrine.innerHTML = '';                             // limpa a vitrine antes
 
    listaDeProdutos.forEach(function (produto) {        // para CADA produto...
        vitrine.innerHTML += `
            <div class="col">
                <article class="card h-100 text-center shadow-sm">
                    <div class="card-body">
                        <i class="bi ${produto.icone} display-5 text-primary"></i>
                        <h3 class="h6 mt-3">${produto.nome}</h3>
                        <p class="fs-5 fw-bold mb-0">${formatarPreco(produto.preco)}</p>
                    </div>
                </article>
            </div>`;
    });
}
 
// mostrarProdutos(produtos);                              // desenha todos os produtos


// ===== Etapa 9: FILTRO — loop + if =====
const contador = document.getElementById('contador');
const botoesFiltro = document.querySelectorAll('[data-filtro]');
 
function filtrar(tipo) {
    const resultado = [];                               // começa com um array VAZIO
 
    for (const produto of produtos) {                   // for...of: cada produto do array
        if (tipo === 'todos') {
            resultado.push(produto);                    // push: coloca no FINAL do array
        } else if (tipo === 'ate100' && produto.preco <= 100) {
            resultado.push(produto);
        } else if (tipo === 'acima100' && produto.preco > 100) {
            resultado.push(produto);
        }
    }
 
    mostrarProdutos(resultado);                         // reaproveita a função da Etapa 8
    contador.textContent = `Mostrando ${resultado.length} de ${produtos.length} produtos`;
}
 
// Liga o clique em cada botão de filtro
botoesFiltro.forEach(function (botao) {
    botao.addEventListener('click', function () {
        botoesFiltro.forEach(function (outro) {
            outro.classList.remove('active');           // tira o destaque de TODOS
        });
        botao.classList.add('active');                  // destaca só o clicado
        filtrar(botao.dataset.filtro);                  // lê o data-filtro do botão
    });
});
 
filtrar('todos');                                       // começa mostrando todos


