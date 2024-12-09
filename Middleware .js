import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL;

// Middleware para redirecionar requisições
app.use(express.json());

app.use('/api', async (req, res) => {
    try {
        const url = `${API_BASE_URL}${req.url}`;
        const response = await axios({
            method: req.method,
            url: url,
            data: req.body,
            headers: req.headers,
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erro no middleware:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Erro ao acessar a API' });
    }
});

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Middleware rodando em http://localhost:${PORT}`);
});