import {Navbar, Nav, Button, Container, Row, Col} from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import logo from '../logo.png';
import Web3 from 'web3'
import './App.css';

function App() {
  const [address, setAddress] = useState(null)
  const [balance, setBalance] = useState(null)
  const [network, setNetwork] = useState(null)

  const update = async () =>{
    const web3 = new Web3(window.ethereum)
    setNetwork(await web3.eth.net.getNetworkType())
    const accounts = await web3.eth.getAccounts()

    if(accounts.length!==0){
      setAddress(accounts[0])
      setBalance(await web3.eth.getBalance(accounts[0]))
    } else {
      setAddress(null)
      setBalance(null)
    }
  }

  useEffect(() => {
    if(window.ethereum){
      update()

      window.ethereum.on('accountsChanged', () => { update() });
      window.ethereum.on('chainChanged', () => { update() });
    }
  });

  return (
    <div className="text-monospace">
      <Navbar bg="dark" expand="lg" className="text-white">
        <Navbar.Brand href="https://www.dappuniversity.com/bootcamp" target="_blank" rel="noopener noreferrer">
          <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />&nbsp;
          <span className="text-secondary">dApp template</span>
        </Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        { address
          ? <span>
              <a href={`https://etherscan.io/address/` + address} target="_blank" rel="noopener noreferrer" className="text-white border">
                &nbsp;<b>Address:</b> {(address).substring(0,6)}...{(address).substring(38,42)}&nbsp;
              </a>&nbsp;
              <span className="border">&nbsp;<b>Network:</b> {network.charAt(0).toUpperCase() + network.slice(1)} &nbsp;</span>&nbsp;
              <span className="border">&nbsp;<b>Balance:</b> &nbsp;{(balance/10**18).toFixed(5)} ETH&nbsp;</span>
            </span>
          : !address && window.ethereum
            ? <Button variant="outline-success" onClick={() => window.ethereum.enable()}>Connect</Button>
            : <Button variant="outline-success" onClick={() => window.open("https://metamask.io/")}>Get MetaMask</Button>
        }
      </Navbar>
      <Container className="App">
        <Row className="border">
          <Col className="border">Row:1; Col:1;</Col>
          <Col className="border">Row:1; Col:2;</Col>
        </Row>
        <Row className="border">
          <Col>Row:2; Col:1;</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;