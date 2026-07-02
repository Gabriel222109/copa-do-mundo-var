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
    document.getElementById("escocia").style.color = "#23c145";
}

function mudar_cor2() {
    document.getElementById("brasil").style.color = "#23c145";
}

function mudar_cor3() {
    document.getElementById("marrocos").style.color = "#23c145";
}

function mudar_cor4() {
    document.getElementById("haiti").style.color = "#ff0000";
}

function retornar_cor1() {
    document.getElementById("escocia").style.color = "#000000";
}

function retornar_cor2() {
    document.getElementById("brasil").style.color = "#000000";
}

function retornar_cor3() {
    document.getElementById("marrocos").style.color = "#000000";
}

function retornar_cor4() {
    document.getElementById("haiti").style.color = "#000000";
}
