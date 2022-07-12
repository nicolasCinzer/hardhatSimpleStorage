const { ethers, run, network } = require('hardhat')
require('dotenv').config()

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        'SimpleStorage'
    )
    console.log('Deploying contract...')
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed contract to: ${simpleStorage.address}`)
    if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
        console.log('Waiting some blocks confirmation...')
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value: ${currentValue}`)
    const txResponse = await simpleStorage.store(88)
    await txResponse.wait(1)
    const updatedNumber = await simpleStorage.retrieve()
    console.log(`Updated value: ${updatedNumber}`)
}

async function verify(contractAddress, args) {
    console.log('Verifying contract...')
    try {
        await run('verify:verify', {
            address: contractAddress,
            constructorArgs: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes('already verified')) {
            console.log('Already Verified Contract!')
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
