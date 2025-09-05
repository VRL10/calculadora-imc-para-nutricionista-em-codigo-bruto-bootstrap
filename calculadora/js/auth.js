// ===== AUTENTICAÇÃO SOCIAL =====
function loginWithGoogle() {
    // Simulação de login com Google
    currentUser = {
        name: "Usuário Google",
        email: "user.google@example.com",
        avatar: "G",
        provider: "google"
    };
    
    localStorage.setItem('imcUser', JSON.stringify(currentUser));
    updateUserProfile();
    
    alert(translations[currentLanguage].login_google + " (simulado)");
}

function loginWithMicrosoft() {
    // Simulação de login com Microsoft
    currentUser = {
        name: "Usuário Microsoft",
        email: "user.microsoft@example.com",
        avatar: "M",
        provider: "microsoft"
    };
    
    localStorage.setItem('imcUser', JSON.stringify(currentUser));
    updateUserProfile();
    
    alert(translations[currentLanguage].login_microsoft + " (simulado)");
}

function logout() {
    currentUser = null;
    localStorage.removeItem('imcUser');
    updateUserProfile();
}

function updateUserProfile() {
    const socialLoginSection = document.getElementById('social-login-section');
    const userProfileSection = document.getElementById('user-profile');
    
    if (currentUser) {
        socialLoginSection.style.display = 'none';
        userProfileSection.style.display = 'flex';
        document.getElementById('user-avatar').textContent = currentUser.avatar;
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('user-email').textContent = currentUser.email;
    } else {
        socialLoginSection.style.display = 'flex';
        userProfileSection.style.display = 'none';
    }
}