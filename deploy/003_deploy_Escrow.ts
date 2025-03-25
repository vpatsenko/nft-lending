import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { getOwnerAddress } from './utils/owner-address';
import { NftfiHub } from '../typechain';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, network, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const nftfiHub = (await ethers.getContract('NftfiHub')) as NftfiHub;
  const contractKeys = await ethers.getContract('ContractKeys');

  await deploy('Escrow', {
    from: deployer,
    args: [getOwnerAddress(network.name.toLowerCase(), deployer), await nftfiHub.getAddress()],
    log: true,
    libraries: {
      ContractKeys: await contractKeys.getAddress(),
    },
  });
};

export default func;

func.tags = ['Escrow'];
