const Hapi = require(`@hapi/hapi`);
const notes = require('./api/notes');
const NotesService = require('./service/inMemory/NotesService');
const NotesValidator = require('./validator/notes');

const init = async () => {

    const notesService = new NotesService();

    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== `production` ? `localhost` : `172.31.37.84`,
        routes: {
          cors: {
              origin: [`*`],
          },
        },
    });

    await server.register({
        plugin: notes,
        options: {
            service: notesService,
            validator: NotesValidator,
        },
    })

    server.start();
    console.log(`Server running on ${server.info.uri}`)
};

process.on(`unhandledRejection`, (err) => {
    console.log(err);
    process.exit(1);
});

init();

