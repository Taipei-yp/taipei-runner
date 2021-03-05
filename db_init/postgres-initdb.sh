  #!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    CREATE ROLE runner WITH LOGIN PASSWORD 'runner';
    CREATE DATABASE "taipei_runner" OWNER = runner;
    GRANT ALL PRIVILEGES ON DATABASE "taipei_runner" TO runner;
EOSQL