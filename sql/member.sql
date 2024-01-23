-- CREATE TYPE interest_enum AS ENUM('lyže', 'skialpy', 'snowboard');
DROP TABLE member;
CREATE TABLE member (
    -- id SERIAL PRIMARY KEY,
    -- alias TEXT NOT NULL UNIQUE,
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    facebook TEXT,
    instagram TEXT,
    current_partner TEXT,
    ex_partners TEXT [],
    siblings TEXT [],
    interest TEXT [] NOT NULL
);
INSERT INTO member (
        id,
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
        'terka',
        '{ }',
        '{ }',
        ARRAY ['lyže', 'snowboard']
    ),
    (
        'terka',
        'Tereza Hudková',
        'tereza.stejskalova.16',
        'stejste',
        'hudy',
        '{ }',
        '{ }',
        ARRAY ['lyže', 'snowboard']
    ),
    (
        'jarin',
        'Jaroslav Černý',
        'jardac1',
        'jardacerny_',
        'daja',
        '{ }',
        '{"era"}',
        ARRAY ['lyže']
    ),
    (
        'daja',
        'Daniela Kováčová',
        'Danielka.Kovac',
        'danielka.kovacova',
        'jarin',
        '{ }',
        '{ }',
        ARRAY ['lyže']
    ),
    (
        'stuchla',
        'Jan Stuchlík',
        'honza.stuchlik.5',
        'johnyst',
        NULL,
        '{"janca"}',
        '{"majki"}',
        ARRAY ['lyže']
    ),
    (
        'majki',
        'Markéta Stuchlíková',
        'stuchlapuchlamuchla',
        'stuchlapuchlamuchla',
        NULL,
        '{ }',
        '{"stuchla"}',
        ARRAY ['snowboard']
    ),
    (
        'janca',
        'Jana Pekárková',
        'jana.pekarkova.7',
        'jani.sss',
        NULL,
        '{"stuchla"}',
        '{ }',
        ARRAY ['snowboard']
    ),
    (
        'era',
        'Erika Černá',
        'erika.cerna.31',
        'erika_ce',
        'pavel',
        '{"kopy"}',
        '{"jarin"}',
        ARRAY ['lyže']
    ),
    (
        'pavel',
        'Pavel Černý',
        'pcerny',
        NULL,
        'era',
        '{ }',
        '{ }',
        ARRAY ['lyže']
    ),
    (
        'kopy',
        'Jiří Koptík',
        'bia.kopy',
        NULL,
        NULL,
        '{"era"}',
        '{ }',
        ARRAY ['lyže']
    ),
    (
        'lena',
        'Lenka Černilová',
        'lenka.dvorakova.79',
        'my_lenkaa',
        'milan',
        '{"tomas"}',
        '{ }',
        ARRAY ['lyže', 'snowboard','skialpy']
    ),
    (
        'milan',
        'Milan Černil',
        'milan.cernil',
        'milanec_',
        'lena',
        '{ }',
        '{ }',
        ARRAY ['lyže','skialpy']
    ),
    (
        'tomas',
        'Tomáš Málek',
        'tomas.malek.5',
        'tomalis',
        NULL,
        '{"lena"}',
        '{ }',
        ARRAY ['lyže']
    ),
    (
        'lucka',
        'Lucie Dostálová',
        'profile.php?id=1145558111',
        'meritl',
        NULL,
        '{"mara", "jarda"}',
        '{"junior1", "junior2"}',
        ARRAY ['lyže', 'snowboard']
    ),
    (
        'mara',
        'Marek Hasse',
        'marek.haase.3',
        'mh.marekh',
        NULL,
        '{"lucka"}',
        '{ }',
        ARRAY ['lyže']
    ),
    (
        'jarda',
        'Jaroslav Syba',
        'jerry.cotton.5',
        'cotton.jerry',
        NULL,
        '{"lucka"}',
        '{ }',
        ARRAY ['lyže']
    ),
    (
        'junior1',
        'Martin Dostál',
        'martin.dostal.9237',
        'martindostalm',
        NULL,
        '{ }',
        '{"lucka", "junior2"}',
        ARRAY ['lyže']
    ),
    (
        'junior2',
        'Tomáš Dostál',
        'tomas.dostal.5682',
        'dostal_tomas',
        NULL,
        '{ }',
        '{"lucka","junior1"}',
        ARRAY ['lyže']
    ),
    (
        'zahrada',
        'Štěpán Zahradník',
        'stepan.zahradnik.7',
        NULL,
        'sima',
        '{ }',
        '{ }',
        ARRAY ['lyže']
    ),
    (
        'sima',
        'Simona Zahradníková',
        'simi.penickova',
        'ssimipe',
        'zahrada',
        '{ }',
        '{ }',
        ARRAY ['lyže']
    ),
    (
        'sally',
        'Michal Salinger',
        'michal.salinger',
        'sally_from_kh',
        NULL,
        '{ }',
        '{ }',
        ARRAY ['lyže', 'snowboard']
    ),
    (
        'terez',
        'Tereza Schwarzová',
        'terez.schwarzova',
        'tereza.schwarz',
        'stuchla',
        '{ }',
        '{ }',
        ARRAY ['lyže']
    ),
    (
        'vobo',
        'Tomáš Voborník',
        'tomas.vobornik.3',
        'vobotom',
        '',
        '{ }',
        '{ }',
        ARRAY ['snowboard']
    ),
(
        'toupy',
        'Ondřej Ťoupal',
        'ondrej.toupal',
        'toupis06',
        '',
        '{ }',
        '{ }',
        ARRAY ['lyže']
    );