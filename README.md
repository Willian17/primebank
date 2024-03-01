<h1 align="center"> PrimeBank </h1>


  <p align="center">
    <img alt="Last commit" src="https://img.shields.io/github/last-commit/Willian17/primebank">
    <img alt="stars" src="https://img.shields.io/github/stars/Willian17/primebank?logo=github">
    <img alt="size" src="https://img.shields.io/github/repo-size/Willian17/primebank">
    <img alt="license" src="https://img.shields.io/github/license/Willian17/primebank">
  </p>
  
  <p align="center">
    <a href="#sobre">Sobre</a> •
    <a href="#funcionalidades">Funcionalidades</a> •
    <a href="#executar">Executar</a> •
    <a href="#tecnologias">Tecnologias</a> •
    <a href="#contribuidores">Contribuidores</a> •
    <a href="#contribuir">Contribuir</a> •
    <a href="#licenca">Licença</a>
  </p>
  
  [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#sobre-o-projeto)

  ## :pushpin: Sobre o Projeto <a name="sobre"></a>
  <div>
  <p>Controlar Saldos das Contas Bancárias dos Clientes.</p>
  <img src="https://github.com/Willian17/primebank/assets/53010824/2725048d-42b1-4463-ab3c-6afbb6f083bb" width="400px">
  </div>
  
  [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#funcionalidades)

  ## :rocket: Funcionalidades <a name="funcionalidades"></a>

 - [x] Criação de conta bancária
 - [x] Realizar Transação
 - [x] Relatório consolidado
 - [x] Extrato bancário
  
  [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#executar)

  ## :construction_worker: Como executar <a name="executar"></a>

  ### Pré-requisitos
  Ter o <a href="https://nodejs.org/en/">Node.js</a> instalado na maquina.
  
  Rodar o PostegreSQL local
  
  ### Clonar Repositório
  $ git clone https://github.com/Willian17/primebank.git
  
  ### Instalar Dependencias backend
  ```
  $ cd backend
  ```
  ```
  $ npm install
  ```
  ### Configuração
  copiar arquivo .env.example na raiz do projeto, colar com o nome .env. Preencher os dados de conexão com o banco postgreSQL

  ### Executar migrations SQL
  ```
  $ npm run migration:run
  ```
  
  ### Executar Aplicação
  ```
  $ npm start:dev
  ```

  ### Instalar Dependencias frontend
  ```
  $ cd frontend
  ```
  ```
  $ npm install
  ```
  ### Configuração
  copiar arquivo .env.example na raiz do projeto, colar com o nome .env. Preencher os dados em relação a API

  ### Executar Aplicação
   ```
  $ npm start
  ```
  

  

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](##tecnologias)

## :computer: Tecnologias <a name="tecnologias"></a>
<ul>
<li>NestJS</li>
<li>React</li>
<li>PrimeReact</li>
<li>PostgreSQL</li>
<li>TypeORM</li>
</ul>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)

## 🤝 Contribuidores <a name="contribuidores"></a>

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<a href = "https://github.com/Willian17/primebank/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=Willian17/primebank"/>
</a>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contribuidores)

## 😄 Seja um dos contribuidores<br> <a name="contribuir"></a>

Contribuições são sempre bem-vindas!

1. Fork o Projeto
2. Criar uma Branch (git checkout -b feature/AmazingFeature)
3. Commit suas alterações (git commit -m 'Add some AmazingFeature)
4. Push na Branch (git push origin feature/AmazingFeature)
5. Abra um Pull Request


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#licensa)

## 📝 Licença <a name="licenca"></a>

Esse projeto está sob licença [MIT](LICENSE).

## :man_astronaut: Mostre seu apoio 

Dê uma ⭐️ se esse projeto te ajudou!
