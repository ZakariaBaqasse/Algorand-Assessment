const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
const path = require('path');
const mime = require('mime');
const { convertIpfsCidV0ToByte32 } = require("./helpers/ipfs2bytes32");

const pinata = pinataSDK(
    process.env.VUE_PINATA_API_KEY,
    process.env.VUE_PINATA_API_SECRET
);

async function run(runtimeEnv, deployer) {
    // list of asset names
    const assetNames = [
        "ACS Corgi", "ACS Shiba Inu"
    ];

    //write your code here
}

module.exports = { default: run };
