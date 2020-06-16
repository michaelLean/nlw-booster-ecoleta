import path from 'path';

const environment = {
    db: {
        DB_CLIENT: process.env.DB_CLIENT || 'sqlite3',
        DB_FILENAME: process.env.DB_FILENAME || path.resolve(__dirname, '..', 'database', 'database.sqlite'),
    },
    server: {
        SERVER_PORT: process.env.SERVER_PORT || '3333',
        SERVER_URL: process.env.SERVER_URL || 'http://127.0.0.1'
    }
}

export default environment;