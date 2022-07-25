/**
 * This file setup the connection to a graphql server
 */
import { HttpLink } from "@apollo/client";

const serverLink: HttpLink = new HttpLink({
    // uri: `${protocol}://${host}:${port}/${version}/${route}`,
    uri: 'https://agp-server.herokuapp.com/',
    // headers: {},
});

export default serverLink;
