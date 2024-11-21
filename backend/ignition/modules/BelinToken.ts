// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const BelinModule = buildModule("BelinModule", (m) => {


  const BEL1 = m.contract("BelinToken");

  return { BEL1 };
});

export default BelinModule;