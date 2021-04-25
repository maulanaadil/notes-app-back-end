const Hapi = require(`@hapi/hapi`);
const routes = require(`./routes`);

const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== `production` ? `localhost` : `172.31.37.84`,
        routes: {
          cors: {
              origin: [`*`],
          },
        },
    });
    server.route(routes);

    server.start();
    console.log(`Server running on ${server.info.uri}`)
};

process.on(`unhandledRejection`, (err) => {
    console.log(err);
    process.exit(1);
});

init();

