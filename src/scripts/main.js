const form= document.getElementById('formulario-contatos');
const imgtelefone ='<img id="whatsimg" src="./images/telefone.png" alt="logo telefone">';
const imgwhsatsapp = '<img id="phoneimg" src="./images/whatsapp.png" alt="logo whastapp">';
const agenda =[];
const inputNomeContato = document.getElementById('form-nome');
const inputNumeroContato = document.getElementById('form-numero');
const inputLinha = document.getElementById('form-linha');
const inputWhatsapp = document.getElementById('form-whatsapp');
const btnEnvio = document.getElementById('botao-enviar');

var array = [];
let formEValido = '';

form.addEventListener('submit', function(e){
    e.preventDefault();

    validaNome(inputNomeContato.value)
})

function validaNome(nomeCompleto) {
    const nomeComoArray = nomeCompleto.split(' ');
    const mensagemDeErro = 'Por favor, informar pelo menos dois nomes!'
    if (nomeComoArray.length < 2){
        inputNomeContato.classList.add('.erro');
        document.getElementById('dois-nomes').innerHTML = mensagemDeErro;
        document.getElementById('dois-nomes').classList.add('see');
        document.getElementById('dois-nomes').classList.remove('nosee');
        document.getElementById('mensagem-sucesso').classList.remove('see')
        document.getElementById('mensagem-sucesso').classList.add('nosee');  
    } else {
        document.getElementById('dois-nomes').classList.remove('see');
        document.getElementById('dois-nomes').classList.add('nosee');
        validaContato(inputLinha.checked, inputWhatsapp.checked)
    }
    
}

function validaContato(linhaCheck, whastappCheck){
    const mensagemDeErro = 'Favor informar ao menos um meio de contato!'
    if (linhaCheck == false && whastappCheck == false){
        document.getElementById('dois-nomes').innerHTML = mensagemDeErro;
        document.getElementById('dois-nomes').classList.add('see');
        document.getElementById('dois-nomes').classList.remove('nosee');
        document.getElementById('mensagem-sucesso').classList.remove('see')
        document.getElementById('mensagem-sucesso').classList.add('nosee');     
    } else {
        preencheAgenda(inputNomeContato, inputNumeroContato, inputLinha, inputWhatsapp);
    }
}

function preencheAgenda(NomeContato, NumeroContato, linha, whastapp) {
    array.push([NomeContato.value, NumeroContato.value, linha.checked, whastapp.checked]);
    array.sort();
    adicionaContato();
}

function adicionaContato(){
    let linha = '';
    const mensagemDeSucesso = `Contato ${inputNumeroContato.value} de ${inputNomeContato.value} adicionado com sucesso!`
    
    for(let i = 0; i < array.length; i++){    
        linha +='<tr>';
        linha += `<td>${array[i][0]}</td>`;
        linha += `<td>${array[i][1]}</td>`;
        linha += `<td>${array[i][2] == true ? imgtelefone : ""} ${array[i][3] == true ? imgwhsatsapp : ""}</td>`;
        linha += '</tr>';
        console.log(linha)
    }

    document.getElementById('corpo-agenda').innerHTML = linha;
    document.getElementById('mensagem-sucesso').innerHTML = mensagemDeSucesso;
    document.getElementById('mensagem-sucesso').classList.add('see')
    document.getElementById('mensagem-sucesso').classList.remove('nosee')    
    inputNomeContato.value = '';
    inputNumeroContato.value = '';
    inputLinha.checked = true;
    inputWhatsapp.checked = false;
    contaContatos();
}

function contaContatos() {
    const totalContatos = document.getElementById('total-contatos');

    totalContatos.innerHTML = array.length;
}