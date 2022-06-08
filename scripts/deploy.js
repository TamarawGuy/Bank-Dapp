const { ethers } = require("hardhat");

async function main() {
  const [signer1, signer2] = await ethers.getSigners();

  const Bank = await ethers.getContractFactory("Bank", signer1);
  const bank = await Bank.deploy();
  const Avax = await ethers.getContractFactory("Avax", signer2);
  const avax = await Avax.deploy();
  const Dogecoin = await ethers.getContractFactory("Dogecoin", signer2);
  const doge = await Dogecoin.deploy();
  const ShibaInu = await ethers.getContractFactory("ShibaInu", signer2);
  const shib = await ShibaInu.deploy();
  await avax.deployed();
  await bank.deployed();
  await doge.deployed();
  await shib.deployed();

  await bank.whitelistToken(
    ethers.utils.formatBytes32String("Avax"),
    avax.address
  );

  await bank.whitelistToken(
    ethers.utils.formatBytes32String("Dogecoin"),
    doge.address
  );

  await bank.whitelistToken(
    ethers.utils.formatBytes32String("ShibaInu"),
    shib.address
  );

  await bank.whitelistToken(
    ethers.utils.formatBytes32String("Eth"),
    "0x63D841Bc7814c3C8fB52b0D11A5E81D9DA17d27E"
  );

  console.log("Bank deployed to:", bank.address, "by", signer1.address);
  console.log("Avax deployed to:", avax.address, "by", signer2.address);
  console.log("Dogecoin deployed to:", doge.address, "by", signer2.address);
  console.log("ShibaInu deployed to:", shib.address, "by", signer2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
