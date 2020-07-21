// import 'reflect-metadata';
// import dotenv from 'dotenv';
import app from '@shared/infra/http/app';

// dotenv.config();

const PORT = process.env.PORT || 3333;
app.listen(PORT, () =>
  console.log(`Servidor Iniciado em http://${process.env.HOST}:${PORT}`),
);
