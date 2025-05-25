import { createAppKit } from "@reown/appkit/react";

import { defineChain } from 'viem'
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 0. Setup queryClient
const queryClient = new QueryClient();

if (!import.meta.env.VITE_REOWN_PROJECT_ID) {
  throw new Error("VITE_REOWN_PROJECT_ID is not set");
}

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

// 2. Create a metadata object - optional
const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: window.location.origin, // This will automatically match the current domain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};


export const privadoChain = defineChain({
  id: 74074,
  name: 'privadoChain',
  nativeCurrency: { name: 'Privado', symbol: 'PCH', decimals: 18 },
  rpcUrls: {
    default: { https: ['https://testnet-privachain-z3e7a.avax-test.network/ext/bc/QNer9eHSFbFv4p2VtXDUAvfzuNBA6EnQUd4dE8wkCtnsDaDDm/rpc?token=6a28c74172b505c79711f34280b1e87abf7c2b806b0eec239e4804029176c80f'] },
  },
  blockExplorers: {
    default: { name: 'Privado Chain Explorer', url: 'https://subnets-test.avax.network/privachain' },
  },
  contracts: {
  },
})


// 3. Set the networks
const networks = [privadoChain];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [privadoChain],
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}