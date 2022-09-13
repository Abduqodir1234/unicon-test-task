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

CREATE INDEX IF NOT EXISTS status_index ON tasks (status);

CREATE INDEX IF NOT EXISTS userId_index ON tasks (userId);

CREATE INDEX IF NOT EXISTS assignedBy_index ON tasks (assignedBy);