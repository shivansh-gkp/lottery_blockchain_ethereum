const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3= require('web3');
const { interface, bytecode } = require('./compile');

console.log('after compile data');

const provider = new HDWalletProvider('group wait keen noise night secret winter train make meat claim crystal', 'https://rinkeby.infura.io/zptLWwbX9l4oZOztRz0T');

console.log('after hd wallet');

const web3 = new Web3(provider);

const deploy= async () => {

const accounts = await web3.eth.getAccounts();

console.log('attempting to deploy from account', accounts[0]);

const result= await new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode} ).send({gas: '1000000', from: accounts[0] });
console.log(interface);
console.log('contract deployed to', result.options.address);
};

deploy();
