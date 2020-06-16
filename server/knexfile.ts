import path from 'path';

import environment from './src/config/environment';

module.exports = {
    client: environment.db.DB_CLIENT,
    connection: {
        filename: environment.db.DB_FILENAME
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
};