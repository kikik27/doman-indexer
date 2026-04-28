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
      address: "0x574F67B22B49eFd39D03F51627fA79CEB4a2449C",
      startBlock: 40799652,
    },
  },
});
