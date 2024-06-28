import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Lol42", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployLol42() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Lol42 = await hre.ethers.getContractFactory("Lol42");
    const lol42 = await Lol42.deploy();

    return { lol42, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should be able to mint", async function () {
      const { lol42 } = await loadFixture(deployLol42);

      await lol42.mint("https://ipfs.io/ipfs/QmeLngvcTzYUj65n9TC42Z6Bjy4cbpKRm52wyz9hbbzCDg");
      await expect(await lol42.tokenId()).to.equal(1);
    });

    it("Only owner can mint", async function () {
      const { lol42, otherAccount } = await loadFixture(deployLol42);

      await expect(
        lol42.connect(otherAccount).mint("https://ipfs.io/ipfs/QmeLngvcTzYUj65n9TC42Z6Bjy4cbpKRm52wyz9hbbzCDg"),
      ).to.be.revertedWithCustomError(lol42, "OwnableUnauthorizedAccount");
    });
  });
});
