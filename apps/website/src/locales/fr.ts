export default {
  quixer: {
    errors: {
      email: 'Veuillez saisir une adresse e-mail valide',
      minLength: 'Veuillez saisir au moins {min} caractères',
      maxLength: 'Veuillez saisir au maximum {max} caractères',
      required: 'Ce champ est obligatoire',
      invalidLogin: 'Informations de connexion invalides',
    },
    account: {
      management: 'Gestion du compte',
      form: 'Connexion au compte',
      login: 'Connexion',
      email: 'Email',
      password: 'Mot de passe',
      characters: {
        create: 'Créer un personnage',
        table: {
          name: 'Nom',
          status: 'Statut',
          actions: 'Actions',
        },
      },
      titles: {
        status: 'Statut du compte',
        characters: 'Personnages',
      },
      hello: `Bienvenue sur votre compte {name}`,
      premium: {
        benefits: {
          outfits: 'porter des tenues Premium',
          hunting: 'utiliser deux emplacements de tâche de chasse gratuitement',
          battle:
            'organiser les personnages et les créatures à proximité dans des listes de bataille secondaires',
        },
      },
      status: {
        free: 'Compte gratuit',
        premium: 'Compte premium',
        timeExpired: 'Votre temps premium a expiré le',
        timeLeft: 'Votre temps premium expire dans',
        balance: 'Solde du temps premium {days} jours',
      },
      actions: {
        menage: 'Gérer le compte',
        premium: 'Acheter premium',
        logout: 'Se déconnecter',
      },
    },
    box: {
      login: {
        login: 'Se connecter',
        loggedIn: 'Mon compte',
        logout: 'Se déconnecter',
        register: 'Créer un compte',
      },
      download: {
        download: 'Télécharger',
      },
    },
    menu: {
      item: {
        news: 'Nouvelles',
        'latest-news': 'Dernières nouvelle',
        'news-archive': 'Archive des nouvelles',
        'event-schedule': 'Calendrier des événements',
      },
    },
    info: {
      bar: {
        online: 'Joueurs en ligne',
        fankit: 'Fankit',
      },
    },
  },
} as const
