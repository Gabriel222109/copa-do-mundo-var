const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const PORTA = 3000;

const db = new DatabaseSync(path.join(__dirname, 'meubanco.db'));

db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    data_nascimento TEXT,
    email TEXT,
    pais TEXT,
    jogador_favorito TEXT
)`);

const servidor = http.createServer(async (req, res) => {

    if (req.url === '/api/usuarios' && req.method === 'GET') {
        const usuarios = db.prepare('SELECT * FROM usuarios ORDER BY id DESC').all();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(usuarios));
        return;
    }

    if (req.url === '/api/usuarios' && req.method === 'POST') {
        let corpo = '';
        for await (const pedaco of req) corpo += pedaco;  
        const dados = JSON.parse(corpo);
        
        db.prepare("INSERT INTO usuarios (nome, data_nascimento, email, pais, jogador_favorito) VALUES (?, ?, ?, ?, ?)") 
          .run(dados.nome, dados.data_nascimento, dados.email, dados.pais, dados.jogador_favorito);
        
        res.end('ok');
        return;
    }

    const paginaInicial = req.url === '/' ? '/index.html' : req.url;
    
    if (paginaInicial.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    } else if (paginaInicial.endsWith('.js')) {
        res.setHeader('Content-Type', 'text/javascript');
    } else if (paginaInicial.match(/\.(png|jpeg|jpg|avif|gif)$/)) {
        res.setHeader('Content-Type', 'image/*');
    }

    fs.readFile(path.join(__dirname, paginaInicial), (erro, conteudo) => {
        res.end(erro ? 'Arquivo não encontrado' : conteudo);
    });
});

servidor.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});