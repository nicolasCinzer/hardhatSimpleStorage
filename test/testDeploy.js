const { ethers } = require('hardhat')
const { expect, assert } = require('chai')

describe('SimpleStorage', () => {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it('Should start with a favorite number of 0', async () => {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = '0'

        assert.equal(currentValue.toString(), expectedValue)
    })

    it('Should update the current favorite number', async () => {
        const expectedValue = '88'
        const updateValue = await simpleStorage.store(expectedValue)
        await updateValue.wait(1)
        const currentValue = await simpleStorage.retrieve()

        assert.equal(currentValue.toString(), expectedValue)
    })

    it('Should add a person with some number to the mapping variable', async () => {
        const expectedPerson = 'Nicolas'
        const expectedNumber = '88'
        const updateValue = await simpleStorage.addPerson(
            expectedPerson,
            expectedNumber
        )
        await updateValue.wait(1)
        const peopleResponse = await simpleStorage.people(0)
        const currentName = peopleResponse.name
        const currentNumber = peopleResponse.favoriteNumber.toString()

        assert.equal(currentName, expectedPerson)
        assert.equal(currentNumber, expectedNumber)
    })
})
