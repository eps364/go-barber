import 'reflect-metadata';
import app from '@shared/infra/http/app';

const PORT = process.env.PORT || 3333;
app.listen(PORT, () =>
  console.log(`Servidor Iniciado em http://${process.env.HOST}:${PORT}`),
);
