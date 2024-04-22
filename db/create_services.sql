DROP TABLE IF EXISTS services CASCADE;

CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    car_id INTEGER REFERENCES cars(id),
    date DATE NOT NULL,
    description TEXT NOT NULL,
    cost REAL NOT NULL
);