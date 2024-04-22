DROP TABLE IF EXISTS mot_payments CASCADE;

CREATE TABLE IF NOT EXISTS mot_payments (
    id SERIAL PRIMARY KEY,
    car_id INTEGER REFERENCES cars(id),
    expiry_date DATE NOT NULL,
    status TEXT NOT NULL,
    amount REAL NOT NULL
);