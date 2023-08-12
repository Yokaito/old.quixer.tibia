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
