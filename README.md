# Desafio VirteX

## Descrição

Descrição do projeto ...

---

### Dependências necessárias para a execução do projeto

Para executar essa aplicação tenha instalado na sua máquina:

- Node
- Docker
- Docker Compose

---

### Como baixar o projeto

Faça o download do repositório para a sua máquina usando o comando abaixo

> git clone https://github.com/samucka98/DesafioVirteX.git

---

### Instalação de dependencias

Dentro do diretório **server** digite o comando abaixo

> npm install

Dentro do diretório **client** digite o comando abaixo

> npm install

---

### Subindo o banco de dados

Dentro do diretório **desafiovirtex** digite o comando abaixo

> docker-compose up -d

---

### Executando o WebServer

Dentro do diretório **server** digite o comando abaixo

> npm run dev

---

### Executando o Front-end

Dentro do diretório **client** digite o comando abaixo

> npm run dev

Você terá a aplicação rodando na porta 3000 e poderá acessar abrindo um navegador e digitando a url

> http://localhost:3000

---

### Endpoints

| Method | Recurso      | Descrição                                                                                                 |
| ------ | ------------ | --------------------------------------------------------------------------------------------------------- |
| _GET_  | `/load-data` | Lê os arquivos dentro do diretório **server/inputs** estaticamente e realiza o registro no banco de dados |
| _GET_  | `/get-data`  | Recupera os dados registrados no banco                                                                    |
