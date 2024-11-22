import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config()

const HOLESKY = process.env.HOLESKY || "";
const SEPOLIA = process.env.SEPOLIA || "";
const PK = process.env.PK || "";
const PK_SEP = process.env.PK_SEP || "";
const ETHERSCAN = process.env.ETHERSCAN_API || "";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/a0fc37d74b854175994ad08c43cbd608",
        blockNumber: 21236690
      }
    },
    holesky: {
      url: HOLESKY,
      accounts: PK ? [`0x${PK}`] : [],
      chainId: 17000,
      forking: {
        url: "https://mainnet.infura.io/v3/a0fc37d74b854175994ad08c43cbd608",
        blockNumber: 21236690
      }

    },
    sepolia: {
      url: SEPOLIA,
      accounts: PK_SEP ? [`0x${PK_SEP}`] : [],
      chainId: 11155111,
      forking: {
        url: "https://mainnet.infura.io/v3/a0fc37d74b854175994ad08c43cbd608",
        blockNumber: 21236690
      }

    }

  },
  etherscan: {
    apiKey: ETHERSCAN
  },
};

export default config;
