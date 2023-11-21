const logout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
    alert('Você deslogou com sucesso.')
}

export default logout