type ListType = {
  key: string;
  title: string;
  permissions: any[];
  isHidden: boolean;
  iconName: string;
  href: string;
  isActive: boolean;
};

export type NavListType = ListType & {
  subNavs?: ListType[];
}

export const NavList: NavListType[] = [{
  key: 'Home',
  title: 'Home',
  permissions: [],
  isHidden: false,
  iconName: 'home',
  href: '/',
  isActive: false
}, {
  key: 'Notion',
  title: 'Notion',
  permissions: [],
  isHidden: false,
  iconName: 'eventnote',
  href: '/notion',
  isActive: false,
  subNavs: [{
    key: 'test',
    title: 'test',
    permissions: [],
    isHidden: false,
    iconName: 'face',
    href: '/notion/test',
    isActive: false,
  }]
}];