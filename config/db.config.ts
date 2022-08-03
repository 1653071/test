import mongoose from "mongoose"

import * as config from "./configs.json"

async function connect() {
    mongoose.connect(config.mongodb.connectStr, function (err) {
        if (err)
            throw err;

        console.log('Successfully connected');
    });
}
export default {connect}