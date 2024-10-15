function openLoginForm() {
    document.getElementById('loginModal').style.display = 'flex';
    document.body.classList.add('modal-open');
}

function closeLoginForm() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.classList.remove('modal-open');
}