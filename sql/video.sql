DROP TABLE video;
CREATE TABLE video (
    id SERIAL PRIMARY KEY,
    trip_id TEXT NOT NULL,
    youtube_id TEXT NOT NULL
);
INSERT INTO video (trip_id, youtube_id)
VALUES ('2016-zell-am-see', 'eDBsxk9J7OQ'),
    ('2017-sella-ronda', 'CGXVrdCztpE'),
    ('2018-solden', 'XZFP3U8kLAY'),
    ('2019-kronplatz', 'twGFDV4YvxQ'),
    ('2020-schladming', '_HHgYaV00Ds'),
    ('2022-kitzbuhel', 'zIo_PU-8UYw'),
    ('2023-passo-del-tonale', 'KJlZEukVEcw');