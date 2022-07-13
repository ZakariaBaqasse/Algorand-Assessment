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
    // read directory
    const sourcePath = path.join(__dirname, '../assets/nft/');
    const assets = fs.readdirSync(sourcePath).map((file, index) => {
        const asset = {
            index: index + 1, // 1-based index
            name: `${assetNames[index]} #${index + 1}`, // e.g Corgi #1
            description: `Asset ${index + 1}/${assetNames.length}`,
            image_mimetype: mime.getType(file),
            file: file,
        };
        return asset;
    });
    console.log(assets);

    // check pinata connection
    const response = await pinata.testAuthentication();
    if (!response) {
        console.log('Unable to authenticate with Pinata');
        return;
    }

    // pin content directory
    const folderOptions = {
        pinataMetadata: {
            name: "nfts",
        },
        pinataOptions: {
            cidVersion: 0
        }
    };

    const result = await pinata.pinFromFS(sourcePath, folderOptions);
    console.log("Digital content pinned: ", result);

    // prepare to deploy assets
    let integrity = convertIpfsCidV0ToByte32(result.IpfsHash);
    await Promise.all(assets.map(async(asset) => {

        // construct metadata for each asset
        const metadata = {
            name: asset.name,
            description: asset.description,
            image: `ipfs://${result.IpfsHash}/Cours/Course/Algorand Fundamentals/assessment/arc3-nft-ZakariaBaqasse/assets/nft/${asset.file}`,
            image_integrity: `sha256-${integrity.base64}`,
            image_mimetype: asset.image_mimetype,
            properties: {
                file_url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}/${asset.file}`,
                file_url_integrity: `sha256-${integrity.base64}`,
                file_url_mimetype: asset.image_mimetype,
            },
        };

        // pin metadata
        const jsonOptions = {
            pinataMetadata: {
                name: `${asset.index}-metadata.json`,
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        const resultMeta = await pinata.pinJSONToIPFS(metadata, jsonOptions);
        console.log("JSON Metadata pinned: ", resultMeta);
        let jsonIntegrity = convertIpfsCidV0ToByte32(resultMeta.IpfsHash);

        const preparedAsset = {
            name: asset.name,
            url: `ipfs://${resultMeta.IpfsHash}#arc3`,
            metadata: jsonIntegrity.buffer,
            integrity: jsonIntegrity.base64,
        };

        // prepare metadata hash
        const metadataHash = new Uint8Array(preparedAsset.metadata);
        console.log('ASA MetaDataHash: ', metadataHash);
        console.log('ASA MetaDataHash Length: ', metadataHash.length);

        // deploy asset
        const asaDef = {
            total: 1,
            decimals: 0,
            defaultFrozen: false,
            unitName: "ACSNFT",
            url: preparedAsset.url,
            metadataHash: metadataHash,
            note: "",
            manager: "",
            reserve: "",
            freeze: "",
            clawback: ""
        };

        await deployer.deployASADef(preparedAsset.name, asaDef, {
            creator: deployer.accounts[0],
            totalFee: 1000,
            validRounds: 4,
        });

    }));
}

module.exports = { default: run };