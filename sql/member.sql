CREATE TYPE interest_enum AS ENUM('lyže', 'skialpy', 'snowboard');
CREATE TABLE member (
    id SERIAL PRIMARY KEY,
    alias TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    facebook TEXT,
    instagram TEXT,
    current_partner TEXT,
    ex_partners TEXT [],
    siblings TEXT [],
    interest interest_enum [] NOT NULL
);
INSERT INTO member (
        alias,
        name,
        facebook,
        instagram,
        current_partner,
        ex_partners,
        siblings,
        interest
    )
VALUES (
        'hudy',
        'Ondřej Hudek',
        'ondrej.hudek',
        'ondrejhudek',
        'stejste',
        '{ }',
        '{ }',
        '{"lyže", "snowboard"}'
    ),
    (
        'terka',
        'Tereza Hudková',
        'tereza.stejskalova.16',
        'stejste',
        'hudy',
        '{ }',
        '{ }',
        '{"lyže", "snowboard"}'
    ),
    (
        'jarin',
        'Jaroslav Černý',
        'jardac1',
        'jardacerny_',
        'daja',
        '{ }',
        '{"era"}',
        '{"lyže"}'
    ),
    (
        'daja',
        'Daniela Kováčová',
        'Danielka.Kovac',
        'danielka.kovacova',
        'jarin',
        '{ }',
        '{ }',
        '{"lyže"}'
    ),
    (
        'stuchla',
        'Jan Stuchlík',
        'honza.stuchlik.5',
        'johnyst',
        NULL,
        '{"janca"}',
        '{"majki"}',
        '{"lyže"}'
    ),
    (
        'majki',
        'Markéta Stuchlíková',
        'stuchlapuchlamuchla',
        'stuchlapuchlamuchla',
        NULL,
        '{ }',
        '{"stuchla"}',
        '{"snowboard"}'
    ),
    (
        'janca',
        'Jana Pekárková',
        'jana.pekarkova.7',
        'jani.sss',
        NULL,
        '{"stuchla"}',
        '{ }',
        '{"snowboard"}'
    ),
    (
        'era',
        'Erika Černá',
        'erika.cerna.31',
        'erika_ce',
        'pavel',
        '{"kopy"}',
        '{"jarin"}',
        '{"lyže"}'
    ),
    (
        'pavel',
        'Pavel Černý',
        'pcerny',
        NULL,
        'era',
        '{ }',
        '{ }',
        '{"lyže"}'
    ),
    (
        'kopy',
        'Jiří Koptík',
        'bia.kopy',
        NULL,
        NULL,
        '{"era"}',
        '{ }',
        '{"lyže"}'
    ),
    (
        'lena',
        'Lenka Černilová',
        'lenka.dvorakova.79',
        'my_lenkaa',
        'milan',
        '{"tomas"}',
        '{ }',
        '{"lyže", "snowboard", "skialpy"}'
    ),
    (
        'milan',
        'Milan Černil',
        'milan.cernil',
        'milanec_',
        'lena',
        '{ }',
        '{ }',
        '{"lyže", "skialpy"}'
    ),
    (
        'tomas',
        'Tomáš Málek',
        'tomas.malek.5',
        'tomalis',
        NULL,
        '{"lena"}',
        '{ }',
        '{"lyže"}'
    ),
    (
        'lucka',
        'Lucie Dostálová',
        'profile.php ? id = 1145558111',
        'meritl',
        NULL,
        '{"mara", "jarda"}',
        '{"junior1", "junior2"}',
        '{"lyže", "snowboard"}'
    ),
    (
        'mara',
        'Marek Hasse',
        'marek.haase.3',
        'mh.marekh',
        NULL,
        '{"lucka"}',
        '{ }',
        '{"lyže"}'
    ),
    (
        'jarda',
        'Jaroslav Syba',
        'jerry.cotton.5',
        'cotton.jerry',
        NULL,
        '{"lucka"}',
        '{ }',
        '{"lyže"}'
    ),
    (
        'junior1',
        'Martin Dostál',
        'martin.dostal.9237',
        'martindostalm',
        NULL,
        '{ }',
        '{"lucka", "junior2"}',
        '{"lyže"}'
    ),
    (
        'junior2',
        'Tomáš Dostál',
        'tomas.dostal.5682',
        'dostal_tomas',
        NULL,
        '{ }',
        '{"lucka","junior1"}',
        '{"lyže"}'
    ),
    (
        'zahrada',
        'Štěpán Zahradník',
        'stepan.zahradnik.7',
        NULL,
        'sima',
        '{ }',
        '{ }',
        '{"lyže"}'
    ),
    (
        'sima',
        'Simona Zahradníková',
        'simi.penickova',
        'ssimipe',
        'zahrada',
        '{ }',
        '{ }',
        '{"lyže"}'
    ),
    (
        'sally',
        'Michal Salinger',
        'michal.salinger',
        'sally_from_kh',
        NULL,
        '{ }',
        '{ }',
        '{"lyže","snowboard"}'
    );