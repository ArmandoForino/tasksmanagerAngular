import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/homepage',
    home: true
  },
  {
    title: 'Progetti',
    icon: 'file-text-outline',
    link: '/projects'
  },
  {
    title: 'Tasks',
    icon: 'list',
    link: '/tasks'
  },
  {
    title: 'Tags',
    icon: 'bookmark-outline',
    link: '/tags',
  },
  {
    title: 'Profilo',
    icon: 'person-outline',
    link: '/profile'
  }
];


export const MENU_ITEMS_PUBLIC: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/homepage',
    home: true
  }
];
