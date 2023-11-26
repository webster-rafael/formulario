const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

// Servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

// Rota padrão
app.get('/', (req, res) => {
    res.send('Bem-vindo ao meu servidor!');
});

// ... (restante do seu código)

// Rota para lidar com o formulário
app.post('/enviar-email', upload.single('Documento'), (req, res) => {
    // ... (restante do seu código)

    // Enviar e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.redirect('https://form-ong.cyclic.app/email-error.html'); // redireciona para a página de erro
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.redirect('https://form-ong.cyclic.app/email-sucess.html'); // redireciona para a página de sucesso
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
