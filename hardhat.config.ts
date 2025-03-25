import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-verify';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers'; //for hardhat-deploy-ethers
import '@nomicfoundation/hardhat-foundry';
import 'hardhat-contract-sizer';
import 'hardhat-deploy';
import { HardhatUserConfig, HttpNetworkAccountsUserConfig, NetworkUserConfig } from 'hardhat/types';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

dotenvConfig({ path: resolve(__dirname, './.env') });

const chainIds = {
  localhost: 31337,
  hardhat: 31337,
  'eth-mainnet': 1,
  'eth-sepolia': 11155111,
  'base-mainnet': 8453,
  'base-sepolia': 84532,
  'virtual-mainnet': 1,
};

const infuraApiKey = process.env.INFURA_API_KEY || '';
const alchemyApiKey = process.env.ALCHEMY_API_KEY || '';
const gasPrice = parseInt(process.env.GAS_PRICE || '1000000000');
const etherscanApiKey = process.env.ETHERSCAN_KEY || '';
const tenderlyNetworkKey = process.env.TENDERLY_NETWORK_KEY || '';

function createNetworkConfig(network: keyof typeof chainIds): NetworkUserConfig {
  let url: string;
  if (network === 'virtual-mainnet') {
    url = `https://virtual.mainnet.rpc.tenderly.co/${tenderlyNetworkKey}`;
  } else {
    url = infuraApiKey
      ? `https://${network}.infura.io/v3/${infuraApiKey}`
      : `https://eth-${network}.alchemyapi.io/v2/${alchemyApiKey}`;
  }

  const privateKey = process.env[`${network.toUpperCase()}_PRIVATE_KEY`];
  const v1AdminPK = process.env[`${network.toUpperCase()}_V1_PRIVATE_KEY`] || '';

  let accounts: HttpNetworkAccountsUserConfig = {
    mnemonic: '',
  };
  if (privateKey) {
    accounts = [privateKey];
    if (v1AdminPK) {
      accounts.push(v1AdminPK);
    }
  }

  return {
    accounts,
    chainId: chainIds[network],
    url,
    gasPrice,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: './contracts',
  },
  networks: {
    localhost: {
      chainId: chainIds.localhost,
    },
    hardhat: {
      chainId: chainIds.hardhat,
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
        blockNumber: 21037753,
      },
    },
    mainnet: createNetworkConfig('eth-mainnet'),
    sepolia: createNetworkConfig('eth-sepolia'),
    'base-sepolia': createNetworkConfig('base-sepolia'),
    'base-mainnet': createNetworkConfig('base-mainnet'),
    'virtual-mainnet': createNetworkConfig('virtual-mainnet'),
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },
  solidity: {
    version: '0.8.19',
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: 'none',
      },
      // You should disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v6',
  },
  namedAccounts: {
    deployer: 0,
    v1Admin: 1,
  },
  etherscan: {
    apiKey: etherscanApiKey,
  },
};

export default config;
