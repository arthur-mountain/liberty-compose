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
  title: 'Home',
  permissionLevel: 1,
  isHidden: false,
  iconName: 'home',
  href: '/',
  isActive: true,
}, {
  key: 'Notion',
  title: 'Notion',
  permissionLevel: 1,
  isHidden: true,
  iconName: 'eventnote',
  href: '/notion',
  isActive: false,
  subNavs: [{
    key: 'test',
    title: 'test',
    permissionLevel: 1,
    isHidden: false,
    iconName: 'face',
    href: '/notion/test',
    isActive: false,
  }],
}];