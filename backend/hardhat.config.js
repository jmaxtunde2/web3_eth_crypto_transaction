require("@nomiclabs/hardhat-waffle")

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url:"https://eth-sepolia.g.alchemy.com/v2/FQsWknpA76AAD6FouItFrxX5kQ5RIyix",
      accounts:["9b4ecc8acdc2ff13fbbb1bf68d912085a20073b64568ea28ac9445b870e55b12"]
    }
  },
}

// FQsWknpA76AAD6FouItFrxX5kQ5RIyix

// 