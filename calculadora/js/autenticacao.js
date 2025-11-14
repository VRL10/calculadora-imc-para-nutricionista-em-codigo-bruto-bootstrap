// ---- AUTENTICAÇÃO SOCIAL---
function loginComGoogle() {
    // Simulação de login com Google
    usuarioAtual = {
        nome: "Usuário Google",
        email: "usuario.google@exemplo.com",
        avatar: "G",
        provedor: "google"
    };
    
    localStorage.setItem('usuarioIMC', JSON.stringify(usuarioAtual));
    atualizarPerfilUsuario();
    
    alert(traducoes[idiomaAtual].login_google + " (simulado)");
}

function loginComMicrosoft() {
    // Simulação de login com Microsoft
    usuarioAtual = {
        nome: "Usuário Microsoft",
        email: "usuario.microsoft@exemplo.com",
        avatar: "M",
        provedor: "microsoft"
    };
    
    localStorage.setItem('usuarioIMC', JSON.stringify(usuarioAtual));
    atualizarPerfilUsuario();
    
    alert(traducoes[idiomaAtual].login_microsoft + " (simulado)");
}

function logout() {
    usuarioAtual = null;
    localStorage.removeItem('usuarioIMC');
    atualizarPerfilUsuario();
}

function atualizarPerfilUsuario() {
    const secaoLoginSocial = document.getElementById('secao-login-social');
    const secaoPerfilUsuario = document.getElementById('secao-perfil-usuario');
    
    if (usuarioAtual) {
        secaoLoginSocial.style.display = 'none';
        secaoPerfilUsuario.style.display = 'flex';
        document.getElementById('avatar-usuario').textContent = usuarioAtual.avatar;
        document.getElementById('nome-usuario').textContent = usuarioAtual.nome;
        document.getElementById('email-usuario').textContent = usuarioAtual.email;
    } else {
        secaoLoginSocial.style.display = 'flex';
        secaoPerfilUsuario.style.display = 'none';
    }
}