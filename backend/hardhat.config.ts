import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/a0fc37d74b854175994ad08c43cbd608",
        blockNumber: 21236690
      }
    }
  }
};

export default config;
