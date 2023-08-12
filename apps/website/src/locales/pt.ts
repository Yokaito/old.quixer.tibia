export default {
  quixer: {
    errors: {
      email: 'Por favor, insira um endereço de e-mail válido',
      minLength: 'Por favor, insira pelo menos {min} caracteres',
      maxLength: 'Por favor, insira no máximo {max} caracteres',
      required: 'Este campo é obrigatório',
      invalidLogin: 'Credenciais de login inválidas',
    },
    account: {
      management: 'Gerenciamento de conta',
      form: 'Login da conta',
      login: 'Entrar',
      email: 'Email',
      password: 'Senha',
    },
    box: {
      login: {
        login: 'Entrar',
        loggedIn: 'Minha conta',
        logout: 'Sair',
        register: 'Registrar',
      },
      download: {
        download: 'Baixar',
      },
    },
    menu: {
      item: {
        news: 'Notícias',
        'latest-news': 'Últimas notícias',
        'news-archive': 'Arquivo de notícias',
        'event-schedule': 'Calendário de eventos',
      },
    },
    info: {
      bar: {
        online: 'Players Online',
        fankit: 'Fankit',
      },
    },
  },
} as const
