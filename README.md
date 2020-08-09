# Configurando o ambiente

Antes de tudo será preciso criar uma instância do banco de dados na máquina em que esse projeto será testado. Até ia rolar um setup com docker mas com esse prazo não vai rolar.

O banco deve ser criado com o `username=root` e `password=null`. Todo o restante será feito pelo sequelize depois que o comando de _migrations_ for executado.

Este projeto foi construido usando a ferramenta [Lerna](https://lerna.js.org/) pra que ficasse mais legal trabalhar com _monorepos_.

### Instalando as dependencias do projeto

```shell
npx lerna bootstrap
```

### Rodando as migrations e seeds no banco

```shell
npx lerna run predev
```

Este comando roda toda vez que o comando `npm run dev` for chamado. Aqui, estamos chamando ele sozinho porque vamos executar o comando 'npx start' pra todos os pacotes do projeto.

### Levantando o projeto

```shell
npx lerna run --stream start
```

Se tudo deu certo, o webapp estará rodando no endereço http://localhost:8080 e a api no http://localhost:5000.

## Testes

Apenas a api possui testes e é possível rodar os testes executando o comando `npx lerna run test` ou `npm test` direto na do diretório da api.

Qualquer dúvida, chama que a gente conversa.
