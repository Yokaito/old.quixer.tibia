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
      characters: {
        create: 'Criar personagem',
        table: {
          name: 'Nome',
          status: 'Status',
          actions: 'Ações',
        },
      },
      titles: {
        status: 'Status da conta',
        characters: 'Personagens',
      },
      hello: `Bem-vindo à sua conta {name}`,
      premium: {
        benefits: {
          outfits: 'usar roupas Premium',
          hunting: 'use dois slots de tarefa de caça gratuitamente',
          battle:
            'organizar personagens e criaturas próximos na listas de batalha',
        },
      },
      status: {
        free: 'Conta gratuita',
        premium: 'Conta premium',
        timeExpired: 'Seu tempo premium expirou em',
        timeLeft: 'Seu tempo premium expira em',
        balance: 'Saldo de tempo premium {days} dias',
      },
      actions: {
        menage: 'Gerenciar conta',
        premium: 'Comprar premium',
        logout: 'Sair',
      },
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
