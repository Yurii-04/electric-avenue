type Category = {
  name: string;
  parentId?: number;
  isGroup?: boolean;
  icon?: string;
};

export const categories: Category[] = [
  {
    name: 'Computer components',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/knm8xbz7fbrtgt5wmsfz',
  }, // 1
  {
    name: 'Computers & Laptops',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/otzeucqwvoirzlw7ffnp',
  }, // 2
  {
    name: 'Monitors & TVs',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/mfvds6c5agybnhrqbkvy',
  }, // 3
  {
    name: 'Periphery',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/yqxk2huclsehfqdcakpx',
  }, // 4
  {
    name: 'Console gaming',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/ebcheeoym5r4faol2i7l',
  }, // 5
  {
    name: 'Network equipment',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/w4oouaxkverntvqiyxkt',
  }, // 6
  {
    name: 'Services & Software',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/root-catgories/sed9op8ydg7oijqs3xsk',
  }, // 7

  {
    name: 'Main Components',
    parentId: 1,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/d9olgzbpz0qewrja5ddc',
  }, // 8
  {
    name: 'Assembly accessories',
    parentId: 1,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/uxcgv4j5wd5pzavtij6z',
  }, // 9
  {
    name: 'Computers',
    parentId: 2,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/ap7uf4lyoyzpme8kcu0g',
  }, // 10
  {
    name: 'Laptops',
    parentId: 2,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/bh7v4mgxziiotayt4xiz',
  }, // 11
  {
    name: 'Monitors',
    parentId: 3,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/tz1jei3igcgyirbybjye',
  }, // 12
  {
    name: 'TVs',
    parentId: 3,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/rqjtfbu8zdywmckgrrti',
  }, // 13
  {
    name: 'Accessories for monitors',
    parentId: 3,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/uxcgv4j5wd5pzavtij6z',
  }, // 14
  {
    name: 'Manipulators & accessories',
    parentId: 4,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/lx7zdniqztwpvtpeatsv',
  }, // 15
  {
    name: 'Audio / video equipment',
    parentId: 4,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/nozqt3yu0xi3sprnsvjb',
  }, // 16
  {
    name: 'Stationary',
    parentId: 5,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/jyxjxxbirqowl6ffds4f',
  }, // 17
  {
    name: 'Portable',
    parentId: 5,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/q6qpwmauivwykowpeudv',
  }, // 18
  {
    name: 'Games',
    parentId: 5,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/io6vrohe5xbwpdfxthu4',
  }, // 19
  {
    name: 'Peripherals and accessories for consoles',
    parentId: 5,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/sbggycdok7vbxdistiiy',
  }, // 20
  {
    name: 'Network devices',
    parentId: 6,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/mlnezazoz1beqy0hzglv',
  }, // 21
  {
    name: 'Services',
    parentId: 7,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/ng5mkh3zd9c1u5gsjhiq',
  }, // 22
  {
    name: 'Software',
    parentId: 7,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/f_auto,q_auto/v1/categories/groups/o8qsfettlalcdji0zopr',
  }, // 23

  { name: 'Processors', parentId: 8 },
  { name: 'Graphics cards', parentId: 8 },
  { name: 'Motherboards', parentId: 8 },
  { name: 'RAM', parentId: 8 },
  { name: 'SSD drives', parentId: 8 },
  { name: 'HDD drives', parentId: 8 },
  { name: 'Power supplies', parentId: 8 },
  { name: 'Cases', parentId: 8 },
  { name: 'Air cooling for CPUs', parentId: 8 },
  { name: 'Water cooling for CPUs', parentId: 8 },
  { name: 'Sound cards', parentId: 8 },
  { name: 'Network cards', parentId: 8 },
  { name: 'Case fans', parentId: 9 },
  { name: 'Holders for video cards', parentId: 9 },
  { name: 'Thermal paste', parentId: 9 },
  { name: 'Thermal pads', parentId: 9 },

  { name: 'PCs for AAA games', parentId: 10 },
  { name: 'PC for eSports', parentId: 10 },
  { name: 'PC for 4K gaming', parentId: 10 },
  { name: 'Laptops for AAA games', parentId: 11 },
  { name: 'Laptops for eSports', parentId: 11 },
  { name: 'Laptops for 4K gaming', parentId: 11 },

  { name: 'MSI', parentId: 12 },
  { name: 'Samsung', parentId: 12 },
  { name: 'Acer', parentId: 12 },
  { name: 'Gigabyte', parentId: 12 },
  { name: 'Asus', parentId: 12 },
  { name: 'Quad HD 2K (2560x1440)', parentId: 12 },
  { name: 'Ultra HD 4K (3840x2160)', parentId: 12 },
  { name: 'For gaming', parentId: 12 },
  { name: 'OLED monitors', parentId: 12 },
  { name: '144 Hz monitors', parentId: 12 },
  { name: 'Curved monitors', parentId: 12 },

  { name: 'QLED', parentId: 13 },
  { name: '4K', parentId: 13 },
  { name: 'WI-Fi', parentId: 13 },

  { name: 'Cables & adapters', parentId: 14 },
  { name: 'Brackets & stands', parentId: 14 },
  { name: 'Cleaning products', parentId: 14 },

  { name: 'Mice', parentId: 15 },
  { name: 'Keyboards', parentId: 15 },
  { name: 'Mousepads', parentId: 15 },

  { name: 'Headphones', parentId: 16 },
  { name: 'Speaker systems', parentId: 16 },
  { name: 'Microphones', parentId: 16 },
  { name: 'Webcams', parentId: 16 },

  { name: 'PlayStation', parentId: 17 },
  { name: 'Xbox', parentId: 17 },
  { name: 'Nintendo', parentId: 18 },
  { name: 'SteamDeck', parentId: 18 },
  { name: 'Games for Playstation', parentId: 19 },
  { name: 'Games for Xbox', parentId: 19 },
  { name: 'Games for Nintendo', parentId: 19 },
  { name: 'Gamepads', parentId: 20 },
  { name: 'VR', parentId: 20 },
  { name: 'Accessories for consoles', parentId: 20 },

  { name: 'Routers', parentId: 21 },
  { name: 'Switches', parentId: 21 },
  { name: 'Network adapters', parentId: 21 },

  { name: 'Upgrading and installing components', parentId: 22 },
  { name: 'PC / Laptop cleaning', parentId: 22 },
  { name: 'Software installation and data transfer', parentId: 22 },
  {
    name: 'Replacing thermal paste and cleaning the cooling system',
    parentId: 22,
  },
  { name: 'Cable routing inside the PC case', parentId: 22 },

  { name: 'Antivirus', parentId: 23 },
  { name: 'Operating system', parentId: 23 },
  { name: 'Office products', parentId: 23 },
];
