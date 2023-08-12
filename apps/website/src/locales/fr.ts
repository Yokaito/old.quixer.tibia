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
