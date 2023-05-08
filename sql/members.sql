-- CREATE TABLE members (
--     id SERIAL PRIMARY KEY,
--     alias TEXT NOT NULL UNIQUE,
--     name TEXT NOT NULL,
--     facebook TEXT,
--     instagram TEXT,
--     ex_partners TEXT [],
--     siblings TEXT [],
--     interest TEXT []
-- );
INSERT INTO members (
        alias,
        name,
        facebook,
        instagram,
        ex_partners,
        siblings,
        interest
    )
VALUES (
        'hudy',
        'Ondřej Hudek',
        'ondrej.hudek',
        'ondrejhudek',
        '{ }',
        '{ }',
        '{"lyže", "snowboard"}'
    ),
    (
        'terka',
        'Tereza Hudková',
        'tereza.stejskalova.16',
        'stejste',
        '{ }',
        '{ }',
        '{"lyže", "snowboard"}'
    ),
    (
        'jarin',
        'Jaroslav Černý',
        'jardac1',
        'jardacerny_',
        '{ }',
        '{"era"}',
        '{"lyže"}'
    ),
    (
        'daja',
        'Daniela Kováčová',
        'Danielka.Kovac',
        'danielka.kovacova',
        '{ }',
        '{ }',
        '{"lyže"}'
    ),
    (
        'stuchla',
        'Jan Stuchlík',
        'honza.stuchlik.5',
        'johnyst',
        '{"janca"}',
        '{"majki"}',
        '{"lyže"}'
    ),
    (
        'majki',
        'Markéta Stuchlíková',
        'stuchlapuchlamuchla',
        'stuchlapuchlamuchla',
        '{ }',
        '{"stuchla"}',
        '{"snowboard"}'
    ),
    (
        'janca',
        'Jana Pekárková',
        'jana.pekarkova.7',
        'jani.sss',
        '{"stuchla"}',
        '{ }',
        '{"snowboard"}'
    ),
    (
        'era',
        'Erika Černá',
        'erika.cerna.31',
        'erika_ce',
        '{"kopy"}',
        '{"jarin"}',
        '{"lyže"}'
    ),
    (
        'pavel',
        'Pavel Černý',
        'pcerny',
        NULL,
        '{ }',
        '{ }',
        '{"lyže"}'
    ),
    (
        'kopy',
        'Jiří Koptík',
        'bia.kopy',
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
        '{"tomas"}',
        '{ }',
        '{"lyže", "snowboard", "skialpy"}'
    ),
    (
        'milan',
        'Milan Černil',
        'milan.cernil',
        'milanec_',
        '{ }',
        '{ }',
        '{"lyže", "skialpy"}'
    ),
    (
        'tomas',
        'Tomáš Málek',
        'tomas.malek.5',
        'tomalis',
        '{"lena"}',
        '{ }',
        '{"lyže"}'
    ),
    (
        'lucka',
        'Lucie Dostálová',
        'profile.php ? id = 1145558111',
        'meritl',
        '{"mara", "jarda"}',
        '{"junior1", "junior2"}',
        '{"lyže", "snowboard"}'
    ),
    (
        'mara',
        'Marek Hasse',
        'marek.haase.3',
        'mh.marekh',
        '{"lucka"}',
        '{ }',
        '{"lyže"}'
    ),
    (
        'jarda',
        'Jaroslav Syba',
        'jerry.cotton.5',
        'cotton.jerry',
        '{"lucka"}',
        '{ }',
        '{"lyže"}'
    ),
    (
        'junior1',
        'Martin Dostál',
        'martin.dostal.9237',
        'martindostalm',
        '{ }',
        '{"lucka", "junior2"}',
        '{"lyže"}'
    ),
    (
        'junior2',
        'Tomáš Dostál',
        'tomas.dostal.5682',
        'dostal_tomas',
        '{ }',
        '{"lucka","junior1"}',
        '{"lyže"}'
    ),
    (
        'zahrada',
        'Štěpán Zahradník',
        'stepan.zahradnik.7',
        NULL,
        '{ }',
        '{ }',
        '{"lyže"}'
    ),
    (
        'sima',
        'Simona Zahradníková',
        'simi.penickova',
        'ssimipe',
        '{ }',
        '{ }',
        '{"lyže"}'
    ),
    (
        'sally',
        'Michal Salinger',
        'michal.salinger',
        'sally_from_kh',
        '{ }',
        '{ }',
        '{"lyže","snowboard"}'
    );