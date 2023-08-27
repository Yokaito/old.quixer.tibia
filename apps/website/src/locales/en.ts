export default {
  quixer: {
    success: {
      createAccount: 'Account created successfully! Logging in...',
    },
    errors: {
      email: 'Please enter a valid email address',
      minLength: 'Please enter at least {min} characters',
      maxLength: 'Please enter no more than {max} characters',
      required: 'This field is required',
      invalidLogin: 'Invalid login credentials',
      passwordMatch: 'Passwords do not match',
      consent: 'You must consent to the storing of your play sessions.',
      terms: 'You must agree to the Tibia Service Agreement.',
    },
    geral: {
      attention: 'Attention',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      fieldConsent: 'Consent',
      fieldTerms: 'Terms',
      consent:
        'I consent to CipSoft GmbH saving play sessions for the sole purpose of improving the gaming experience or enforcing the Tibia Rules. Saved play sessions will contain the entire user experience, including, but not limited to, chats and player interaction. I am aware that I can revoke my consent to the storing of my play sessions at any time on my Tibia account management page.',
      terms:
        'I agree to the Tibia Service Agreement, the Tibia Rules and the Tibia Privacy Policy.',
      createAccount: 'Create Account',
      selectCheckbox: 'Please select the following check box:',
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
        balance: 'Balance of Premium Days: {days}',
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
