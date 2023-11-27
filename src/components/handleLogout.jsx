const logout = () => {
    alert('Você deslogou com sucesso.')
    localStorage.removeItem('token');
    localStorage.removeItem('urlcontrol')
    localStorage.removeItem('urlcontrolnewpass')
    window.location.href = '/login';
}

export default logout