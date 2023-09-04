import '@/styles/globals.css'
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { celoAlfajores } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import Layout from "./layout";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [celoAlfajores],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "threads-web3",
  projectId: "0aa8be3bbcc6c748357e94516d2ea3c6",
  chains,
});
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          connectButtonBackground: "#2B3BAE",
        })}
      >
        <Layout />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
