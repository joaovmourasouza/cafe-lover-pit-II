from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    with open('schema.sql', 'r') as f:
        cursor.executescript(f.read())

    cursor.execute("SELECT * FROM users WHERE email = ?", ('joao.souza@gmail.com',))
    user = cursor.fetchone()

    if not user:
        password_hashed = generate_password_hash('123456', method='pbkdf2:sha256', salt_length=8)
        cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", ('joao.souza@gmail.com', password_hashed))

    cursor.execute("SELECT * FROM products WHERE name = ?", ('cafe Latte',))
    product = cursor.fetchone()

    if not product:
        cursor.execute("INSERT INTO products (name, price) VALUES (?, ?)", ('cafe Latte', 12.99))
        cursor.execute("INSERT INTO products (name, price) VALUES (?, ?)", ('cappuccino', 14.99))
        cursor.execute("INSERT INTO products (name, price) VALUES (?, ?)", ('mocha', 16.49))
        cursor.execute("INSERT INTO products (name, price) VALUES (?, ?)", ('macchiato', 13.49))
        cursor.execute("INSERT INTO products (name, price) VALUES (?, ?)", ('americano', 10.99))
        cursor.execute("INSERT INTO products (name, price) VALUES (?, ?)", ('frappuccino', 18.99))

    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    if user and check_password_hash(user['password'], password):
        flash('Login bem-sucedido!')
        return redirect(url_for('index'))
    else:
        flash('Usuário ou senha inválidos.')
        return redirect(url_for('index'))
    
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        hashed_password = generate_password_hash(password)

        conn = get_db_connection()
        conn.execute('INSERT INTO users (email, password) VALUES (?, ?)', (email, hashed_password))
        conn.commit()
        conn.close()

        flash('Cadastro realizado com sucesso! Faça login.')
        return redirect(url_for('index'))

    return render_template('signup.html')

if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=8000)