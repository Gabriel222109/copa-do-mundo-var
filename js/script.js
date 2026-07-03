// Exercício 1 - Mensagem de boas-vindas ao entrar na página
function bemVindo() {
    alert("Bem-vindo ao portal da Seleção Portuguesa!");
};

// Exercício 2 - Interação com o título principal
const titulo = document.getElementById("titulo");

// Cor original do título
const corOriginal = titulo.style.color || "#ffffff";

// Ao passar o mouse muda a cor
titulo.onmouseover = function() {
    titulo.style.color = "#ffcc00";
};

// Quando o mouse sair volta à cor original
titulo.onmouseout = function() {
    titulo.style.color = corOriginal;
};

// Ao clicar no título aparece uma mensagem de incentivo
titulo.onclick = function() {
    alert("Para cima Portugal! Rumo ao Hexa!");
};

// Exercício 3 - Duplo clique no parágrafo de curiosidade
const curiosidade = document.getElementById("curiosidade");

function mudar_curiosidade() {
    window.document.getElementById("curiosidade").innerText = 
        "Curiosidade: Portugal é o único país europeu a vencer a Eurocopa sem nunca ter sido campeão do mundo. "+
        "Além disso, Cristiano Ronaldo é o maior artilheiro da história das seleções europeias!";
};

// Exercício Extra - Interação com a imagem
const imagem = document.getElementById("imagem-selecao");

// Ao clicar na imagem troca por outra
imagem.onclick = function() {
    if (imagem.src.includes("SNAA4jpgjpg.jpeg")) {
        // Troca para outra imagem relacionada (bandeira)
        imagem.src = "https://assets.goal.com/images/v3/getty-2160778682/crop/MM5DKMBQGQ5DEOBRGU5G433XMU5DAORSGYYQ====/GettyImages-2160778682.jpg";
    } else {
        // Volta para a imagem original
        imagem.src = "https://media.assettype.com/dn%2F2026-06-11%2Fw0szc7wr%2FSNAA4jpgjpg.jpeg?w=1200&auto=format%2Ccompress&fit=max";
    }
};

// Ao passar o mouse sobre a imagem aumenta o tamanho
imagem.onmouseover = function() {
    imagem.style.transition = "transform 0.3s ease";
    imagem.style.transform = "scale(1.1)";
};

// Quando o mouse sair da imagem volta ao tamanho normal
imagem.onmouseout = function() {
    imagem.style.transform = "scale(1)";
};


    // alterar cor da tabela de classificação
function mudar_cor1() {
   const escocia = document.getElementById("escocia");
   escocia.style.color = "#23c145";
   escocia.style.fontWeight = "bold";
}

function mudar_cor2() {
    const brasil = document.getElementById("brasil");
    brasil.style.color = "#23c145";
    brasil.style.fontWeight = "bold";
}

function mudar_cor3() {
    const marrocos = document.getElementById("marrocos");
    marrocos.style.color = "#23c145";
    marrocos.style.fontWeight = "bold";
}

function mudar_cor4() {
    const haiti = document.getElementById("haiti");
    haiti.style.color = "#ff0000";
    haiti.style.textDecoration = "line-through";
}

function retornar_cor1() {
   const escocia = document.getElementById("escocia");
   escocia.style.color = "";
   escocia.style.fontWeight = "";
}

function retornar_cor2() {
    const brasil = document.getElementById("brasil");
    brasil.style.color = "";
    brasil.style.fontWeight = "";
}

function retornar_cor3() {
    const marrocos = document.getElementById("marrocos");
    marrocos.style.color = "";
    marrocos.style.fontWeight = "";
}

function retornar_cor4() {
    const haiti = document.getElementById("haiti");
    haiti.style.color = "";
    haiti.style.textDecoration = "";
}

/////////////
// 1. getInput() - Puxa os elementos do formulário pelo ID
//Pega os campos de nome, email e senha da página
function getInputs(){
    return {
        nome: document.getElementById('nome'),
        email: document.getElementById('email'),
        senha: document.getElementById('senha'),
        pais: document.getElementById('pais'),
        data_nascimento: document.getElementById('data_nascimento'),
        jogador_favorito: document.getElementById('jogador_favorito')
    };
}

function getValores({nome, email, senha, pais, data_nascimento, jogador_favorito}){
    return {
        nome: nome.value.trim(),
        email: email.value.trim(),
        senha: senha.value.trim(),
        pais: pais.value.trim(),
        data_nascimento: data_nascimento.value.trim(),
        jogador_favorito: jogador_favorito.value.trim()
    };
}

async function cadastrar(){
    const inputs = getInputs();
    const dados = getValores(inputs);

    await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    window.location.href = '../pages/resultado.html';
}

function calcularIdade(dataNascimento) {
    const anoHoje = new Date().getFullYear();
    const anoNascimento = new Date(dataNascimento).getFullYear();
    const idade = anoHoje - anoNascimento;
    
    return idade;
}

async function mostrarResultado(){
    const resultadoDiv = document.getElementById('resultado');
    const resposta = await fetch('/api/usuarios');
    const usuarios = await resposta.json();

    if (usuarios.length === 0) {
        resultadoDiv.innerHTML = '<p>Nenhum usuário cadastrado ainda.</p>';
        return;
    }

 let html = '<table><thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>Senha</th><th>País</th><th>Data de Nascimento</th><th>Idade</th></tr></thead><tbody>';
    for (const usuario of usuarios) {
        const idade = calcularIdade(usuario.data_nascimento);
        html += `<tr><td>${usuario.id}</td><td>${usuario.nome}</td><td>${usuario.email}</td><td>${usuario.senha}</td><td>${usuario.pais}</td><td>${usuario.data_nascimento}</td><td>${idade}</td></tr>`;
    }
    html += '</tbody></table>';

    resultadoDiv.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    const btnEnviar = document.getElementById('btnEnviar');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', function(event) {
            event.preventDefault();
            cadastrar();
        });
    }

    if (document.getElementById('resultado')) {
        mostrarResultado();
    }
});
