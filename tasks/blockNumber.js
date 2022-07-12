const { task } = require('hardhat/config')

task('block-number', 'Current block number of the blockchain').setAction(
    async (args, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}
