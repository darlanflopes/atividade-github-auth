// auth.js - Módulo de Autenticação JWT
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'minha_chave_secreta_super_segura';

function gerarToken(usuario) {
    return jwt.sign({ id: usuario.id, email: usuario.email }, SECRET_KEY, { expiresIn: '1h' });
}

function autenticarToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Acesso negado: Token não fornecido.' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido ou expirado.' });
        req.user = decoded;
        next();
    });
}

module.exports = { gerarToken, autenticarToken };