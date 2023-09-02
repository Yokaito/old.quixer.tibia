export default {
  quixer: {
    admin: {
      title: 'Gerenciamento do servidor',
    },
    character: {
      create: {
        guide:
          'Por favor, escolha um nome e sexo para o seu personagem, bem como o mundo do jogo em que você deseja que o personagem viva. Se você não consegue pensar em nenhum nome fantasioso, clique no link abaixo do campo do nome para obter algumas sugestões de nomes. Em qualquer caso, o nome não deve violar as convenções de nomenclatura estabelecidas nas Regras do Tibia, ou seu personagem poderá ser excluído ou o nome bloqueado.',
        worlds: 'Mundos',
        filter: 'Filtrar por localização do mundo do jogo',
        filterDescription:
          'Para uma boa conexão e com isso a melhor experiência de jogo possível, selecione um mundo de jogo mais próximo de sua localização.',
        filterPvp: 'Filtrar por tipo de PvP do mundo do jogo',
        filterPvpDescription:
          'Existem cinco tipos diferentes de mundos de jogo que diferem no rigor das regras de PvP. Para uma descrição detalhada, consulte nosso manual. Se você não consegue decidir por um tipo de mundo de jogo, recomendamos jogar em PvP opcional.',
        'no-pvp':
          'Somente se ambos os lados concordarem, os personagens poderão ser combatidos',
        pvp: 'Matar outros personagens é possível, mas restrito',
        pvpEnforced:
          'Matar outros personagens é possível, mas restrito (antigas regras de PvP)',
      },
    },
    success: {
      createAccount: 'Conta criada com sucesso! Entrando...',
      createCharacter: 'Personagem criado com sucesso! Redirecionando...',
      worldEdit: 'Mundo editado com sucesso!',
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
      emailAlreadyTaken: 'Email já está sendo usado',
      nameAlreadyTaken: 'Nome já está sendo usado',
      worldNotFound: 'Mundo não encontrado',
      nameIsNotPermitted: 'Nome não é permitido',
      invalidDate: 'Data inválida',
      invalidIP: 'IP inválido',
      invalidPort: 'Porta inválida',
      unauthorized: 'Você não está autorizado',
    },
    geral: {
      close: 'Fechar',
      confirm: 'Salvar',
      editing: 'Editando',
      worlds: 'Mundos',
      createWorld: 'Criar Mundo',
      of: 'de',
      show: 'Mostrar',
      searchAllColumns: 'Procurar ...',
      filter: 'Filtrar',
      actions: 'Ações',
      ip: 'IP',
      pvpType: 'Tipo de PVP',
      location: 'Localização',
      id: 'ID',
      port: 'Porta',
      creation: 'Criação',
      admin: 'Admin',
      world: 'Mundo',
      back: 'Voltar',
      send: 'Enviar',
      sex: 'Sexo',
      male: 'Masculino',
      female: 'Feminino',
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
