const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2468Reis@',
    database: 'minha_api_db'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectat ao Mysql: ', err);
        return
    }

    console.log('Conectado ao banco de dados com sucesso!');
});


// GET: LISTA USUARIOS


app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM  usuarios';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ err0: 'Erro ao buscar usuarios' });
        }
        res.json(results);
    });
});

//post: criar usuario

app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatorios ' });
    }

    const sql = 'INSERT INTO usuarios(nome, email) VALUES (?, ?)';

    db.query(sql, [nome, email], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao cadastrar usuario' });
        }

        res.status(201).json({
            mensagem: 'Usuario cadastrado com sucesso!',
            id: results.insertId,
            nome,
            email
        });

    });

});

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`servidor rodando na porta ${PORTA} (http://localhost:${PORTA})`);
});
