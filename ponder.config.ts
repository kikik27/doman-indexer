import { createConfig } from "ponder";
import { baseSepolia } from "viem/chains";

import { ScamReportAbi } from "./abis/ScamReportAbi";

export default createConfig({
  chains: {
    baseSepolia: {
      id: 84532,
      rpc: "https://sepolia.base.org",
    },
  },
  contracts: {
    ScamReporter: {
      chain: "baseSepolia",
      abi: ScamReportAbi,
      address: "0x65534f1A1BbCa98AD756c7CE38D7097fBA7C237a",
      startBlock: 40726553,
    },
  },
});
