// Exercício 1 - Mensagem de boas-vindas ao entrar na página
function bemVindo() {
    alert("Bem-vindo ao portal da Seleção Portuguesa!");
};

// Exercício 2 - Interação com o título principal
const titulo = document.getElementById("titulo");

if (titulo) {
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
}

// Exercício 3 - Duplo clique no parágrafo de curiosidade
const curiosidade = document.getElementById("curiosidade");

if (curiosidade) {
    function mudar_curiosidade() {
        window.document.getElementById("curiosidade").innerText = 
            "Curiosidade: Portugal é o único país europeu a vencer a Eurocopa sem nunca ter sido campeão do mundo. " +
            "Além disso, Cristiano Ronaldo é o maior artilheiro da história das seleções europeias!";
    }
}

// Exercício Extra - Interação com a imagem
const imagem = document.getElementById("imagem-selecao");

if (imagem) {
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
}


// Integração com o banco de dados

function getInputs(){
    return {
        nome: document.getElementById('nome'),
        data_nascimento: document.getElementById('data_nascimento'),
        email: document.getElementById('email'),
        pais: document.getElementById('pais'),
        select_jogador: document.getElementById('jogador_favorito')
    };
}

function getValores({nome, data_nascimento, email, pais, select_jogador}){
    return {
        nome: nome.value.trim(),
        data_nascimento: data_nascimento.value.trim(),
        email: email.value.trim(),
        pais: pais.value.trim(),
        jogador_favorito: select_jogador.value.trim()
    };
}

async function cadastrar(){
    const inputs = getInputs();
    const dados = getValores(inputs);
    console.log('passe aqui');
    await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    window.location.href = './../pages/resultados.html';
}

function calcularIdade(dataNascimento) {
    const anoHoje = new Date().getFullYear();
    const anoNascimento = new Date(dataNascimento).getFullYear();
    const idade = anoHoje - anoNascimento;

    return idade;
}

async function mostrarResultado(){
    const resultadoDiv = document.getElementById('resultado');
    console.log('passei aqui2');
    const resposta = await fetch('/api/usuarios');
    const usuarios = await resposta.json();

    if (usuarios.length === 0) {
        resultadoDiv.innerHTML = '<p>Nenhum usuario cadastrado ainda.</p>';
        return;
    }

    let html = '<table><thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>País</th><th>Data de Nascimento</th><th>Idade</th><th>Jogador Favorito</th></tr></thead><tbody id="resultado-tbody">';
    
    for (const usuario of usuarios) {
        const idade = calcularIdade(usuario.data_nascimento);

        html += `<tr><td>${usuario.id}</td><td>${usuario.nome}</td><td>${usuario.email}</td><td>${usuario.pais}</td><td>${usuario.data_nascimento}</td><td>${idade}</td><td>${usuario.jogador_favorito}</td></tr>`;
    }
    html += '</tbody></table>';

    resultadoDiv.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    const btnEnviar = document.getElementById('enviar');
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
