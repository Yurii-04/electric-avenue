type OptionValue = {
  id: string;
  value: string;
  description?: string;
};

function generateOptionValues(
  arr: Array<string | number>,
  startId: number,
  description?: string,
): OptionValue[] {
  return arr.map((val: number | string, i: number) => ({
    id: `ov${startId + i}`,
    value: val.toString(),
    description,
  }));
}

export const optionValues: OptionValue[] = [
  ...generateOptionValues(
    [
      'AMD',
      'Intel',
      'AsRock',
      'Asus',
      'Gigabyte',
      'Inno3D', //ov6
      'MSI',
      'Palit',
      'Sapphire',
      'Nvidia',
      'AMD',
      'Intel Arc', //12
      'Corsair',
      'Crucial',
      'G.Skill',
      'Kingston Fury',
      'Kingston', //17
      'Patriot',
      'Samsung',
      'Team',
      'Apacer',
      'GoodRam',
      'Western Digital', //23
      'Toshiba',
      'Seagate',
      '1stPlayer',
      'Aerocool',
      'Be quiet',
      'Chieftec', //29
      'Deepcool',
      'FSP',
      'GameMax',
      'Seasonic',
      'Zalman',
      '2E',
      'Cooler Master', //36
      'Cougar',
      'Lian Li',
      'Arctic',
      'XPG',
      'Thermaltake',
      'Razer',
      'ATcom', //43
      'Sennheiser',
      'Hator',
      'Dynamode',
      'TP-Link',
      'D-Link',
      'Edimax',
      'Mikrotik', //50
      'Ugreen',
      'Gembird',
      'Coolman',
      'ID Cooling',
      'Thermal Grizzly',
      'Lenovo', //56
      'Apple',
      'Dell',
      'HP',
      'Acer',
      'Huawei',
      'LG',
      'Xiaomi',
      'Baseus',
      'Vention', //65
      'X-Digital',
      'Trust',
      'Kivi',
      'ColorWay',
      'Maxxter',
      'A4Tech',
      'HyperX', //72
      'Logitech',
      'SteelSeries',
      'Bloody',
      'Blizzard',
      'Xtrfy',
      'Keychron', //78
      'Fifine',
      'Sony',
      'JBL',
      'Bosch',
      'Marshal Electronics',
      'Canyon', //84
      'Xbox',
      'Nintendo',
      'Valve',
      'Keenetic', //88
    ],
    1,
    'Brands',
  ), // ov1-ov88
  ...generateOptionValues(
    [
      'AMD A320',
      'AMD A520',
      'AMD A620',
      'AMD B450',
      'AMD B550', //93
      'AMD B650',
      'AMD B840',
      'AMD B850',
      'AMD X470',
      'AMD X570', //98
      'AMD X670',
      'AMD X670E',
      'AMD X870',
      'AMD X870E',
      'AMD WRX90', //103
      'Intel B250',
      'Intel B360',
      'Intel B365',
      'Intel B460',
      'Intel B560', //108
      'Intel B660',
      'Intel B760',
      'Intel B860',
      'Intel H110',
      'Intel H270', //113
      'Intel H310',
      'Intel H310',
      'Intel H370',
      'Intel H410',
      'Intel H470', //118
      'Intel H510',
      'Intel H610',
      'Intel H810',
      'Intel H81',
      'Intel Z170', //123
      'Intel Z270',
      'Intel Z390',
      'Intel Z490',
      'Intel Z590',
      'Intel Z690', //128
      'Intel Z790',
      'Intel Z890', //130
    ],
    89,
    'Motherboard chipset',
  ), // ov89-ov130
  ...generateOptionValues(
    [
      'Socket 1851',
      'Socket 1700',
      'Socket 1200',
      'Socket 1151-V2',
      'Socket 1151',
      'Socket 1155',
      'Socket LGA1150',
      'Socket 1356',
      'Socket 1366',
      'Socket 2011',
      'Socket 2011-3',
      'Socket 2066',
      'Socket 775',
      'Socket AM5',
      'Socket AM4',
      'Socket AM3+',
      'Socket AM3',
      'Socket FM1',
      'Socket AM2+',
      'Socket AM2',
      'Socket FM2',
      'Socket FM2+',
      'Socket WRX8',
      'Socket TRX4',
      'Socket TR4',
    ],
    131,
    'Sockets',
  ), // ov131-ov155
  ...generateOptionValues(
    [
      '4.3 - 4.7 GHz',
      '3.7 - 4.2 GHz',
      '3.1 - 3.6 GHz',
      '2.6 - 3 GHz',
      '2.1 - 2.5 GHz',
    ],
    156,
    'Processor frequency',
  ), // ov156-ov160
  ...generateOptionValues(
    [32, 24, 16, 14, 12, 10, 8, 6, 4, 2],
    161,
    'Core Count',
  ), // ov161-ov170
  ...generateOptionValues(
    [64, 48, 32, 28, 24, 20, 16, 12, 8, 6, 4, 2],
    171,
    'Number of threads',
  ), // ov171-ov182
  ...generateOptionValues(
    ['130 W and more', '100-129 W', '70-99 W', '50-69 W', 'Up to 49 W'],
    183,
    'Max TDP',
  ), // ov183-ov187
  ...generateOptionValues(['New', 'Used', 'Refurbished'], 188, 'Condition'), // ov188-ov190
  ...generateOptionValues(
    [
      '128 GB',
      '96 GB',
      '64 GB',
      '32 GB',
      '24 GB',
      '16 GB', //ov196
      '12 GB',
      '11 GB',
      '10 GB',
      '8 GB',
      '6 GB',
      '4 GB', //ov202
      '3 GB',
      '2 GB',
      '1 GB',
    ],
    191,
    'Memory capacity',
  ), // ov191-ov205
  ...generateOptionValues(
    ['GDDR7', 'GDDR6X', 'GDDR6', 'GDDR5x', 'GDDR5', 'GDDR4', 'GDDR3'],
    206,
    'Video memory type',
  ), // ov206-ov212
  ...generateOptionValues(['ATX', 'MicroATX', 'Mini-ITX'], 213, 'Form factor'), // ov213-ov215
  ...generateOptionValues(['DDR5', 'DDR4', 'DDR3', 'DDR2'], 216, 'Type of RAM'), // ov216-ov219
  ...generateOptionValues([2, 4, 8], 220, 'Number of RAM slots'), // ov220-ov222
  ...generateOptionValues(
    [
      '8000 MHz',
      '7800 MHz',
      '7600 MHz',
      '7200 MHz',
      '6800 MHz',
      '6600 MHz',
      '6400 MHz',
      '6200 MHz',
      '6000 MHz',
      '5600 MHz',
      '5200 MHz',
      '4800 MHz',
      '4600 MHz',
      '4400 MHz',
      '4000 MHz',
      '3733 MHz',
      '3600 MHz',
      '3200 MHz',
      '3000 MHz',
      '2800 MHz',
      '2666 MHz',
      '2400 MHz',
      '2133 MHz',
      '1600 MHz',
      '1333 MHz',
    ],
    223,
    'RAM frequency',
  ), // ov223-ov247
  ...generateOptionValues(
    [
      '24 TB',
      '22 TB',
      '20 TB',
      '18 TB',
      '16 TB',
      '14 TB', //ov253
      '12 TB',
      '10 TB',
      '8 TB',
      '6 TB',
      '4 TB',
      '3 TB', //ov259
      '2 TB',
      '1 TB',
      '513 GB - 1 TB',
      '480 - 512 GB', //ov263
      '240 - 479 GB',
      '120 - 128 GB', //ov265
    ],
    248,
    'Memory capacity',
  ), // ov248-ov265
  ...generateOptionValues(['2.5"', 'M.2', 'mSata'], 266, 'SSD form factor'), // ov266-ov268
  ...generateOptionValues(
    [
      'More than 1500 W',
      '1200-1500 W',
      '1000-1199 W',
      '800-999 W',
      '700-799 W',
      '600-699 W',
      '500-599 W',
      '400-499 W',
      '300-399 W',
      'Up to 300 W',
    ],
    269,
    'Power supply capacity ',
  ), // ov269-ov278
  ...generateOptionValues(
    [6, 5, 4, 3, 2, 1, 'Without fans'],
    279,
    'Number of fans installed',
  ), // ov279-ov284
  ...generateOptionValues(
    ['RGB', 'ARGB', 'FRGB', 'Without illumination'],
    285,
    'Illumination',
  ), // ov285-ov288
  ...generateOptionValues(
    [
      'White',
      'Black',
      'Grey',
      'Green',
      'Red',
      'Orange',
      'Purple',
      'Silver',
      'Blue',
      'Pink',
    ],
    290,
    'Colors',
  ), // ov290-ov299
  ...generateOptionValues(
    [
      'AM4/AM5',
      'AM3/AM3+/FM1',
      'AM2+',
      'AM2',
      'FM2/FM2+',
      'WRX8',
      'TRX4',
      'TR4',
      'LGA1851',
      'LGA1700',
      'LGA1200',
      'LGA1150/1151/1151-V2/1155',
      'LGA1356/1366',
      'LGA2011/2011-3',
      'LGA2066',
      'LGA775',
    ],
    300,
    'Socket',
  ), // ov300-ov315
  ...generateOptionValues(['Internal', 'External'], 316, 'Type of card'), // ov316-ov317
  ...generateOptionValues(
    ['PCI', 'PCIe', 'USB 2.0', 'Mini-Jack (3.5mm)'],
    318,
    'Connection interface',
  ), // ov318-ov321
  ...generateOptionValues(
    ['100 Mbps', '101-1000 Mbps'],
    322,
    'Data transfer speed',
  ), // ov322-ov323
  ...generateOptionValues(
    ['140mm', '120mm', '92mm', '80mm', '60mm'],
    324,
    'Diameter case gans',
  ), // ov324-ov328
  ...generateOptionValues(
    ['Up to 3 g', '3.5 - 7.9 g', '8 - 15 g', '20 - 50 g'],
    329,
    'Thermal paste weight',
  ), // ov329-ov332
  ...generateOptionValues(
    ['30x30', '100x100', '145x145', '290x290'],
    333,
    'Thermal pads size',
  ), // ov333-ov336
  ...generateOptionValues(
    [
      'GeForce RTX 5090',
      'GeForce RTX 5080',
      'GeForce RTX 5070 TI',
      'GeForce RTX 5070',
      'GeForce RTX 4070 TI SUPER',
      'GeForce RTX 4070 TI',
      'GeForce RTX 4070',
      'GeForce RTX 4060 TI',
      'GeForce RTX 4060',
      'GeForce RTX 3060 TI',
      'GeForce RTX 3060',
      'GeForce RTX 3050',
      'RX 9070XT',
      'RX 9070',
      'RX 7900 XT',
      'RX 6600',
      'Embedded',
    ],
    337,
    'Graphics card',
  ), // ov337-ov353
  ...generateOptionValues(
    [
      'AMD Ryzen 9',
      'AMD Ryzen 7',
      'AMD Ryzen 5',
      'Intel Core i9',
      'Intel Core i7',
      'Intel Core i5',
      'Intel Core i3',
    ],
    354,
    'Processor',
  ), // ov354-ov360
  ...generateOptionValues(
    ['8K', 'UHD (4K)', 'Full HD', 'HD ready'],
    361,
    'Resolution',
  ), // ov361-ov364
  ...generateOptionValues(
    [
      'Up to 18"',
      '18-20.9"',
      '21-22.9"',
      '23-24.9"', //368
      '25-26.9"',
      '27-28.9"',
      '29-32"',
      '32.1-39"', //372
      '39.1-49.9"',
      'More than 50"',
      '55"',
      '58"', //376
      '60"',
      '65"',
      '70"',
      '75"',
      '77"',
      '83"',
      '85"',
      '86"', // 384
      '97"',
      '98"', // 386
    ],
    365,
    'Screen diagonal',
  ), // ov365-ov386
  ...generateOptionValues(
    [
      '60-74 Hz',
      '75-99 Hz',
      '100-143 Hz',
      '144-165 Hz',
      '166-240 Hz',
      '241-280 Hz',
      '281-380 Hz',
      '381-540 Hz',
    ],
    387,
    'Refresh rate',
  ), // ov387-ov394
  ...generateOptionValues(
    ['IPS', 'OLED', 'QLED', 'VA', 'TN', 'PLS'],
    395,
    'Matrix type',
  ), // ov395-ov400
  ...generateOptionValues(
    [
      'VGA',
      'DVI',
      'HDMI',
      'DisplayPort',
      'MiniDisplayPort',
      'mini-HDMI',
      'Micro-HDMI',
      'USB Type-C',
      'USB Type-A',
      'Lighting',
      'MicroUSB',
      'Mini-Jack (3.5mm)',
    ],
    401,
    'Type of cable connector',
  ), // ov401-ov412
  ...generateOptionValues(
    [
      'More then 10m',
      '7,5-10m',
      '4.5-5m',
      '3-4m',
      '1.5-2m',
      '50cm-1m',
      'Up to 50cm',
    ],
    413,
    'Length of cable',
  ), // ov413-ov419
  ...generateOptionValues(
    ['For 1 monitors', 'For 2 monitors', 'For 3 monitors'],
    420,
    'Number of monitors on the bracket',
  ), // ov420-ov422
  ...generateOptionValues(
    ['Cleaning kit', 'Fabric', 'Liquid', 'Spray'],
    423,
    'Type of cleaning products',
  ), // ov423-ov426
  ...generateOptionValues(
    ['USB', 'Bluetooth', 'Radio channel', 'Mini-Jack (3.5mm)', 'USB Type-C'],
    427,
    'Connection type',
  ), // ov427-ov431
  ...generateOptionValues(
    [
      'Up to 900 dpi',
      '901-200 dpi',
      '1201-1700 dpi',
      '1701-3000 dpi',
      '3001-4000 dpi',
      '4001-6000 dpi',
      '8001-10000 dpi',
      '10001-12000 dpi',
      '12001-16000 dpi',
      'More than 16000 dpi',
    ],
    432,
    'Max DPI',
  ), // ov432-ov441
  ...generateOptionValues(
    ['Membrane', 'Mechanical', 'Optical', 'Magnetic'],
    442,
    'Keyboard type',
  ), // ov442-ov445
  ...generateOptionValues(
    ['Full size', 'TKL (compact)', 'Size 60%', 'size 65%', 'Numpad'],
    446,
    'Keyboard form factor',
  ), // ov446-ov450
  ...generateOptionValues(
    ['5Xl', '4Xl', 'XXL/XXXl', 'XL', 'L', 'M', 'S'],
    451,
    'Mousepad size',
  ), // ov451-ov457
  ...generateOptionValues(
    ['More than 700mm', '501-700mm', '401-500mm', '300-400mm', 'Up to 300mm'],
    458,
    'Mousepad length',
  ), // ov458-ov462
  ...generateOptionValues(
    ['More than 400mm', '301-400mm', '251-300mm', '200-250mm', 'Up to 200mm'],
    463,
    'Mousepad width',
  ), // ov463-ov467
  ...generateOptionValues(
    ['Inserts', 'Vacuum', 'Waybills', 'Full size'],
    468,
    'Type of headphones',
  ), // ov468-ov471
  ...generateOptionValues(['Dynamic', 'Capacitor'], 472, 'Type of headphones'), // ov472-ov473
  ...generateOptionValues(
    [
      'HD (1280x720)',
      '1280x1024',
      '1600x1200',
      'Full HD (1920x1080)',
      '2688x1520',
      '2K (2160x1440)',
      'Ultra HD 4K (3840x2160)',
      '4096x2160',
    ],
    474,
    'Webcam resolution',
  ), // ov474-ov481
  ...generateOptionValues(
    ['Up to 30 fps', '30 fps', 'More than 30 fps'],
    482,
    'Webcam frame rate',
  ), // ov482-ov484
  ...generateOptionValues(
    [
      'Nintendo Switch',
      'PC',
      'PlayStation 3',
      'PlayStation 4',
      'PlayStation 5',
      'Xbox One',
      'Xbox 360',
    ],
    485,
    'Games for',
  ), // ov485-ov491
  ...generateOptionValues(
    [
      'More than 3000 Mbit/s',
      '2001-3000 Mbit/s',
      '1001-2000 Mbit/s',
      '500-1000 Mbit/s',
      'Up to 500 Mbit/s',
      'More than 1000 Mbit/s',
      '10000 Mbit/s',
      '2500 Mbit/s',
      '1000 Mbit/s',
      '100 Mbit/s',
    ],
    492,
    'Router speed',
  ), // ov492-ov501
  ...generateOptionValues(
    [
      '4 LAN ports',
      '5 LAN ports',
      '8 LAN ports',
      '16 LAN ports',
      '24 LAN ports',
      '48 LAN ports',
    ],
    502,
    'Number of LAN ports',
  ), // ov502-ov507
  ...generateOptionValues(
    [
      'Maintenance',
      'Complex cleaning',
      'Upgrade or install components',
      'Repair and diagnostics',
      'Customisation',
    ],
    508,
    'Service type',
  ), // ov508-ov512
  ...generateOptionValues(
    ['Antivirus', 'Operating system', 'Office applications'],
    513,
    'Type of software',
  ), // ov513-ov515
  ...generateOptionValues(
    ['4 modules', '2 modules', '1 module'],
    516,
    'Number of RAM bars', //ov516-ov518
  ),
];
