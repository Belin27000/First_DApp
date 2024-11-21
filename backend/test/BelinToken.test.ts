import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect, assert } from "chai";
import hre from "hardhat";

describe("BelinToken Test", function () {

  async function deployFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const BelinToken = await hre.ethers.getContractFactory("BelinToken");
    const belinToken = await BelinToken.deploy();

    return { belinToken, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy the contract and get the right price for 1 ETH", async function () {
      const { belinToken, owner, otherAccount } = await loadFixture(deployFixture);
      const ethPriceFromChainlink = await belinToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainlink, 8);
      console.log(ethInDollars);
      assert(parseInt(ethInDollars) >= 3000 && parseInt(ethInDollars) <= 3500);
    });
  });
  describe("Mint", function () {
    it("Should not mint if not enought funds are note provided", async function () {
      const { belinToken, owner, otherAccount } = await loadFixture(deployFixture);
      const ethPriceFromChainlink = await belinToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainlink, 8);
      const amountMint = 18;
      const amountETHFor18Token = (10 * amountMint) / parseInt(ethInDollars);
      const priceFor18Token = hre.ethers.parseEther(amountETHFor18Token.toString());
      console.log(priceFor18Token);

      await expect(belinToken.mint(owner.address, 20, { value: priceFor18Token })).to.be.revertedWith("not enought funds provided")


    })
    it("Should mint if enought funds are provided", async function () {
      const { belinToken, owner, otherAccount } = await loadFixture(deployFixture);
      const ethPriceFromChainlink = await belinToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainlink, 8);
      const amountMint = 20;
      const amountETHFor20Token = (15 * amountMint) / parseInt(ethInDollars);
      const priceFor20Token = hre.ethers.parseEther(amountETHFor20Token.toString());

      await belinToken.mint(owner.address, 20, { value: priceFor20Token });
      const balanceOfOwner = await belinToken.balanceOf(owner.address);

      assert(Number(balanceOfOwner) === 20);

    })
  })

});
