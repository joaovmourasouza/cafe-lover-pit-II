function openLoginForm() {
    document.getElementById('loginModal').style.display = 'flex';
    document.body.classList.add('modal-open');
}

function closeLoginForm() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.classList.remove('modal-open');
}

let cart = [];  // Array para armazenar os itens do carrinho

// Função para abrir o modal do carrinho
function openCart() {
    document.getElementById('cartModal').style.display = 'flex';
    document.body.classList.add('modal-open');
    updateCart();  // Atualiza a exibição do carrinho
}

// Função para fechar o modal do carrinho
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
    document.body.classList.remove('modal-open');
}

// Função para adicionar um item ao carrinho
function addToCart(productName, productPrice) {
    // Verifica se o item já está no carrinho
    let product = cart.find(item => item.name === productName);
    
    if (product) {
        product.quantity += 1;  // Se o produto já existir no carrinho, aumenta a quantidade
    } else {
        // Se o produto não existir, adiciona um novo item ao carrinho
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    updateCart();  // Atualiza o carrinho após a adição
}

// Função para atualizar o conteúdo do modal do carrinho
function updateCart() {
    let cartItemsDiv = document.getElementById('cart-items');
    let cartTotal = 0;
    cartItemsDiv.innerHTML = '';  // Limpa o conteúdo atual

    // Adiciona cada item do carrinho ao modal
    cart.forEach(item => {
        cartTotal += item.price * item.quantity;
        cartItemsDiv.innerHTML += `
            <div>
                <span>${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });

    // Atualiza o valor total
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
}

// Função para finalizar o pedido
function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // Aqui você pode enviar o carrinho para o backend, por exemplo, via AJAX
    alert("Pedido finalizado! Total: R$ " + document.getElementById('cart-total').textContent);
    cart = [];  // Limpa o carrinho
    updateCart();  // Atualiza a exibição do carrinho
    closeCart();  // Fecha o modal
}