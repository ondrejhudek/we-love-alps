DROP TABLE activity;
CREATE TABLE activity (
    id SERIAL PRIMARY KEY,
    trip_id TEXT NOT NULL,
    member_id TEXT NOT NULL,
    type TEXT NOT NULL,
    distance_km DECIMAL NOT NULL,
    runs INT NOT NULL,
    max_speed_km_h DECIMAL NOT NULL,
    garmin_id BIGINT NOT NULL,
    date DATE NOT NULL
);
INSERT INTO activity (
        trip_id,
        member_id,
        type,
        distance_km,
        runs,
        max_speed_km_h,
        garmin_id,
        date
    )
VALUES (
        '2024-dachstein',
        'hudy',
        'ski',
        40.42,
        19,
        75,
        13756144121,
        '2024-01-31'
    ),
    (
        '2023-passo-del-tonale',
        'hudy',
        'snowboard',
        27.33,
        16,
        50.4,
        10294299922,
        '2023-01-12'
    ),
    (
        '2023-passo-del-tonale',
        'hudy',
        'ski',
        30.98,
        17,
        57.9,
        10287921119,
        '2023-01-11'
    ),
    (
        '2023-passo-del-tonale',
        'hudy',
        'ski',
        30.63,
        23,
        59.7,
        10281315159,
        '2023-01-10'
    ),
    (
        '2023-passo-del-tonale',
        'hudy',
        'snowboard',
        21.65,
        14,
        49.8,
        10274712597,
        '2023-01-09'
    )