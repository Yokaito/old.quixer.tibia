export default {
  quixer: {
    errors: {
      email: 'Please enter a valid email address',
      minLength: 'Please enter at least {min} characters',
      maxLength: 'Please enter no more than {max} characters',
      required: 'This field is required',
      invalidLogin: 'Invalid login credentials',
    },
    account: {
      management: 'Account Management',
      form: 'Account Login',
      login: 'Login',
      email: 'Email',
      password: 'Password',
      characters: {
        create: 'Create Character',
        table: {
          name: 'Name',
          status: 'Status',
          actions: 'Actions',
        },
      },
      titles: {
        status: 'Account Status',
        characters: 'Characters',
        general: 'General Information',
      },
      hello: `Welcome to your account {name}`,
      premium: {
        benefits: {
          outfits: 'wear Premium outfits',
          hunting: 'use two Hunting Task slots for free',
          battle:
            'organise characters and creatures nearby in secondary battle lists',
        },
      },
      general: {
        labels: {
          email: 'Email address:',
          created: 'Created:',
          lastLogin: 'Last login:',
          accountStatus: 'Account status:',
          tibiaCoins: 'Tibia Coins:',
          loyaltyPoints: 'Loyalty Points:',
          loyaltyTitle: 'Loyalty Title:',
        },
      },
      status: {
        free: 'Free Account',
        premium: 'Premium Account',
        freePremium: 'Free Premium Account',
        freePermanent: 'Your premium dont expire',
        timeExpired: 'Your premium time expired at',
        timeLeft: 'Your premium time expires in',
        balance: 'Balance of Premium Time {days} days',
      },
      actions: {
        menage: 'Manage Account',
        premium: 'Get Premium',
        logout: 'Logout',
        changePassword: 'Change Password',
        changeEmail: 'Change Email',
        terminate: 'Terminate Account',
      },
    },
    box: {
      login: {
        login: 'Login',
        loggedIn: 'My Account',
        logout: 'Logout',
        register: 'Register',
      },
      download: {
        download: 'Download',
      },
    },
    menu: {
      item: {
        news: 'News',
        'latest-news': 'Latest News',
        'news-archive': 'News Archive',
        'event-schedule': 'Event Schedule',
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
