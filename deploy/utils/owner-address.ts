import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

dotenvConfig({ path: resolve(__dirname, './.env') });

export function getOwnerAddress(network: string, deployer: string): string {
  if (network === 'mainnet') {
    if (!process.env[`${network.toUpperCase()}_OWNER_ADDRESS`]) {
      throw new Error('No owner address defined for mainnet deployment!');
    } else {
      return process.env[`${network.toUpperCase()}_OWNER_ADDRESS`] || '';
    }
  } else {
    return process.env[`${network.toUpperCase()}_OWNER_ADDRESS`] || deployer;
  }
}
