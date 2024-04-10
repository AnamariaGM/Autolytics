DROP TABLE IF EXISTS tax_payments;

CREATE TABLE IF NOT EXISTS tax_payments (
    id SERIAL PRIMARY KEY,
    car_id INTEGER REFERENCES cars(id),
    expiry_date DATE NOT NULL,
    status TEXT NOT NULL,
    amount REAL NOT NULL
);