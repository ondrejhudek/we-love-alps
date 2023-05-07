-- CREATE TABLE trips (
--     id VARCHAR PRIMARY KEY,
--     title VARCHAR NOT NULL,
--     country_code VARCHAR NOT NULL,
--     year INT NOT NULL,
--     month INT NOT NULL,
--     accomodation_name VARCHAR,
--     accomodation_map VARCHAR,
--     resorts VARCHAR [] NOT NULL,
--     members VARCHAR [] NOT NULL,
--     non_members INT;
-- )
INSERT INTO trips (
        id,
        title,
        country_code,
        year,
        month,
        resorts,
        members,
        non_members
    )
VALUES (
        '2013-aprica',
        'Aprica',
        'IT',
        2013,
        3,
        ARRAY ['aprica'],
        ARRAY ['hudy','jarin','stuchla','majki','era','kopy','lena','tomas','lucka','mara'],
        4
    ),
    (
        '2017-ponte-di-legno',
        'Ponte di Legno',
        'IT',
        2017,
        3,
        ARRAY ['tonale'],
        ARRAY ['stuchla','janca','era','pavel','lena','lucka','jarda','junior1','zahrada'],
        0
    ),
    (
        '2015-les-sybelles',
        'Les Sybelles',
        'FR',
        2015,
        1,
        ARRAY ['les-sybelles'],
        ARRAY ['hudy','terka'],
        6
    ),
    (
        '2020-schladming',
        'Schladming',
        'AT',
        2020,
        2,
        ARRAY ['schladming'],
        ARRAY ['hudy','terka','jarin','stuchla','lena','milan','sally'],
        3
    ),
    (
        '2016-zell-am-see',
        'Zell am See',
        'AT',
        2016,
        2,
        ARRAY ['kitzsteinhorn','schmitten','saalbach'],
        ARRAY ['hudy','terka','jarin','stuchla','janca','era','pavel','lucka','mara'],
        0
    ),
    (
        '2009-ponte-di-legno',
        'Ponte di Legno',
        'IT',
        2009,
        2,
        ARRAY ['tonale'],
        ARRAY ['hudy','jarin','stuchla'],
        3
    ),
    (
        '2008-lienz',
        'Lienz',
        'AT',
        2008,
        3,
        ARRAY ['lienz','grossglockner','molltaler'],
        ARRAY ['hudy','jarin','stuchla','majki'],
        2
    ),
    (
        '2020-zell-am-see',
        'Zell am See',
        'AT',
        2020,
        3,
        ARRAY ['kitzsteinhorn','schmitten'],
        ARRAY ['hudy','terka'],
        2
    ),
    (
        '2022-kitzbuhel',
        'Kitzbühel',
        'AT',
        2022,
        2,
        ARRAY ['kitzbuhel','brixen'],
        ARRAY ['hudy','terka','jarin','stuchla','lena','milan'],
        0
    ),
    (
        '2018-solden',
        'Sölden',
        'AT',
        2018,
        1,
        ARRAY ['solden'],
        ARRAY ['hudy','terka','stuchla','era','pavel','lena','milan','lucka','jarda','junior1','junior2','zahrada','sima'],
        0
    ),
    (
        '2011-tauplitz',
        'Tauplitz',
        'AT',
        2011,
        3,
        ARRAY ['tauplitzalm'],
        ARRAY ['hudy','jarin'],
        1
    ),
    (
        '2023-passo-del-tonale',
        'Passo del Tonale',
        'IT',
        2023,
        1,
        ARRAY ['tonale'],
        ARRAY ['hudy','terka','jarin','stuchla','sally'],
        3
    ),
    (
        '2019-kronplatz',
        'Kronplatz',
        'IT',
        2019,
        3,
        ARRAY ['kronplatz'],
        ARRAY ['hudy','terka','jarin','daja','stuchla','lena','milan','lucka','jarda','junior1','junior2'],
        0
    );