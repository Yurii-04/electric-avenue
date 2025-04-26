type Category = {
  id: string;
  name: string;
  parentId?: string;
  isGroup?: boolean;
  icon?: string;
};

export const categories: Category[] = [
  {
    id: 'c1',
    name: 'Computer components',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/knm8xbz7fbrtgt5wmsfz',
  },
  {
    id: 'c2',
    name: 'Computers & Laptops',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/otzeucqwvoirzlw7ffnp',
  },
  {
    id: 'c3',
    name: 'Monitors & TVs',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/mfvds6c5agybnhrqbkvy',
  },
  {
    id: 'c4',
    name: 'Periphery',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/yqxk2huclsehfqdcakpx',
  },
  {
    id: 'c5',
    name: 'Console gaming',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/ebcheeoym5r4faol2i7l',
  },
  {
    id: 'c6',
    name: 'Network equipment',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/w4oouaxkverntvqiyxkt',
  },
  {
    id: 'c7',
    name: 'Services & Software',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/sed9op8ydg7oijqs3xsk',
  },

  {
    id: 'c8',
    name: 'Main Components',
    parentId: 'c1',
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/d9olgzbpz0qewrja5ddc',
  },
  {
    id: 'c9',
    name: 'Assembly accessories',
    parentId: 'c1',
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/uxcgv4j5wd5pzavtij6z',
  },
  {
    id: 'c10',
    name: 'Computers',
    parentId: 'c2',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/ap7uf4lyoyzpme8kcu0g',
  },
  {
    id: 'c11',
    name: 'Laptops',
    parentId: 'c2',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/bh7v4mgxziiotayt4xiz',
  },
  {
    id: 'c12',
    name: 'Monitors',
    parentId: 'c3',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/tz1jei3igcgyirbybjye',
  },
  {
    id: 'c13',
    name: 'TVs',
    parentId: 'c3',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/rqjtfbu8zdywmckgrrti',
  },
  {
    id: 'c14',
    name: 'Accessories for monitors',
    parentId: 'c3',
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/uxcgv4j5wd5pzavtij6z',
  },
  {
    id: 'c15',
    name: 'Manipulators & accessories',
    parentId: 'c4',
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/lx7zdniqztwpvtpeatsv',
  },
  {
    id: 'c16',
    name: 'Audio / video equipment',
    parentId: 'c4',
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/nozqt3yu0xi3sprnsvjb',
  },
  {
    id: 'c17',
    name: 'Stationary',
    parentId: 'c5',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/jyxjxxbirqowl6ffds4f',
  },
  {
    id: 'c18',
    name: 'Portable',
    parentId: 'c5',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/q6qpwmauivwykowpeudv',
  },
  {
    id: 'c19',
    name: 'Games',
    parentId: 'c5',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/io6vrohe5xbwpdfxthu4',
  },
  {
    id: 'c20',
    name: 'Peripherals and accessories for consoles',
    parentId: 'c5',
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/sbggycdok7vbxdistiiy',
  },
  {
    id: 'c21',
    name: 'Network devices',
    parentId: 'c6',
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/mlnezazoz1beqy0hzglv',
  },
  {
    id: 'c22',
    name: 'Services',
    parentId: 'c7',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/ng5mkh3zd9c1u5gsjhiq',
  },
  {
    id: 'c23',
    name: 'Software',
    parentId: 'c7',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/o8qsfettlalcdji0zopr',
  },

  { id: 'c24', name: 'Processors', parentId: 'c8' },
  { id: 'c25', name: 'Graphics cards', parentId: 'c8' },
  { id: 'c26', name: 'Motherboards', parentId: 'c8' },
  { id: 'c27', name: 'RAM', parentId: 'c8' },
  { id: 'c28', name: 'SSD drives', parentId: 'c8' },
  { id: 'c29', name: 'HDD drives', parentId: 'c8' },
  { id: 'c30', name: 'Power supplies', parentId: 'c8' },
  { id: 'c31', name: 'Cases', parentId: 'c8' },
  { id: 'c32', name: 'Air cooling for CPUs', parentId: 'c8' },
  { id: 'c33', name: 'Water cooling for CPUs', parentId: 'c8' },
  { id: 'c34', name: 'Sound cards', parentId: 'c8' },
  { id: 'c35', name: 'Network cards', parentId: 'c8' },
  { id: 'c36', name: 'Case fans', parentId: 'c9' },
  { id: 'c37', name: 'Holders for video cards', parentId: 'c9' },
  { id: 'c38', name: 'Thermal paste', parentId: 'c9' },
  { id: 'c39', name: 'Thermal pads', parentId: 'c9' },

  { id: 'c60', name: 'Cables & adapters', parentId: 'c14' },
  { id: 'c61', name: 'Brackets & stands', parentId: 'c14' },
  { id: 'c62', name: 'Cleaning products', parentId: 'c14' },

  { id: 'c63', name: 'Mice', parentId: 'c15' },
  { id: 'c64', name: 'Keyboards', parentId: 'c15' },
  { id: 'c65', name: 'Mousepads', parentId: 'c15' },

  { id: 'c66', name: 'Headphones', parentId: 'c16' },
  { id: 'c67', name: 'Speaker systems', parentId: 'c16' },
  { id: 'c68', name: 'Microphones', parentId: 'c16' },
  { id: 'c69', name: 'Webcams', parentId: 'c16' },

  { id: 'c77', name: 'Gamepads', parentId: 'c20' },

  { id: 'c80', name: 'Routers', parentId: 'c21' },
  { id: 'c81', name: 'Switches', parentId: 'c21' },
];
