import axios from 'axios';
import fs from 'fs-extra';
import hre from 'hardhat';
import { join, resolve } from 'path';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: resolve(__dirname, './.env') });

const kittyAddresses = {
  mainnet: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
  goerli: '0x0000000000000000000000000000000000000000',
  sepolia: '0x0000000000000000000000000000000000000000',
};

const apiEndpoints = {
  mainnet: 'https://api.nftfi.com/projects',
  goerli: 'https://goerli-api.nftfi.com/projects',
  sepolia: 'https://sepolia-api.nftfi.com/projects',
};

// TODO - @lmcorbalan - This size should be tested for mainnet, currently there ara 130 element in the permitted list,
//                      to find the best size to minimize the number of batches, thus the number of tx
const BATCH_SIZE = 4;

type Networks = keyof typeof apiEndpoints;

async function main(): Promise<void> {
  const network = hre.network.name as Networks;

  if (!network || !['mainnet', 'goerli', 'sepolia'].includes(network)) {
    throw Error('Wrong network');
  }

  const fileName = join(__dirname, '../deploy/config', `permittedList.${network}.json`);

  const apiUserAgent = process.env[`API_USER_AGENT`] || '';

  const response = await axios.get(apiEndpoints[network], { headers: { 'User-Agent': apiUserAgent } });

  const permittedList = response.data
    .filter(
      (project: any) =>
        project.isWhitelisted &&
        project.metadata &&
        (project.metadata.schema_name === 'ERC721' ||
          project.metadata.schema_name === 'ERC1155' ||
          project.metadata.schema_name === 'PUNKS'),
    )
    .map((project: any) => {
      return {
        address: project.address,
        type:
          project.address.toLowerCase() === kittyAddresses[network] ? 'CryptoKitties' : project.metadata.schema_name,
      };
    });

  const currentList = await fs.readJson(fileName);
  const newList = { ...currentList };

  newList.NFT.deploymentBatch = permittedList.slice(0, BATCH_SIZE);
  newList.NFT.postDeploymentBatches = [];

  let i = BATCH_SIZE;
  while (i <= permittedList.length - 1) {
    newList.NFT.postDeploymentBatches.push(permittedList.slice(i, i + BATCH_SIZE));
    i += BATCH_SIZE;
  }

  await fs.writeJSON(fileName, newList, { spaces: 2, EOL: '\r\n' });
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
