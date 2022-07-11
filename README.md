# Assessment on fundamentals of Algorand

In this assessment, you are required to do the following, 

### Part 1: Create and transfer fungible tokens
1. Deploy a fungible token. You will be using this token to "purchase" the NFT.
2. Transfer 100 fungible tokens to your buyer account. You can do this during the deployment of the token.

### Part 2: Create and transfer NFTs
1. Deploy an NFT collection and display it on the sample Dapp provided. The digital content of the NFTs can be found in the `assets/nft` folder.

The created NFTs should follow [ARC3](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0003.md) standards. This includes 

1. Asset url contains the IPFS url of the JSON metadata. Append '#arc3' to the end of this url also.
2. Within the JSON metadata, it should contain the IPFS url of the image file.

### Part 3: Updating the Dapp

#### Connecting the buyer account
1. Your Dapp should allow users to connect to AlgoSigner (localhost). The buyer account should be reflected on the Dapp upon successful connection. 
2. You will also need to import the master account to AlgoSigner (localhost) in preparation for the purchase transaction.

#### Making the purchase
1. Purchase an NFT on the Dapp with your buyer account. Each purchase costs `5 fungible tokens`.
2. NFT purchase should be done using an *atomic transfer*, which includes the following transactions (NFT opt-in, NFT transfer, Fungible token transfer).

You can refer to the [AlgoSigner documentation](https://github.com/PureStake/algosigner/blob/develop/docs/dApp-integration.md#algosignersigntxntxnobjects) on how to implement atomic transfer for AlgoSigner. AlgoSigner should prompt the buyer to approve all 3 transactions within the atomic transfer when making the purchase.

## Bonus
When creating the NFTs, add a metadata hash of the content ID (cid) of the pinned JSON metadata file. Perform integrity check on this hash in the Dapp to ensure that this NFT points to the correct JSON metadata file. You can use the helper functions in `scripts/helpers/ipfs2bytes32.js` to hash the cid.

## Pinning content using Pinata
Use the following methods to pin files/folders to IPFS

- [pinFileToIPFS](https://www.npmjs.com/package/@pinata/sdk#pinFileToIPFS) - Pins a file to IPFS.
- [pinFromFS](https://www.npmjs.com/package/@pinata/sdk#pinFromFS) - Pins a directory to IPFS. 

For `pinFromFS`, windows users might encounter an issue where files are pinned to the wrong directory. Additional sub directories were created (i.e. `ipfs://<content_id>/Users/<usersname>/<repo directory>/assets/nft/<asset filename>`) instead of `ipfs://<content_id>/<asset_filename>`. You might need to tweak the image url accordingly in your JSON metadata.

## Setup instructions

### 1. Install packages
```
yarn install
```

### 2. Update environement variables
1. Copy `.env.example` to `.env`.
2. Update Algorand Sandbox credentials in `.env` file.

### 3. Setup Pinata IPFS
1. Create a free account on [Pinata](https://www.pinata.cloud/)
2. Generate API key via account page.
3. Update `.env` file with the credentials.

### 4. Update `algob.config.js`
1. Update the master and buyer account credentials

### 5. Use .env file
```
source .env
```

### 6. Algo Builder deployment commands
```
# Run all deployment scripts
yarn run algob deploy

# Cleanup artifacts folder
yarn run algob clean

# Run one deployment script
yarn run algob deploy scripts/<filename>
```

### 7. Copy the deployed checkpoint files to src folder
```
cp artifacts/scripts/<filename>.yaml src/artifacts/
```

### 8. Run the Dapp
```
yarn serve
```
