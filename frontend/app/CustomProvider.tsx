'use client'
import '@rainbow-me/rainbowkit/styles.css';
import {
    darkTheme,
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    hardhat
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: '234f4c20941bde1db06bf4ddbe769e46',
    chains: [hardhat],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();
const CustomProvider = ({ children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme({ ...darkTheme.accentColors.blue })}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider >
    );
};

export default CustomProvider;