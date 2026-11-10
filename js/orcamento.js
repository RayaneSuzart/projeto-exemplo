// =====================================================
// orcamento.js — JavaScript da página de orçamento
// =====================================================

// Etapa 10: console.log escreve uma mensagem no Console do navegador
console.log('O arquivo orcamento.js foi carregado!');

// ===== Etapa 11: VARIÁVEIS E TIPOS DE DADOS =====
const nomeAgencia = 'Jornada Viagens';     // string  → texto, sempre entre aspas
const descontoPix = 5;                     // number  → número, sem aspas
let promocaoAtiva = true;                  // boolean → true (verdadeiro) ou false (falso)

// array → uma LISTA de valores, entre [ ]
const destinosDestaque = ['Japão', 'Paraíba', 'San Andreas'];

// object → várias informações sobre UMA coisa, entre { }
const pacoteDoMes = {
    destino: 'Paraíba',
    preco: 1199,
    dias: 4
};

// typeof mostra o TIPO da variável
console.log(nomeAgencia, '→', typeof nomeAgencia);
console.log(descontoPix, '→', typeof descontoPix);
console.log(promocaoAtiva, '→', typeof promocaoAtiva);
console.log('Primeiro destino da lista:', destinosDestaque[0]);  // a contagem começa em 0
console.log('Destino do pacote do mês:', pacoteDoMes.destino);   // objeto.propriedade

// ===== Etapa 12: MANIPULAÇÃO DO DOM =====

// 1) Escrever na página usando as variáveis da Etapa 11
const textoDestaque = document.getElementById('texto-destaque');   // pega o <p> pelo id
textoDestaque.textContent = 'Pacote do mês: ' + pacoteDoMes.destino +
    ' por R$ ' + pacoteDoMes.preco + ' (' + pacoteDoMes.dias + ' dias). ' +
    'Destaques: ' + destinosDestaque.join(', ') + '.';

if (promocaoAtiva) {
    textoDestaque.style.fontWeight = 'bold';   // muda o ESTILO pelo JavaScript
}

// 2) Pegar os campos do formulário pelo id
const campoHospedagem = document.getElementById('hospedagem');
const campoPessoas = document.getElementById('pessoas');
const campoDiarias = document.getElementById('diarias');
const saidaPessoas = document.getElementById('saida-pessoas');
const saidaTotal = document.getElementById('total');


// ===== AULA 12 - Etapa 1: FUNÇÕES COM PARÂMETROS E RETORNO =====
const saidaPix = document.getElementById('total-pix');
 
// Recebe um número e DEVOLVE (return) o texto no formato R$ 0,00
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
 
// Recebe o valor e o percentual; DEVOLVE o valor já com desconto
function calcularDesconto(valor, percentual) {
    const desconto = valor * percentual / 100;
    return valor - desconto;
}
 

// 3) Função que calcula o total e mostra na tela
function calcularTotal() {
    // .value LÊ o que está no campo (vem como texto); Number() transforma em número
    const diaria = Number(campoHospedagem.value);
    const pessoas = Number(campoPessoas.value);
    const diarias = Number(campoDiarias.value);

    const total = diaria * pessoas * diarias;

    // textContent ESCREVE o texto dentro do elemento
    saidaPessoas.textContent = pessoas;
    saidaTotal.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    // AULA 12 - Etapa 1: CHAMA as funções novas (descontoPix = 5 veio da Aula 11)
    const totalComPix = calcularDesconto(total, descontoPix);
    saidaPix.textContent = formatarMoeda(totalComPix);


    // style muda a aparência: acima de R$ 3.000 o total ganha fundo laranja-claro
    if (total > 3000) {
        saidaTotal.style.backgroundColor = '#ffe5b4';
        saidaTotal.style.padding = '0 8px';
    } else {
        saidaTotal.style.backgroundColor = '';   // '' = volta ao normal
        saidaTotal.style.padding = '';
    }
}

// 4) Sempre que o usuário mexer nos campos, recalcula
campoHospedagem.addEventListener('change', calcularTotal);
campoPessoas.addEventListener('input', calcularTotal);
campoDiarias.addEventListener('input', calcularTotal);

calcularTotal();   // calcula uma vez quando a página abre

// ===== Etapa 13: BARRA DE PROGRESSO E VALIDAÇÃO =====
const formulario = document.getElementById('form-orcamento');
const barra = document.getElementById('barra-preenchimento');
const areaAlertas = document.getElementById('area-alertas');

// Um ARRAY com os 4 campos obrigatórios
const camposObrigatorios = [
    document.getElementById('nome'),
    document.getElementById('email'),
    document.getElementById('destino'),
    campoHospedagem
];

// Conta quantos campos estão preenchidos e atualiza a barra
function atualizarProgresso() {
    let preenchidos = 0;
    camposObrigatorios.forEach(function (campo) {      // repete para cada campo da lista
        if (campo.value.trim() !== '') {              // trim() tira os espaços
            preenchidos = preenchidos + 1;
        }
    });

    const porcentagem = (preenchidos / camposObrigatorios.length) * 100;
    barra.style.width = porcentagem + '%';            // muda a LARGURA da barra
    barra.textContent = porcentagem + '%';            // muda o TEXTO da barra
    barra.parentElement.setAttribute('aria-valuenow', porcentagem);

    if (porcentagem === 100) {
        barra.classList.add('bg-success');            // tudo preenchido: barra verde
    } else {
        barra.classList.remove('bg-success');
    }
}

// Quando o usuário digitar ou trocar a opção, atualiza a barra
camposObrigatorios.forEach(function (campo) {
    campo.addEventListener('input', atualizarProgresso);
    campo.addEventListener('change', atualizarProgresso);
});

// Quando o formulário for ENVIADO
formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();   // impede a página de recarregar

    let tudoCerto = true;
    camposObrigatorios.forEach(function (campo) {
        if (campo.checkValidity()) {                  // o campo está válido?
            campo.classList.remove('is-invalid');
            campo.classList.add('is-valid');          // borda verde
        } else {
            campo.classList.remove('is-valid');
            campo.classList.add('is-invalid');        // borda vermelha + mensagem
            tudoCerto = false;
        }
    });

    if (tudoCerto) {
        areaAlertas.innerHTML = '<div class="alert alert-success" role="alert">' +
            '<strong>Pronto!</strong> Seu orçamento foi enviado. Total: ' + saidaTotal.textContent + '</div>';
    } else {
        areaAlertas.innerHTML = '<div class="alert alert-danger" role="alert">' +
            '<strong>Atenção!</strong> Corrija os campos em vermelho.</div>';
    }
});

// Botão "Limpar": zera a barra, as cores e o alerta
formulario.addEventListener('reset', function () {
    setTimeout(function () {                          // espera o navegador limpar os campos
        camposObrigatorios.forEach(function (campo) {
            campo.classList.remove('is-valid', 'is-invalid');
        });
        areaAlertas.innerHTML = '';
        atualizarProgresso();
        calcularTotal();
    }, 0);
});

// ===== Etapa 15: jQuery =====
// $('#btn-dicas') é o mesmo que document.getElementById('btn-dicas')
// .on('click', ...) é o mesmo que addEventListener('click', ...)
$('#btn-dicas').on('click', function () {
    $('#caixa-dicas').slideToggle(300);   // mostra/esconde deslizando em 300 milissegundos
});


// ===== AULA 12 - Etapa 2: FUNÇÃO CHAMADA PELO onclick =====
function mostrarResumo() {
    const nome = document.getElementById('nome').value;
    const destino = document.getElementById('destino').value;
 
    // TEMPLATE STRING: texto entre crases ` ` com ${variavel} no meio
    document.getElementById('resumo').innerHTML = `
        <div class="card card-body">
            <h3 class="h5">Resumo do orçamento</h3>
            <p class="mb-1"><strong>Viajante:</strong> ${nome}</p>
            <p class="mb-1"><strong>Destino:</strong> ${destino}</p>
            <p class="mb-1"><strong>Pessoas:</strong> ${campoPessoas.value} | <strong>Diárias:</strong> ${campoDiarias.value}</p>
            <p class="mb-0"><strong>Total:</strong> ${saidaTotal.textContent} (no Pix: ${saidaPix.textContent})</p>
        </div>`;
}


// ===== AULA 12 - Etapa 4: EVENTO DE TECLADO (keydown) =====
const campoNome = document.getElementById('nome');
const avisoNome = document.getElementById('aviso-nome');
 
// evento = informações sobre o que aconteceu (qual tecla, onde...)
campoNome.addEventListener('keydown', function (evento) {
    // evento.key = a tecla apertada: 'a', 'B', '7', 'Enter', 'Backspace'...
    if (evento.key >= '0' && evento.key <= '9') {
        evento.preventDefault();                 // cancela: o número NÃO é escrito
        avisoNome.textContent = 'O nome não pode ter números.';
    } else {
        avisoNome.textContent = '';              // outra tecla: apaga o aviso
    }
});

