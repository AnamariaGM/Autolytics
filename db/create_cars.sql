DROP TABLE IF EXISTS cars CASCADE;

CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    registration_number TEXT NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    fuel_type TEXT NOT NULL,
    colour TEXT NOT NULL,
    engine_capacity INTEGER NOT NULL
);