export default {
  quixer: {
    success: {
      createAccount: 'Conta criada com sucesso! Entrando...',
    },
    errors: {
      email: 'Por favor, insira um endereço de e-mail válido',
      minLength: 'Por favor, insira pelo menos {min} caracteres',
      maxLength: 'Por favor, insira no máximo {max} caracteres',
      required: 'Este campo é obrigatório',
      invalidLogin: 'Credenciais de login inválidas',
      passwordMatch: 'As senhas não coincidem',
      consent: 'Você deve consentir em armazenar suas sessões de jogo.',
      terms: 'Você deve concordar com o Contrato de Serviço Tibia.',
    },
    geral: {
      attention: 'Atenção',
      name: 'Nome',
      email: 'Email',
      password: 'Senha',
      confirmPassword: 'Confirmar Senha',
      fieldConsent: 'Consentimento',
      fieldTerms: 'Termos',
      consent:
        'Eu concordo que a CipSoft GmbH salve sessões de jogo com o único propósito de melhorar a experiência de jogo ou fazer cumprir as Regras do Tibia. As sessões de jogo salvas conterão toda a experiência do usuário, incluindo, entre outros, bate-papos e interação do jogador. Estou ciente de que posso revogar meu consentimento para o armazenamento de minhas sessões de jogo a qualquer momento na página de gerenciamento de minha conta no Tibia.',
      terms:
        'Eu concordo com o Acordo de Serviço do Tibia, as Regras do Tibia e a Política de Privacidade do Tibia.',
      createAccount: 'Criar Conta',
      selectCheckbox: 'Marque a seguinte caixa de seleção:',
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
        general: 'Informações gerais',
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
      general: {
        labels: {
          email: 'Endereço de e-mail:',
          created: 'Criado:',
          lastLogin: 'Último login:',
          accountStatus: 'Status da conta:',
          tibiaCoins: 'Tibia Coins:',
          loyaltyPoints: 'Pontos de fidelidade:',
          loyaltyTitle: 'Título de fidelidade:',
        },
      },
      status: {
        free: 'Conta gratuita',
        premium: 'Conta premium',
        freePremium: 'Conta premium gratuita',
        freePermanent: 'Seu premium não expira',
        timeExpired: 'Seu tempo premium expirou em',
        timeLeft: 'Seu tempo premium expira em',
        balance: 'Saldo de dias premium é: {days}',
      },
      actions: {
        menage: 'Gerenciar conta',
        premium: 'Comprar premium',
        logout: 'Sair',
        changePassword: 'Alterar senha',
        changeEmail: 'Alterar e-mail',
        terminate: 'Encerrar conta',
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
