import knex from 'knex';

import environment from '../config/environment';

const connection = knex({
    client: environment.db.DB_CLIENT,
    connection: {
        filename: environment.db.DB_FILENAME
    },
    useNullAsDefault: true,
});

export default connection;