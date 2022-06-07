const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Bank, Avax, Dogecoin, ShibaInu", function () {
  let owner, addr1;
  let bank, avax, doge, shib;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank", owner);
    bank = await Bank.deploy();
    const Avax = await ethers.getContractFactory("Avax", addr1);
    avax = await Avax.deploy();
    const Dogecoin = await ethers.getContractFactory("Dogecoin", addr1);
    doge = await Dogecoin.deploy();
    const ShibaInu = await ethers.getContractFactory("ShibaInu", addr1);
    shib = await ShibaInu.deploy();

    await owner.sendTransaction({
      to: bank.address,
      value: ethers.utils.parseEther("10", "ether"),
    });

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
      "0xa3Fd1c1AEa94eab4212A096482d42a9EF9A52BE0"
    );
  });

  it("test getWhitelistedSymbols function", async () => {
    let symbols = await bank.getWhitelistedSymbols();
    expect(symbols.length).to.equal(4);
    expect(ethers.utils.parseBytes32String(symbols[0])).to.equal("Avax");
    expect(ethers.utils.parseBytes32String(symbols[1])).to.equal("Dogecoin");
    expect(ethers.utils.parseBytes32String(symbols[2])).to.equal("ShibaInu");
    expect(ethers.utils.parseBytes32String(symbols[3])).to.equal("Eth");
  });

  it("test getWhitelistedTokenAddress function", async () => {
    let result = await bank.getWhitelistedTokenAddress(
      ethers.utils.formatBytes32String("Avax")
    );
    expect(result).to.equal(avax.address);
  });

  it("should NOT whitelist token if not owner", async () => {
    await expect(
      bank.connect(addr1).whitelistToken(
        ethers.utils.formatBytes32String("Token"),
        "0x43ba24Eb5b8eA938bd051238dfaD0e7E28Fd327a" // Random Vanity Address - Second
      )
    ).to.be.revertedWith("Only owner can whitelist token");
  });

  it("should whitelist token if owner", async () => {
    await bank.whitelistToken(
      ethers.utils.formatBytes32String("Tether"),
      "0x43ba24Eb5b8eA938bd051238dfaD0e7E28Fd327a"
    );
    let symbols = await bank.getWhitelistedSymbols();
    expect(symbols.length).to.equal(5);
    expect(ethers.utils.parseBytes32String(symbols[0])).to.equal("Avax");
    expect(ethers.utils.parseBytes32String(symbols[1])).to.equal("Dogecoin");
    expect(ethers.utils.parseBytes32String(symbols[2])).to.equal("ShibaInu");
    expect(ethers.utils.parseBytes32String(symbols[3])).to.equal("Eth");
    expect(ethers.utils.parseBytes32String(symbols[4])).to.equal("Tether");
  });

  it("test withdraw function", async () => {
    const balanceBefore = await bank.getTokenBalance(
      ethers.utils.formatBytes32String("Eth")
    );
    expect(balanceBefore).to.equal(ethers.utils.parseEther("10", "ether"));
    await bank.withdrawEther(ethers.utils.parseEther("1", "ether"));

    const balanceAfter = await bank.getTokenBalance(
      ethers.utils.formatBytes32String("Eth")
    );

    expect(balanceAfter).to.equal(ethers.utils.parseEther("9", "ether"));
  });

  it("should NOT withdraw if requested amount is bigger than balance", async () => {
    await expect(
      bank.connect(addr1).withdrawEther(ethers.utils.parseEther("11", "ether"))
    ).to.be.reverted;
  });

  it.only("should return token balance", async () => {
    const avaxBalance = await bank.getTokenBalance(
      ethers.utils.formatBytes32String("Avax")
    );
    const ethBalance = await bank.getTokenBalance(
      ethers.utils.formatBytes32String("Eth")
    );
    expect(avaxBalance).to.equal(0);
    expect(ethBalance).to.equal(ethers.utils.parseEther("10", "ether"));
  });
});
