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

// Função para finalizar o pedido e abrir o modal de entrega
function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    closeCart();  // Fecha o modal do carrinho
    document.getElementById('deliveryModal').style.display = 'flex';  // Abre o modal de entrega
}

// Função para fechar o modal de entrega e abrir o modal de pagamento
function nextToPayment() {
    const deliveryForm = document.getElementById('delivery-form');
    if (deliveryForm.checkValidity()) {
        document.getElementById('deliveryModal').style.display = 'none';
        document.getElementById('paymentModal').style.display = 'flex';
    } else {
        deliveryForm.reportValidity();  // Mostra os erros de validação, se houver
    }
}

// Função para confirmar a compra e abrir o modal de sucesso
function confirmPurchase() {
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm.checkValidity()) {
        document.getElementById('paymentModal').style.display = 'none';
        document.getElementById('successModal').style.display = 'flex';
        cart = [];  // Limpa o carrinho
        updateCart();  // Atualiza o carrinho
    } else {
        paymentForm.reportValidity();  // Mostra os erros de validação, se houver
    }
}

// Função para fechar o modal de sucesso e voltar à página inicial
function closeSuccess() {
    document.getElementById('successModal').style.display = 'none';
    window.location.href = "#home";  // Redireciona para a página inicial
}

// Funções para fechar modais individuais
function closeDelivery() {
    document.getElementById('deliveryModal').style.display = 'none';
}
function closePayment() {
    document.getElementById('paymentModal').style.display = 'none';
}