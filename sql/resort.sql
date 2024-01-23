DROP TABLE resort;
CREATE TABLE resort (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    country_code TEXT NOT NULL,
    region TEXT NOT NULL,
    lat_lng POINT NOT NULL
);
INSERT INTO resort (id, name, country_code, region, lat_lng)
VALUES (
        'schladming',
        'Schladming Dachstein',
        'AT',
        'Štýrsko',
        POINT(47.39446003525241, 13.68755210680316)
    ),
    (
        'solden',
        'Sölden',
        'AT',
        'Tyrolsko',
        POINT(46.96557490011528, 11.007304944319257)
    ),
    (
        'aprica',
        'Aprica',
        'IT',
        'Lombardie',
        POINT(46.15400036668482, 10.15254442633989)
    ),
    (
        'kronplatz',
        'Kronplatz',
        'IT',
        'Jižní Tyrolsko',
        POINT(46.739746710818615, 11.95924947494885)
    ),
    (
        'tauplitzalm',
        'Tauplitzalm',
        'AT',
        'Štýrsko',
        POINT(47.59350337223156, 13.986149893645042)
    ),
    (
        'kitzbuhel',
        'Kitzbühel',
        'AT',
        'Savojsko',
        POINT(47.449156382653854, 12.394587487288598)
    ),
    (
        'brixen',
        'Brixen im Thale',
        'AT',
        'Tyrolsko',
        POINT(47.449666552350934, 12.25135407197131)
    ),
    (
        'lienz',
        'Lienz',
        'AT',
        'Východní Tyrolsko',
        POINT(46.827606426838436, 12.763454637413815)
    ),
    (
        'molltaler',
        'Mölltaler Gletscher',
        'AT',
        'Korutany',
        POINT(47.03848043270894, 13.00620333009706)
    ),
    (
        'saalbach',
        'Saalbach Hinterglemm',
        'AT',
        'Salcbursko',
        POINT(47.39195163095809, 12.640385839581585)
    ),
    (
        'grossglockner',
        'Grossglockner',
        'AT',
        'Východní Tyrolsko',
        POINT(47.040451770634554, 12.840869655058114)
    ),
    (
        'tonale',
        'Tonale Ponte di Legno',
        'IT',
        'Val di Sole',
        POINT(46.26029175099372, 10.587155167030668)
    ),
    (
        'les-sybelles',
        'Les Sybellles',
        'FR',
        'Savojsko',
        POINT(45.22070289749466, 6.219960892528522)
    ),
    (
        'schmitten',
        'Zell am See - Schmitten',
        'AT',
        'Salcbursko',
        POINT(47.32859045694457, 12.782863077375179)
    ),
    (
        'kitzsteinhorn',
        'Kaprun - Kitzsteinhorn',
        'AT',
        'Salcbursko',
        POINT(47.22953175680364, 12.726047925978369)
    ),
    (
        'dachstein',
        'Dachstein West',
        'AT',
        'Horní Rakousko',
        POINT(47.56557997434476, 13.498129198240154)
    ),
(
        'sella',
        'Sella Ronda',
        'IT',
        'Jižní Tyrolsko',
        POINT(46.576487871328276, 11.671212392936976)
    );