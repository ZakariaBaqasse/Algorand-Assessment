async function run(runtimeEnv, deployer) {

    await deployer.deployASA('acsCoinASA', {
        creator: deployer.accounts[0],
        totalFee: 1000,
        validRounds: 1002
    })
}

module.exports = { default: run };