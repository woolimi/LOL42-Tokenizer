import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Lol42Module = buildModule("Lol42Module", (m) => {
  const lol42 = m.contract("Lol42");

  return { lol42 };
});

export default Lol42Module;
