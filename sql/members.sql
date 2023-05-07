-- CREATE TABLE members (
--     id VARCHAR PRIMARY KEY,
--     name VARCHAR NOT NULL,
--     facebook VARCHAR,
--     instagram VARCHAR,
--     ex_partners VARCHAR [],
--     siblings VARCHAR [],
--     interest VARCHAR []
-- )
INSERT INTO members (
        id,
        name,
        facebook,
        instagram,
        ex_partners,
        siblings,
        interest
    )
VALUES (
        'stuchla',
        'Jan Stuchlík',
        'honza.stuchlik.5',
        'johnyst',
        ARRAY ['janca'],
        ARRAY ['majki'],
        ARRAY ['lyže']
    ),
    (
        'tomas',
        'Tomáš Málek',
        'tomas.malek.5',
        'tomalis',
        ARRAY ['lena'],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže']
    ),
    (
        'era',
        'Erika Černá',
        'erika.cerna.31',
        'erika_ce',
        ARRAY ['kopy'],
        ARRAY ['jarin'],
        ARRAY ['lyže']
    ),
    (
        'sally',
        'Michal Salinger',
        'michal.salinger',
        'sally_from_kh',
        ARRAY []::VARCHAR [],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže','snowboard']
    ),
    (
        'daja',
        'Daniela Kováčová',
        'Danielka.Kovac',
        'danielka.kovacova',
        ARRAY []::VARCHAR [],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže']
    ),
    (
        'junior2',
        'Tomáš Dostál',
        'tomas.dostal.5682',
        'dostal_tomas',
        ARRAY []::VARCHAR [],
        ARRAY ['lucka','junior1'],
        ARRAY ['lyže']
    ),
    (
        'milan',
        'Milan Černil',
        'milan.cernil',
        'milanec_',
        ARRAY []::VARCHAR [],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže','skialpy']
    ),
    (
        'hudy',
        'Ondřej Hudek',
        'ondrej.hudek',
        'ondrejhudek',
        ARRAY []::VARCHAR [],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže','snowboard']
    ),
    (
        'pavel',
        'Pavel Černý',
        'pcerny',
        '',
        ARRAY []::VARCHAR [],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže']
    ),
    (
        'jarin',
        'Jaroslav Černý',
        'jardac1',
        'jardacerny_',
        ARRAY []::VARCHAR [],
        ARRAY ['era'],
        ARRAY ['lyže']
    ),
    (
        'lucka',
        'Lucie Dostálová',
        'profile.php?id=1145558111',
        'meritl',
        ARRAY ['mara','jarda'],
        ARRAY ['junior1','junior2'],
        ARRAY ['lyže','snowboard']
    ),
    (
        'mara',
        'Marek Hasse',
        'marek.haase.3',
        'mh.marekh',
        ARRAY ['lucka'],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže']
    ),
    (
        'jarda',
        'Jaroslav Syba',
        'jerry.cotton.5',
        'cotton.jerry',
        ARRAY ['lucka'],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže']
    ),
    (
        'terka',
        'Tereza Hudková',
        'tereza.stejskalova.16',
        'stejste',
        ARRAY []::VARCHAR [],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže','snowboard']
    ),
    (
        'majki',
        'Markéta Stuchlíková',
        'stuchlapuchlamuchla',
        'stuchlapuchlamuchla',
        ARRAY []::VARCHAR [],
        ARRAY ['stuchla'],
        ARRAY ['snowboard']
    ),
    (
        'janca',
        'Jana Pekárková',
        'jana.pekarkova.7',
        'jani.sss',
        ARRAY ['stuchla'],
        ARRAY []::VARCHAR [],
        ARRAY ['snowboard']
    ),
    (
        'junior1',
        'Martin Dostál',
        'martin.dostal.9237',
        'martindostalm',
        ARRAY []::VARCHAR [],
        ARRAY ['lucka','junior2'],
        ARRAY ['lyže']
    ),
    (
        'sima',
        'Simona Zahradníková',
        'simi.penickova',
        'ssimipe',
        ARRAY []::VARCHAR [],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže']
    ),
    (
        'zahrada',
        'Štěpán Zahradník',
        'stepan.zahradnik.7',
        '',
        ARRAY []::VARCHAR [],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže']
    ),
    (
        'kopy',
        'Jiří Koptík',
        'bia.kopy',
        '',
        ARRAY ['era'],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže']
    ),
    (
        'lena',
        'Lenka Černilová',
        'lenka.dvorakova.79',
        'my_lenkaa',
        ARRAY ['tomas'],
        ARRAY []::VARCHAR [],
        ARRAY ['lyže','snowboard','skialpy']
    );