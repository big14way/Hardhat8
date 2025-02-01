import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config()

const { LISK_API_KEY_URl,  ETHERSCAN_API_KEY, ACCOUNT_PRIVATE_KEY } = process.env

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
    },
    Lisk: {
      url: LISK_API_KEY_URl,
      accounts: [ `0x${ACCOUNT_PRIVATE_KEY}` ]
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  }
};

export default config;