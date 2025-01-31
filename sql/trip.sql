DROP TABLE trip;

CREATE TABLE
  trip (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    country_code TEXT NOT NULL,
    year INT NOT NULL,
    month INT NOT NULL,
    accomodation_name TEXT,
    accomodation_map TEXT,
    resorts TEXT[] NOT NULL,
    members TEXT[] NOT NULL,
    non_members INT
  );

INSERT INTO
  trip (
    id,
    title,
    country_code,
    year,
    month,
    accomodation_name,
    accomodation_map,
    resorts,
    members,
    non_members
  )
VALUES
  (
    '2008-lienz',
    'Lienz',
    'AT',
    2008,
    3,
    NULL,
    NULL,
    ARRAY['lienz', 'grossglockner', 'molltaler'],
    ARRAY['hudy', 'jarin', 'stuchla', 'majki'],
    2
  ),
  (
    '2009-ponte-di-legno',
    'Ponte di Legno',
    'IT',
    2009,
    2,
    'Residence Adamello Resort',
    '2MEfqPWF4HdnXv4F9',
    ARRAY['tonale'],
    ARRAY['hudy', 'jarin', 'stuchla'],
    3
  ),
  (
    '2011-tauplitz',
    'Tauplitz',
    'AT',
    2011,
    3,
    'Haus Alpin',
    'MuRUSkJCndeTu1UM9',
    ARRAY['tauplitzalm'],
    ARRAY['hudy', 'jarin'],
    1
  ),
  (
    '2013-aprica',
    'Aprica',
    'IT',
    2013,
    3,
    NULL,
    NULL,
    ARRAY['aprica'],
    ARRAY[
      'hudy',
      'jarin',
      'stuchla',
      'majki',
      'era',
      'kopy',
      'lena',
      'tomas',
      'lucka',
      'mara',
      'vobo',
      'toupy'
    ],
    2
  ),
  (
    '2015-les-sybelles',
    'Les Sybelles',
    'FR',
    2015,
    1,
    NULL,
    NULL,
    ARRAY['les-sybelles'],
    ARRAY['hudy', 'terka'],
    6
  ),
  (
    '2015-passo-del-tonale',
    'Passo del Tonale',
    'IT',
    2015,
    3,
    NULL,
    NULL,
    ARRAY['tonale'],
    ARRAY['lenka', 'lucka', 'era', 'vobo', 'toupy'],
    2
  ),
  (
    '2016-zell-am-see',
    'Zell am See',
    'AT',
    2016,
    2,
    'Frühstückspension Landhaus Christa',
    'ZXmB1T1U26gSn9Hg8',
    ARRAY['kitzsteinhorn', 'schmitten', 'saalbach'],
    ARRAY[
      'hudy',
      'terka',
      'jarin',
      'stuchla',
      'janca',
      'era',
      'pavel',
      'lucka',
      'mara',
      'lena'
    ],
    0
  ),
  (
    '2017-sella-ronda',
    'Sella Ronda',
    'IT',
    2017,
    2,
    NULL,
    NULL,
    ARRAY['sella'],
    ARRAY[
      'stuchla',
      'janca',
      'era',
      'pavel',
      'lena',
      'lucka',
      'jarda',
      'junior1',
      'zahrada'
    ],
    0
  ),
  (
    '2018-solden',
    'Sölden',
    'AT',
    2018,
    1,
    'Gasthof Bergheimat',
    'zyvj5QWXhCMsACP99',
    ARRAY['solden'],
    ARRAY[
      'hudy',
      'terka',
      'stuchla',
      'era',
      'pavel',
      'lena',
      'milan',
      'lucka',
      'jarda',
      'junior1',
      'junior2',
      'zahrada',
      'sima'
    ],
    0
  ),
  (
    '2019-kronplatz',
    'Kronplatz',
    'IT',
    2019,
    3,
    'Hotel Starkl',
    '5Ls6mo4TNXVz56zw5',
    ARRAY['kronplatz'],
    ARRAY[
      'hudy',
      'terka',
      'jarin',
      'daja',
      'stuchla',
      'lena',
      'milan',
      'lucka',
      'jarda',
      'junior1',
      'junior2'
    ],
    0
  ),
  (
    '2020-schladming',
    'Schladming',
    'AT',
    2020,
    2,
    'Hotel Post',
    '7t13NeYUzQDLS8Cs9',
    ARRAY['schladming'],
    ARRAY[
      'hudy',
      'terka',
      'jarin',
      'stuchla',
      'lena',
      'milan',
      'sally'
    ],
    3
  ),
  (
    '2020-zell-am-see',
    'Zell am See',
    'AT',
    2020,
    3,
    NULL,
    NULL,
    ARRAY['kitzsteinhorn', 'schmitten'],
    ARRAY['hudy', 'terka'],
    2
  ),
  (
    '2022-kitzbuhel',
    'Kitzbühel',
    'AT',
    2022,
    2,
    'Lifthotel Aschaber',
    'qVWEdhZZN2EYBvJ99',
    ARRAY['kitzbuhel', 'brixen'],
    ARRAY[
      'hudy',
      'terka',
      'jarin',
      'stuchla',
      'lena',
      'milan'
    ],
    0
  ),
  (
    '2023-passo-del-tonale',
    'Passo del Tonale',
    'IT',
    2023,
    1,
    'Hotel Orchidea',
    'wQsZkCSbJLXjU1tg9',
    ARRAY['tonale'],
    ARRAY['hudy', 'terka', 'jarin', 'stuchla', 'sally'],
    3
  ),
  (
    '2024-dachstein',
    'Dachstein',
    'AT',
    2024,
    1,
    'COOEE alpin Hotel Dachstein',
    'cvkV6dZxt5F9fYQo9',
    ARRAY['dachstein'],
    ARRAY[
      'hudy',
      'jarin',
      'daja',
      'stuchla',
      'terez',
      'milan',
      'lena',
      'pavel',
      'era'
    ],
    1
  ),
  (
    '2025-st-johann-in-tirol',
    'St. Johann in Tirol',
    'AT',
    2025,
    1,
    'COOEE alpin Hotel Kitzbüheler Alpen',
    'gyvB61Hz9svSzurX7',
    ARRAY['st-johann', 'brixen'],
    ARRAY[
      'hudy',
      'terka',
      'era',
      'pavel',
      'lena',
      'milan',
      'stuchla',
      'terez',
      'sally',
      'sima',
      'zahrada'
    ],
    0
  );
