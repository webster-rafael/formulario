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


//  Nodemailer

require('dotenv').config({ path: 'senha.env' });


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Exemplo: 'gmail'
    port: 465,
    secure: true,
    auth: {
        user: 'webster.dev2024@gmail.com',
        pass: 'mkuy xkar twzu nptz'
    }
});

// Configurar o Multer para processar o upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware para analisar dados do formulário e arquivos
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para lidar com o formulário
app.post('/enviar-email', upload.single('Documento'), (req, res) => {
    const { Name, Email, Adotar } = req.body;

    // Configurar o e-mail
    const mailOptions = {
        from: 'seu-email@example.com',
        to: 'webster.dev2024@gmail.com', // Substitua pelo e-mail do destinatário
        subject: 'Novo Formulário Recebido',
        text: `Nome: ${Name}\nEmail: ${Email}\nAdotar: ${Adotar}`,
        attachments: [
            {
                filename: 'documento.jpg', // Nome do arquivo no e-mail
                content: req.file.buffer, // Dados binários da imagem
                encoding: 'base64'
            }
        ]
    };

    // Enviar e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.redirect('/email-error.html'); // redireciona pra pagina de erro
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.redirect('/email-sucess.html'); // redireciona pra pagina de sucesso
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
  });

