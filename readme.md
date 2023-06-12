# Simples backend de cadastro e autenticação de usuário

## Introdução

Esse é um backend com um simples cadastro de usuário e autenticação, também possui uma simples regras de permissões.

Conta com uma base de dados fake apenas para testes, a base já vai com um cadastro de nível administrativo.

As permissões estão dividas em duas partes, user e admin.

Foi desenvolvido em node versão 16.15.0

### Role user
O que pode fazer ?

Visualizar outros cadastros (todos ou individual)
Editar o próprio cadastro.

O que não pode fazer?

Editar suas permissões
Excluir seu cadastro.

### Role admin

O que não pode fazer?

O usuário com permissão admin poderá executar o CRUD completo em qualquer cadastro.



## Como executar ?

```bs
Faça a cópia do repositório:
git clone git@github.com:gleisoncoruja/auth-node.git 

Entre na pasta do projeto e instale as dependências:
yarn install

Renomeie o arquivo .env-copy para .env:

Execute o servidor:
npm start

Abra no seu navegador:
http://localhost:3000/

Se tudo estiver correto aparecerá a seguinte mensagem:

Api Working!

```

## Quais são os endpoints e como testar?

### Antes de mais nada recomendo utilizar o postman ou insomnia para realizer os teste.

### Autenticação 
```bs
Endpoint
POST - http://localhost:3000/api/users/auth

body json
{	
	"username": "admin",
	"password": "sfcBrazil"
}

Exemplo de retorno
{
	"userId": 1,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODY1NDY3NTQsImV4cCI6MTY4NjgwNTk1NH0.-MIxccnj12d8pp776oLINq3m5HNMWSxRdL701Kbnrck"
}
```

### Listar usuários 
```bs
Endpoint
GET - http://localhost:3000/api/users/

Exemplo de retorno
[
	{
		"id": 1,
		"name": "Administrador",
		"job": "CTO",
		"email": "admin@sfcbrazil.com",
		"username": "admin",
		"role": [
			"user",
			"admin"
		],
		"readings": 0
	}
]
```

### Retornar informações por username
```bs
Endpoint
GET - http://localhost:3000/api/users/user/{username}

Exemplo de retorno
{
	"id": 1,
	"name": "Administrador",
	"job": "CTO",
	"email": "admin@sfcbrazil.com",
	"username": "admin",
	"role": [
		"user",
		"admin"
	],
	"readings": 1
}
```

### Retornar informações do usuário logado
```bs
Endpoint
GET - http://localhost:3000/api/users/user/

Exemplo de retorno
{
	"id": 1,
	"name": "Administrador",
	"job": "CTO",
	"email": "admin@sfcbrazil.com",
	"username": "admin",
	"role": [
		"user",
		"admin"
	],
	"readings": 1
}
```

### Retornar visualizações recebidas no cadastro
```bs
Endpoint
GET - http://localhost:3000/api/users/user/{username}/readings

Exemplo de retorno
{
	"msg": "Usuário Administrador foi lido 4 vezes"
}
```

### Cadastrar usuário
```bs
Endpoint
POST - http://localhost:3000/api/users/

body json
{
	"name": "Gleison Souza",
	"job": "Desenvolvedor FullStack",
	"email": "gleison.lsouza@gmail.com",
	"username": "gleison",
	"password": "sfcBrazil"
}

Exemplo de retorno
{
	"userId": 2,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiZ2xlaXNvbiIsImlhdCI6MTY4NjU0NzE0NywiZXhwIjoxNjg2ODA2MzQ3fQ.04uFYLr7j8k9PobIYT4jjsp78SnzNA2S9FKSpBho1QY"
}
```

### Editar usuário
```bs
Endpoint
PATCH - http://localhost:3000/api/users/user/{username}

body json
{
	"name": "Gleison Lopes",
    "role": [
			"user",
			"admin"
		],
}

Exemplo de retorno
{
	"id": 2,
	"name": "Gleison Lopes",
	"job": "Programador FullStack",
	"role": [
		"user",
        "admin"
	],
	"email": "gleison@gmail.com.br",
	"username": "gleison",
	"readings": 0
}
```

### Deletar usuário
```bs
Endpoint
DELETE - http://localhost:3000/api/users/user/{username}


Exemplo de retorno
{
	"msg": "Usuário gleison deletado com sucesso!"
}
```

