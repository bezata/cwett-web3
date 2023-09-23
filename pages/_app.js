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

// Configure supported blockchain chains and providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [celoAlfajores], // Add supported blockchain chains (e.g., Celo Alfajores)
  [publicProvider()] // Use a public provider for web3 interactions
);

// Get default wallet connectors for various platforms
const { connectors } = getDefaultWallets({
  appName: "threads-web3", // Your application's name
  projectId: "0aa8be3bbcc6c748357e94516d2ea3c6", // Your project ID
  chains, // Supported chains from the previous configuration
});

// Create the configuration for the Wagmi library
const config = createConfig({
  autoConnect: true, // Automatically connect to available wallets
  publicClient,
  webSocketPublicClient,
  connectors, // Wallet connectors for different platforms
});

// Define the main application component
export default function App() {
  return (
    <WagmiConfig config={config}>
      {" "}
      {/* Configure Wagmi with the created config */}
      <RainbowKitProvider
        chains={chains} // Provide supported chains to RainbowKit
        theme={darkTheme({
          // Configure the theme with custom colors
          connectButtonBackground: "#9333EA", // Background color of the connect button
          accentColor: "#9333EA", // Accent color
        })}
      >
        <Layout /> {/* Render the main application layout */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
