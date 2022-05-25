type ListType = {
  key: string;
  title: string;
  permissionLevel: 1 | 2 | 3;
  isHidden: boolean;
  iconName: string;
  href: string;
  isActive: boolean;
};

export type NavListType = ListType & {
  subNavs?: ListType[];
};

/** 
 * Permisiion: 1: common, 2:middle, 3:high , 
 * high level permission will contain low level functions.
 * */
export const NavList: NavListType[] = [{
  key: 'Home',
  isHidden: false,
  title: 'Home',
  permissionLevel: 1,
  iconName: 'home',
  href: '/',
  isActive: true,
}, {
  key: 'Test',
  isHidden: false,
  title: 'Test-Page',
  permissionLevel: 1,
  iconName: 'report',
  href: '/test',
  isActive: false,
}, {
  key: 'Notion',
  isHidden: true,
  title: 'Notion',
  permissionLevel: 1,
  iconName: 'eventnote',
  href: '/notion',
  isActive: false,
  subNavs: [{
    key: 'test',
    isHidden: false,
    title: 'test',
    permissionLevel: 1,
    iconName: 'face',
    href: '/notion/test',
    isActive: false,
  }],
}];