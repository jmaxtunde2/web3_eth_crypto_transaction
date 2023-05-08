async function main() {
  const Transaction = await ethers.getContractFactory("Transaction");
  const transaction = await Transaction.deploy();
  console.log("Contract Deployed to Address:", transaction.address);
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });