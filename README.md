
# Coffee Lover App

Este projeto é uma aplicação web simples para uma loja de café, construída com Flask, SQLite e HTML/CSS. Ele inclui funcionalidades de login, cadastro, carrinho de compras e a possibilidade de finalizar pedidos.

## Funcionalidades

- **Autenticação de usuários**: Login e cadastro de novos usuários.
- **Carrinho de compras**: Adicionar produtos ao carrinho e finalizar pedidos.
- **Modal para finalizar compra**: Formulários para endereço de entrega, pagamento e confirmação de sucesso.

## Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas na sua máquina:

- [Python 3.x](https://www.python.org/)
- [pip](https://pip.pypa.io/en/stable/)

## Passo a passo para rodar o projeto localmente

### 1. Clonar o repositório

Clone este repositório em sua máquina local usando o Git:

```bash
git clone https://github.com/seu-usuario/coffe-lover-app.git
```

### 2. Acessar o diretório do projeto

Navegue até o diretório do projeto:

```bash
cd coffe-lover-app
```

### 3. Criar e ativar o ambiente virtual

Crie um ambiente virtual para isolar as dependências do projeto:

```bash
python -m venv venv
```

Ative o ambiente virtual:

- No Windows:

  ```bash
  venv\Scripts\activate
  ```

- No MacOS/Linux:

  ```bash
  source venv/bin/activate
  ```

### 4. Instalar as dependências

Instale as dependências do projeto listadas no arquivo `requirements.txt` (você pode criar este arquivo com as dependências necessárias):

```bash
pip install -r requirements.txt
```

Se você ainda não tem um arquivo `requirements.txt`, adicione as seguintes dependências ao arquivo:

```txt
Flask==2.0.1
Werkzeug==2.0.1
```

Ou instale manualmente as dependências:

```bash
pip install Flask Werkzeug
```

### 5. Configurar o banco de dados

O projeto usa SQLite como banco de dados. O arquivo `schema.sql` contém a estrutura inicial das tabelas.

### Estrutura do `schema.sql`

```sql
-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Tabela de associação entre pedidos e produtos
CREATE TABLE IF NOT EXISTS order_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);
```

### 6. Inicializar o banco de dados

Quando o projeto for iniciado, ele criará automaticamente as tabelas e adicionará um usuário e produtos padrão se eles ainda não existirem.

Usuário padrão:

- **Email**: joao.souza@gmail.com
- **Senha**: 123456

Produtos padrão:

- Café Latte, Cappuccino, Mocha, Macchiato, Americano, Frappuccino

### 7. Rodar o projeto

Agora você pode rodar o servidor Flask:

```bash
python app.py
```

O servidor estará rodando localmente em `http://127.0.0.1:8000/`.

### 8. Acessar o aplicativo

Abra o navegador e navegue até:

```
http://127.0.0.1:8000/
```

Você verá a página inicial da loja de café. Agora você pode se cadastrar, fazer login e usar o carrinho de compras.

## Estrutura de Arquivos

```
coffe-lover-app/
│
├── app.py                  # Arquivo principal da aplicação Flask
├── schema.sql              # Arquivo com o esquema do banco de dados
├── static/
│   ├── css/
│   └── js/
│
├── templates/
│   ├── index.html          # Página inicial da aplicação
│   ├── signup.html         # Página de cadastro
│   └── (outros templates)
│
├── requirements.txt        # Arquivo com as dependências do projeto
└── README.md               # Instruções para rodar o projeto
```

## Licença

Este projeto está licenciado sob a Licença MIT. Para mais detalhes, consulte o arquivo LICENSE.

---

### Observação:

Não se esqueça de ajustar o nome do repositório no GitHub e adicionar um arquivo `.gitignore` para evitar que o ambiente virtual e outros arquivos desnecessários sejam incluídos no repositório.
