type Category = {
  name: string;
  parentId?: number;
  isGroup?: boolean;
  icon?: string;
};

export const categories: Category[] = [
  {
    name: 'Computer components',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933504/categories/root-catgories/ajayk9zwsbmdkmnza1fd.svg',
  }, // 1
  {
    name: 'Computer & Laptops',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933504/categories/root-catgories/zbo7c5k5cp4ufvz8ct80.svg',
  }, // 2
  {
    name: 'Monitors & TVs',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933505/categories/root-catgories/g7m2sihmcs0wjq2ogiyp.svg',
  }, // 3
  {
    name: 'Periphery',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933506/categories/root-catgories/bild7zwqbfayreksas3i.svg',
  }, // 4
  {
    name: 'Console gaming',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933505/categories/root-catgories/z7psor9oy9tgfkz9gfyk.svg',
  }, // 5
  {
    name: 'Network equipment',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933506/categories/root-catgories/qjxthvd1yuf7vao09zpw.svg',
  }, // 6
  {
    name: 'Services & Software',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933506/categories/root-catgories/zug6l4v5ute5aip7ihcp.svg',
  }, // 7
  {
    name: 'Other electronics',
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933506/categories/root-catgories/qdhrdirdjyb7n6mmzdqz.svg',
  }, // 8

  {
    name: 'Main Components',
    parentId: 1,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933502/categories/groups/gab8tt4dfnq4jj1h69hw.svg',
  }, // 9
  {
    name: 'Assembly accessories',
    parentId: 1,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933500/categories/groups/gjcowvbgo19buejrebkv.svg',
  }, // 10
  {
    name: 'Computers',
    parentId: 2,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933502/categories/groups/z8xyujg8i0hxcb29xruu.svg',
  }, // 11
  {
    name: 'Laptops',
    parentId: 2,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933501/categories/groups/bhbom2j8xlzk5cufnfsr.svg',
  }, // 12
  {
    name: 'Monitors',
    parentId: 3,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933501/categories/groups/p5komuvp3q4psrihswvb.svg',
  }, // 13
  {
    name: 'TVs',
    parentId: 3,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933504/categories/groups/mawccd9gt6st6o4vmknp.svg',
  }, // 14
  {
    name: 'Accessories for monitors',
    parentId: 3,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933500/categories/groups/mrzzw0fz3y2cg6qlcctr.svg',
  }, // 15
  {
    name: 'Manipulators & accessories',
    parentId: 4,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933502/categories/groups/blkn2yfn1yqdpsaerkgq.svg',
  }, // 16
  {
    name: 'Audio / video equipment',
    parentId: 4,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933501/categories/groups/nz7skzptdfgnvvrp4udi.svg',
  }, // 17
  {
    name: 'Stationary',
    parentId: 5,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933504/categories/groups/d3s0lhjqgbbo3jv1r8wo.svg',
  }, // 18
  {
    name: 'Portable',
    parentId: 5,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933502/categories/groups/z36gxoyetsgnbsfscman.svg',
  }, // 19
  {
    name: 'Games',
    parentId: 5,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933501/categories/groups/vaream9skruw3wjctorf.svg',
  }, // 20
  {
    name: 'Peripherals and accessories for consoles',
    parentId: 5,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933502/categories/groups/w925taeuuufr5w23mybu.svg',
  }, // 21
  {
    name: 'Network devices',
    parentId: 6,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933502/categories/groups/fcdxiqowdjxxuwmophle.svg',
  }, // 22
  {
    name: 'Services',
    parentId: 7,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933503/categories/groups/x9r4efjql1l1qjmayvdo.svg',
  }, // 23
  {
    name: 'Software',
    parentId: 7,
    isGroup: true,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933504/categories/groups/t5spu7ji0lfje9buksop.svg',
  }, // 24

  { name: 'Processors', parentId: 9 },
  { name: 'Graphics cards', parentId: 9 },
  { name: 'Motherboards', parentId: 9 },
  { name: 'RAM', parentId: 9 },
  { name: 'SSD drives', parentId: 9 },
  { name: 'HDD drives', parentId: 9 },
  { name: 'Power supplies', parentId: 9 },
  { name: 'Cases', parentId: 9 },
  { name: 'Air cooling for CPUs', parentId: 9 },
  { name: 'Water cooling for CPUs', parentId: 9 },
  { name: 'Sound cards', parentId: 9 },
  { name: 'Network cards', parentId: 9 },
  { name: 'Case fans', parentId: 10 },
  { name: 'Holders for video cards', parentId: 10 },
  { name: 'Thermal paste', parentId: 10 },
  { name: 'Thermal pads', parentId: 10 },

  { name: 'PCs for AAA games', parentId: 11 },
  { name: 'PC for eSports', parentId: 11 },
  { name: 'PC for 4K gaming', parentId: 11 },
  { name: 'Laptops for AAA games', parentId: 12 },
  { name: 'Laptops for eSports', parentId: 12 },
  { name: 'Laptops for 4K gaming', parentId: 12 },

  { name: 'MSI', parentId: 13 },
  { name: 'Samsung', parentId: 13 },
  { name: 'Acer', parentId: 13 },
  { name: 'Gigabyte', parentId: 13 },
  { name: 'Asus', parentId: 13 },
  { name: 'Quad HD 2K (2560x1440)', parentId: 13 },
  { name: 'Ultra HD 4K (3840x2160)', parentId: 13 },
  { name: 'For gaming', parentId: 13 },
  { name: 'OLED monitors', parentId: 13 },
  { name: '144 Hz monitors', parentId: 13 },
  { name: 'Curved monitors', parentId: 13 },

  { name: 'QLED', parentId: 14 },
  { name: '4K', parentId: 14 },
  { name: 'WI-Fi', parentId: 14 },

  { name: 'Cables & adapters', parentId: 15 },
  { name: 'Brackets & stands', parentId: 15 },
  { name: 'Cleaning products', parentId: 15 },

  { name: 'Mice', parentId: 16 },
  { name: 'Keyboards', parentId: 16 },
  { name: 'Mousepads', parentId: 16 },

  { name: 'Headphones', parentId: 17 },
  { name: 'Speaker systems', parentId: 17 },
  { name: 'Microphones', parentId: 17 },
  { name: 'Webcams', parentId: 17 },

  { name: 'PlayStation', parentId: 18 },
  { name: 'Xbox', parentId: 18 },
  { name: 'Nintendo', parentId: 19 },
  { name: 'SteamDeck', parentId: 19 },
  { name: 'Games for Playstation', parentId: 20 },
  { name: 'Games for Xbox', parentId: 20 },
  { name: 'Games for Nintendo', parentId: 20 },
  { name: 'Gamepads', parentId: 21 },
  { name: 'VR', parentId: 21 },
  { name: 'Accessories for consoles', parentId: 21 },

  { name: 'Routers', parentId: 22 },
  { name: 'Switches', parentId: 22 },
  { name: 'Network adapters', parentId: 22 },

  { name: 'Upgrading and installing components', parentId: 23 },
  { name: 'PC / Laptop cleaning', parentId: 23 },
  { name: 'Software installation and data transfer', parentId: 23 },
  {
    name: 'Replacing thermal paste and cleaning the cooling system',
    parentId: 23,
  },
  { name: 'Cable routing inside the PC case', parentId: 23 },

  { name: 'Antivirus', parentId: 24 },
  { name: 'Operating system', parentId: 24 },
  { name: 'Office products', parentId: 24 },
];
