import { Order } from './../app/models/provider.models';
const baseURL = "https://inventorysystem-bqbkahg5fbbkgzhd.centralus-01.azurewebsites.net/";

export const environment = {
    production: false,
    name: "DEV",

    products: `${baseURL}products` ,
    warehouse: `${baseURL}wharehouse` ,
    client: `${baseURL}client` ,
    provider: `${baseURL}provider` ,
    order: `${baseURL}order` ,
    delivery: `${baseURL}delivery` ,
    transfer: `${baseURL}transefer` ,
    inventory: `${baseURL}inventory` ,

};
