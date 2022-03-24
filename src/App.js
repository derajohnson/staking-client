import {useEffect, useState} from 'react';
import './App.css';
import CreateStake from './components/CreateStake';

//  0x636C305Fc1ae621Db3bBe6c6FB06E24CfC239F22

function App() {
  const [currentAccount, setCurrentAccount] = useState ('');
   
  const checkIfWalletIsConnected = async () => {
    try {
      const {ethereum} = window;
      if (!ethereum) {
        console.log ('you need to install metamask');
      } else {
        console.log ('found one', ethereum);
      }
      /*
      * Check if we're authorized to access the user's wallet
      */

      const accounts = await ethereum.request ({method: 'eth_accounts'});
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log ('account ', account);
        setCurrentAccount (account);
      } else {
        console.log ('no authorized account found');
      }
    } catch (error) {
      console.log (error);
    }
  };

  //connect wallet with button click
  const connectWallet = async() => {
   try {
    const {ethereum} = window;
    if (!ethereum) {
      console.log ('you need to install metamask');
      return;
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log("Connected", accounts[0]);
    setCurrentAccount(accounts[0]);
   } catch (error) {
     console.log(error)
   }
 }
  useEffect (() => {
    checkIfWalletIsConnected ();
  }, []);







  return (
    <div>
      {currentAccount.length === 0 ?  <div>
          
            <div className='content'>
              <h2>Please connect your wallet</h2>
            <button className='connect-btn' onClick={() => connectWallet()}>
              Connect Wallet
            </button>
            </div>
          
        </div> : <div>
          <p> Welcome </p>
<CreateStake currentAccount={currentAccount}/>
  </div>}
    </div>
  );
}

export default App;
