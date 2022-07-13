/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { executeTransaction } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");

async function run(runtimeEnv, deployer) {
    //write your code here
    const master = deployer.accountsByName.get("master");
    const buyer = deployer.accountsByName.get("buyer");
    await executeTransaction(deployer, {
        type: types.TransactionType.OptInASA,
        sign: types.SignType.SecretKey,
        fromAccount: buyer,
        assetID: 56,
        payFlags: { totalFee: 1000 }
    })
    await executeTransaction(deployer, {
        type: types.TransactionType.TransferAsset,
        // eslint-disable-next-line no-undef
        sign: types.SignType.SecretKey,
        fromAccount: master,
        toAccountAddr: buyer.addr,
        amount: 100,
        assetID: 56,
        payFlags: { totalFee: 1000 }
    })

}

module.exports = { default: run };