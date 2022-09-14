DO
    $$ BEGIN CREATE TYPE Statuses AS ENUM (
        'IN_PROGRESS',
        'WAITING_APPROVAL',
        'DONE'
    );

EXCEPTION WHEN duplicate_object THEN null;

END $$;

CREATE TABLE
    IF NOT EXISTS tasks (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        description TEXT NOT NULL,
        dueDate TIMESTAMP NOT NULL,
        status Statuses,
        userId BIGINT REFERENCES users (id) NOT NULL,
        assignedBy BIGINT REFERENCES users (id) NOT NULL
    );

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE EXTENSION IF NOT EXISTS btree_gin;

CREATE INDEX
    IF NOT EXISTS trgm_userId_index ON tasks USING GIN (userId);

CREATE INDEX
    IF NOT EXISTS trgm_assignedBy_index ON tasks USING GIN (assignedBy);