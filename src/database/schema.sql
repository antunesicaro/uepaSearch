CREATE DATABASE uepaprocura

CREATE TABLE professor(
    id VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    phone VARCHAR,
    especialidade VARCHAR
);