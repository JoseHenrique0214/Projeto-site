// Sistema de Autenticação - MarketWatch

// Configuração de usuários (em produção, isso seria um backend)
const USUARIOS = {
    'admin@marketwatch.com': {
        senha: '1234',
        nome: 'Administrador'
    }
};

// Chave para armazenar dados no localStorage
const STORAGE_KEY = 'marketwatch_auth';
const USERS_KEY = 'marketwatch_users';

// Inicializa usuários cadastrados no localStorage
function inicializarUsuarios() {
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify(USUARIOS));
    }
}

// Obtém todos os usuários
function obterUsuarios() {
    const usuarios = localStorage.getItem(USERS_KEY);
    return usuarios ? JSON.parse(usuarios) : USUARIOS;
}

// Salva novo usuário
function salvarUsuario(email, senha, nome) {
    const usuarios = obterUsuarios();
    usuarios[email] = { senha, nome };
    localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
}

// Valida email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Valida credenciais
function validarCredenciais(email, senha) {
    const usuarios = obterUsuarios();
    return usuarios[email] && usuarios[email].senha === senha;
}

// Faz login
function fazerLogin(email, senha, lembrar = false) {
    if (!validarEmail(email)) {
        return { sucesso: false, mensagem: 'Email inválido' };
    }

    if (!senha || senha.length < 4) {
        return { sucesso: false, mensagem: 'Senha deve ter no mínimo 4 caracteres' };
    }

    if (!validarCredenciais(email, senha)) {
        return { sucesso: false, mensagem: 'Email ou senha incorretos' };
    }

    const usuarios = obterUsuarios();
    const usuario = {
        email: email,
        nome: usuarios[email].nome,
        loginTime: new Date().toISOString(),
        lembrar: lembrar
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    return { sucesso: true, usuario };
}

// Faz logout
function fazerLogout() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = 'login.html';
}

// Verifica se está logado
function verificarAutenticacao() {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (!dados) return null;

    try {
        const usuario = JSON.parse(dados);
        // Verifica se o login não expirou (24h para logins sem "lembrar")
        if (!usuario.lembrar) {
            const loginTime = new Date(usuario.loginTime);
            const agora = new Date();
            const diferencaHoras = (agora - loginTime) / (1000 * 60 * 60);
            
            if (diferencaHoras > 24) {
                fazerLogout();
                return null;
            }
        }
        return usuario;
    } catch (error) {
        return null;
    }
}

// Protege a página (redireciona para login se não autenticado)
function protegerPagina() {
    const usuario = verificarAutenticacao();
    if (!usuario) {
        window.location.href = 'login.html';
    }
    return usuario;
}

// ============= PÁGINA DE LOGIN =============

if (window.location.pathname.includes('login.html')) {
    inicializarUsuarios();

    // Verifica se já está logado
    const usuarioLogado = verificarAutenticacao();
    if (usuarioLogado) {
        window.location.href = 'index.html';
    }

    // Form de login
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const emailError = document.getElementById('emailError');
    const senhaError = document.getElementById('senhaError');
    const lembrarCheckbox = document.getElementById('lembrar');

    // Toggle mostrar/ocultar senha
    document.getElementById('togglePassword')?.addEventListener('click', function() {
        const input = senhaInput;
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    // Submit do login
    loginForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpa erros
        emailError.textContent = '';
        senhaError.textContent = '';

        const email = emailInput.value.trim();
        const senha = senhaInput.value;
        const lembrar = lembrarCheckbox.checked;

        // Validações
        if (!validarEmail(email)) {
            emailError.textContent = 'Por favor, insira um email válido';
            emailInput.focus();
            return;
        }

        const resultado = fazerLogin(email, senha, lembrar);

        if (!resultado.sucesso) {
            senhaError.textContent = resultado.mensagem;
            senhaInput.focus();
            return;
        }

        // Login bem-sucedido
        console.log('✅ Login realizado com sucesso!');
        console.log('Usuário:', resultado.usuario);
        
        // Animação de sucesso
        const btnLogin = document.querySelector('.btn-login');
        const btnText = btnLogin.querySelector('.btn-text');
        btnText.textContent = 'Entrando...';
        btnLogin.style.background = 'linear-gradient(135deg, #00cc88, #00cc88)';
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    });

    // Modal de criar conta
    const criarContaLink = document.getElementById('criarContaLink');
    const criarContaModal = document.getElementById('criarContaModal');
    const closeModal = document.getElementById('closeModal');
    const cadastroForm = document.getElementById('cadastroForm');

    criarContaLink?.addEventListener('click', function(e) {
        e.preventDefault();
        criarContaModal.classList.add('active');
    });

    closeModal?.addEventListener('click', function() {
        criarContaModal.classList.remove('active');
        cadastroForm.reset();
    });

    criarContaModal?.addEventListener('click', function(e) {
        if (e.target === criarContaModal) {
            criarContaModal.classList.remove('active');
            cadastroForm.reset();
        }
    });

    // Submit do cadastro
    cadastroForm?.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('novoNome').value.trim();
        const email = document.getElementById('novoEmail').value.trim();
        const senha = document.getElementById('novaSenha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        // Validações
        if (!validarEmail(email)) {
            alert('Por favor, insira um email válido');
            return;
        }

        if (senha.length < 4) {
            alert('A senha deve ter no mínimo 4 caracteres');
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem');
            return;
        }

        const usuarios = obterUsuarios();
        if (usuarios[email]) {
            alert('Este email já está cadastrado');
            return;
        }

        // Salva novo usuário
        salvarUsuario(email, senha, nome);
        
        alert('Conta criada com sucesso! Faça login para continuar.');
        criarContaModal.classList.remove('active');
        cadastroForm.reset();
        
        // Preenche os campos de login
        emailInput.value = email;
        senhaInput.focus();
    });

    // Esqueceu senha
    document.querySelector('.forgot-password')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Para recuperar sua senha, entre em contato com o suporte.\n\nPara demonstração, use:\nEmail: admin@marketwatch.com\nSenha: 1234');
    });
}

// ============= OUTRAS PÁGINAS =============

// Exporta funções para uso global
window.fazerLogout = fazerLogout;
window.verificarAutenticacao = verificarAutenticacao;
window.protegerPagina = protegerPagina;

console.log('🔐 Sistema de autenticação carregado');
