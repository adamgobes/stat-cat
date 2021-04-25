import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { Contract } from '@ethersproject/contracts'
import { BigNumber } from '@ethersproject/bignumber'
import { Wallet } from '@ethersproject/wallet'

let addresses: SignerWithAddress[]
let erc20Token: Contract

const POOL_PAYOUT = 20
const NUM_MEMBERS = 10
const AMOUNT = 2

const createPool = async () => {
    addresses = await ethers.getSigners()

    erc20Token = await deployERC20()

    const Pool = await ethers.getContractFactory('Pool')
    const pool = await Pool.deploy(POOL_PAYOUT, NUM_MEMBERS, erc20Token.address)

    return pool
}

describe('Pool', function () {
    it('Should create a new pool with a payout and asset address', async function () {
        const pool = await createPool()

        await pool.deployed()
        expect(await pool.totalPayout()).to.equal(POOL_PAYOUT)
        expect(await pool.maxMemberCount()).to.equal(NUM_MEMBERS)
        expect(await pool.pricePerAddress()).to.equal(AMOUNT)
    })

    it('Should add members to the pool', async function () {
        const userAddress = addresses[1]

        const pool = await createPool()

        await pool.deployed()

        await erc20Token.connect(userAddress).mintDummy()
        await erc20Token.connect(userAddress).approve(pool.address, AMOUNT)

        const balanceBefore: BigNumber = await erc20Token.balanceOf(userAddress.address)

        await pool.connect(userAddress).addAddressToPool()
        expect(await pool.currentMemberCount()).to.equal(1)
        expect(await pool.currentPoolWorth()).to.equal(AMOUNT)
        expect(await erc20Token.balanceOf(userAddress.address)).to.equal(balanceBefore.sub(AMOUNT))
    })

    it('Should payout to the user who receives more than half the votes', async function () {
        const pool = await createPool()

        await pool.deployed()

        await addToPool(NUM_MEMBERS, pool)
        expect(await pool.currentMemberCount()).to.equal(10)

        const winner = addresses[1]
        const balanceBefore: BigNumber = await erc20Token.balanceOf(winner.address)

        for (let i = 2; i < NUM_MEMBERS; i++) {
            await pool.connect(addresses[i]).voteForAddress(winner.address)
        }
        expect(await erc20Token.balanceOf(winner.address)).to.equal(balanceBefore.add(POOL_PAYOUT))
    })
})

async function deployERC20() {
    let TokenContract = await ethers.getContractFactory('ERC20Token')
    erc20Token = await TokenContract.deploy()
    return erc20Token
}

async function addToPool(numMembers, pool) {
    for (let i = 1; i < numMembers + 1; i++) {
        let a = addresses[i]
        await erc20Token.connect(a).mintDummy()
        await erc20Token.connect(a).approve(pool.address, AMOUNT)
        await pool.connect(a).addAddressToPool()
    }
}
