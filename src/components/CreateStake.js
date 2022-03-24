import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers'
import abi from '../utils/Staking.json';
import { parseEther } from 'ethers/lib/utils';

const CreateStake = () => {
    const [amount, setAmount] = useState('')
    const [balance, setBalance] = useState(null)
    const [tokenName, setTokenName] = useState('')

    const contractAddress = '0x636C305Fc1ae621Db3bBe6c6FB06E24CfC239F22'
    const contractABI = abi.abi
    const staking = async (currentAccount) => {
        try {
            const {ethereum} = window
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const stakingContract = new ethers.Contract(contractAddress, contractABI, signer)
              let balanceBig = await stakingContract.balanceOf(currentAccount)
              let balanceNumber = balanceBig.toNumber()
              let decimals = stakingContract.decimals()
              let tokenBalance = balanceNumber / Math.pow(10, decimals)
              setBalance(tokenBalance)

              setTokenName(await stakingContract.name())
              
                const stakingTxn = await stakingContract.createStake( ethers.utils.parseEther(amount))
                await stakingTxn.wait()
            }else{
                console.log('ethereum object does not exist!')
            }
        } catch (error) {
            console.log(error)
        }
    }

useEffect(() => {
    const staking = async (currentAccount) => {
        try {
            const {ethereum} = window
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const stakingContract = new ethers.Contract(contractAddress, contractABI, signer)
              let balanceBig = await stakingContract.balanceOf(currentAccount)
              let balanceNumber = balanceBig.toNumber()
              let decimals = stakingContract.decimals()
              let tokenBalance = balanceNumber / Math.pow(10, decimals)
              setBalance(tokenBalance)

              setTokenName(await stakingContract.name())
            }else{
                console.log('ethereum object does not exist!')
            }
        } catch (error) {
            console.log(error)
        }
    }
}, [])

console.log(tokenName)
    const handleSubmit = (e) => {
        e.preventDefault();
        staking()
    }
    return (
        <div>
            <p>Number of tokens staked:{amount} </p>

            <p>{tokenName} Balance: {balance}</p>
            <div>


                <p>Stake tokens here:</p>
            <form onSubmit={handleSubmit}>
        <p>
          <input
            type="number"
            name=""
            id=""
            placeholder="Enter Amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step='any'
            min='0'
          />
        </p>
        <button type="submit">
          Send
        </button>
      </form>
            </div>
        </div>
    )
}


export default CreateStake