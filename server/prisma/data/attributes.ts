type Attribute = {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
};

export const attributes: Attribute[] = [
  // Main components
  // Assembly accessories
  // Processors
  {
    id: 'a1',
    name: 'Brand',
    description: 'CPU manufacturer',
    categoryId: 'c24',
  },
  {
    id: 'a2',
    name: 'Processor frequency',
    description: 'Processor frequency in GHz',
    categoryId: 'c24',
  },
  {
    id: 'a3',
    name: 'Core count',
    description: 'Number of processor cores',
    categoryId: 'c24',
  },
  {
    id: 'a4',
    name: 'Number of threads',
    description: 'Number of processor cores',
    categoryId: 'c24',
  },
  { id: 'a5', name: 'Max TDP', categoryId: 'c24' },
  {
    id: 'a6',
    name: 'Socket',
    description: 'Connector type',
    categoryId: 'c24',
  },
  {
    id: 'a7',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c24',
  },

  // Graphics cards
  { id: 'a8', name: 'Brand', categoryId: 'c25' },
  { id: 'a9', name: 'Memory capacity', categoryId: 'c25' },
  {
    id: 'a10',
    name: 'GPU manufacturer',
    description: 'e.g., Nvidia, AMD',
    categoryId: 'c25',
  },
  {
    id: 'a11',
    name: 'Type of memory',
    description: 'e.g., GDDR5, GDDR6',
    categoryId: 'c25',
  },
  {
    id: 'a12',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c25',
  },

  // Motherboards
  {
    id: 'a13',
    name: 'Brand',
    description: 'Motherboard manufacturer',
    categoryId: 'c26',
  },
  { id: 'a14', name: 'Socket', categoryId: 'c26' },
  { id: 'a15', name: 'Chipset', categoryId: 'c26' },
  { id: 'a16', name: 'Form factor', categoryId: 'c26' },
  { id: 'a17', name: 'Memory support', categoryId: 'c26' },
  { id: 'a18', name: 'Number of RAM slots', categoryId: 'c26' },
  {
    id: 'a19',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c26',
  },

  // RAM
  { id: 'a20', name: 'Brand', categoryId: 'c27' },
  { id: 'a21', name: 'Memory capacity', categoryId: 'c27' },
  { id: 'a22', name: 'Memory frequency', categoryId: 'c27' },
  { id: 'a23', name: 'Number of bars', categoryId: 'c27' },
  {
    id: 'a24',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c27',
  },

  // SSD drives
  { id: 'a25', name: 'Brand', categoryId: 'c28' },
  { id: 'a26', name: 'Memory capacity', categoryId: 'c28' },
  { id: 'a27', name: 'Form factor', categoryId: 'c28' },
  {
    id: 'a28',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c28',
  },

  // HDD dives
  { id: 'a29', name: 'Brand', categoryId: 'c29' },
  { id: 'a30', name: 'Memory capacity', categoryId: 'c29' },
  {
    id: 'a31',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c29',
  },

  // Power supplies
  { id: 'a32', name: 'Brand', categoryId: 'c30' },
  { id: 'a33', name: 'Power', categoryId: 'c30' },
  {
    id: 'a34',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c30',
  },

  // Cases
  { id: 'a35', name: 'Brand', categoryId: 'c31' },
  { id: 'a36', name: 'Motherboard form factor', categoryId: 'c31' },
  { id: 'a37', name: 'Number of fans installed', categoryId: 'c31' },
  { id: 'a38', name: 'Illumination', categoryId: 'c31' },
  {
    id: 'a39',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c31',
  },
  {
    id: 'a40',
    name: 'Color',
    description: 'Color of the product',
    categoryId: 'c31',
  },

  // Air cooling for CPUs
  { id: 'a41', name: 'Brand', categoryId: 'c32' },
  { id: 'a42', name: 'Socket', categoryId: 'c32' },
  { id: 'a43', name: 'Max TDP', categoryId: 'c32' },
  { id: 'a44', name: 'Illumination', categoryId: 'c32' },
  {
    id: 'a45',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c32',
  },
  {
    id: 'a46',
    name: 'Color',
    description: 'Color of the product',
    categoryId: 'c32',
  },

  // Water cooling for CPUs
  { id: 'a47', name: 'Brand', categoryId: 'c33' },
  { id: 'a48', name: 'Socket', categoryId: 'c33' },
  { id: 'a49', name: 'Illumination', categoryId: 'c33' },
  {
    id: 'a50',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c33',
  },
  {
    id: 'a51',
    name: 'Color',
    description: 'Color of the product',
    categoryId: 'c33',
  },

  // Sound cards
  { id: 'a52', name: 'Brand', categoryId: 'c34' },
  { id: 'a53', name: 'Type', categoryId: 'c34' },
  { id: 'a54', name: 'Connection interface', categoryId: 'c34' },
  {
    id: 'a55',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c34',
  },

  // Network cards
  { id: 'a56', name: 'Brand', categoryId: 'c35' },
  { id: 'a57', name: 'Type', categoryId: 'c35' },
  { id: 'a58', name: 'Data transfer speed', categoryId: 'c35' },
  {
    id: 'a59',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c35',
  },

  // Case fans
  { id: 'a60', name: 'Brand', categoryId: 'c36' },
  { id: 'a61', name: 'Diameter', categoryId: 'c36' },
  { id: 'a62', name: 'Illumination', categoryId: 'c36' },
  {
    id: 'a63',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c36',
  },

  // Holders for video cards
  { id: 'a64', name: 'Brand', categoryId: 'c37' },
  {
    id: 'a65',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c37',
  },

  // Thermal paste
  { id: 'a66', name: 'Brand', categoryId: 'c38' },
  { id: 'a67', name: 'weight', categoryId: 'c38' },

  // Thermal pads
  { id: 'a68', name: 'Brand', categoryId: 'c39' },
  { id: 'a69', name: 'Size, mm', categoryId: 'c39' },

  // PCs
  { id: 'a70', name: 'Graphics card', categoryId: 'c10' },
  { id: 'a71', name: 'Processor', categoryId: 'c10' },
  { id: 'a72', name: 'RAM size', categoryId: 'c10' },
  { id: 'a73', name: 'Video memory capacity', categoryId: 'c10' },
  { id: 'a74', name: 'SSD capacity', categoryId: 'c10' },
  {
    id: 'a75',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c10',
  },
  {
    id: 'a76',
    name: 'Color',
    description: 'Color of the product',
    categoryId: 'c10',
  },

  // Laptops
  { id: 'a77', name: 'Brand', categoryId: 'c11' },
  { id: 'a78', name: 'Graphics card', categoryId: 'c11' },
  { id: 'a79', name: 'Processors', categoryId: 'c11' },
  { id: 'a80', name: 'RAM size', categoryId: 'c11' },
  { id: 'a81', name: 'Video memory capacity', categoryId: 'c11' },
  { id: 'a82', name: 'SSD capacity', categoryId: 'c11' },
  {
    id: 'a83',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c11',
  },
  {
    id: 'a84',
    name: 'Color',
    description: 'Color of the product',
    categoryId: 'c11',
  },

  // Monitors
  { id: 'a85', name: 'Brand', categoryId: 'c12' },
  { id: 'a86', name: 'Resolution', categoryId: 'c12' },
  { id: 'a87', name: 'Diagonal', categoryId: 'c12' },
  { id: 'a88', name: 'Refresh rate', categoryId: 'c12' },
  { id: 'a89', name: 'Matrix type', categoryId: 'c12' },
  {
    id: 'a90',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c12',
  },

  // TVs
  { id: 'a91', name: 'Brand', categoryId: 'c13' },
  { id: 'a92', name: 'Resolution', categoryId: 'c13' },
  { id: 'a93', name: 'Diagonal', categoryId: 'c13' },
  {
    id: 'a94',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c13',
  },

  // Cable & adapters
  { id: 'a95', name: 'Brand', categoryId: 'c60' },
  { id: 'a96', name: 'Connector 1', categoryId: 'c60' },
  { id: 'a97', name: 'Connector 2', categoryId: 'c60' },
  { id: 'a98', name: 'Length', categoryId: 'c60' },
  {
    id: 'a99',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c60',
  },

  // Brackets & stands
  { id: 'a100', name: 'Brand', categoryId: 'c61' },
  { id: 'a101', name: 'For the number of monitors', categoryId: 'c61' },
  {
    id: 'a102',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c61',
  },

  // Cleaning products
  { id: 'a103', name: 'Brand', categoryId: 'c62' },
  { id: 'a104', name: 'Type', categoryId: 'c62' },

  // Mice
  { id: 'a105', name: 'Brand', categoryId: 'c63' },
  { id: 'a106', name: 'Connection type', categoryId: 'c63' },
  { id: 'a107', name: 'Maximum dpi', categoryId: 'c63' },
  { id: 'a108', name: 'Color', categoryId: 'c63' },
  {
    id: 'a109',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c63',
  },

  // Keyboards
  { id: 'a110', name: 'Brand', categoryId: 'c64' },
  { id: 'a111', name: 'Type', categoryId: 'c64' },
  { id: 'a112', name: 'Form factor', categoryId: 'c64' },
  { id: 'a113', name: 'Color', categoryId: 'c64' },
  {
    id: 'a114',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c64',
  },

  // Mousepads
  { id: 'a115', name: 'Brand', categoryId: 'c65' },
  { id: 'a116', name: 'Size', categoryId: 'c65' },
  { id: 'a117', name: 'Length', categoryId: 'c65' },
  { id: 'a118', name: 'Width', categoryId: 'c65' },
  {
    id: 'a119',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c65',
  },

  // Headphones
  { id: 'a120', name: 'Brand', categoryId: 'c66' },
  { id: 'a121', name: 'Connection type', categoryId: 'c66' },
  { id: 'a122', name: 'Type', categoryId: 'c66' },
  {
    id: 'a123',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c66',
  },
  {
    id: 'a124',
    name: 'Color',
    description: 'Color of the product',
    categoryId: 'c66',
  },

  // Speaker systems
  { id: 'a125', name: 'Brand', categoryId: 'c67' },
  {
    id: 'a126',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c67',
  },

  // Microphones
  { id: 'a127', name: 'Brand', categoryId: 'c68' },
  { id: 'a128', name: 'Type', categoryId: 'c68' },
  {
    id: 'a129',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c68',
  },

  // Webcams
  { id: 'a130', name: 'Brand', categoryId: 'c69' },
  { id: 'a131', name: 'Resolution', categoryId: 'c69' },
  { id: 'a132', name: 'Frame rate', categoryId: 'c69' },
  {
    id: 'a133',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c69',
  },

  // Stationary
  { id: 'a134', name: 'Brand', categoryId: 'c17' },
  {
    id: 'a135',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c17',
  },

  // Portable
  { id: 'a136', name: 'Brand', categoryId: 'c18' },
  {
    id: 'a137',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c18',
  },

  // Games
  { id: 'a138', name: 'Games for', categoryId: 'c19' },

  // Gamepads
  { id: 'a139', name: 'Brand', categoryId: 'c77' },
  {
    id: 'a140',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c77',
  },

  // Routes
  { id: 'a141', name: 'Brand', categoryId: 'c80' },
  { id: 'a142', name: 'WAN port speed', categoryId: 'c80' },
  {
    id: 'a143',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c80',
  },
  {
    id: 'a144',
    name: 'Color',
    description: 'Color of the product',
    categoryId: 'c80',
  },

  // Switches
  { id: 'a145', name: 'Brand', categoryId: 'c81' },
  { id: 'a146', name: 'Number of LAN ports', categoryId: 'c81' },
  {
    id: 'a147',
    name: 'Condition',
    description: 'New, used, or refurbished',
    categoryId: 'c81',
  },

  // Services
  { id: 'a148', name: 'Type', categoryId: 'c22' },

  // Software
  { id: 'a149', name: 'Type', categoryId: 'c23' },
];
