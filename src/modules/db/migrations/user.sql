DO $$ BEGIN CREATE TYPE Roles AS ENUM ('Controller', 'Recipent');

EXCEPTION WHEN duplicate_object THEN null;

END $$;

CREATE TABLE
    IF NOT EXISTS users (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        role Roles
    );

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE EXTENSION IF NOT EXISTS btree_gin;

CREATE INDEX
    IF NOT EXISTS trgm_username_index ON users USING GIN ("username" gin_trgm_ops);