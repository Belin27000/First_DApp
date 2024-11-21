'use client'
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { contractAddress, contractAbi } from "@/constants";

import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, type BaseError } from "wagmi";
import { parseEther } from "viem";


export default function Home() {
  const { isConnected, address } = useAccount();
  const [ethPriceInUSD, setEthPriceInUSD] = useState<number | null>(null);

  const { data: ethPrice } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getChainlinkDataFeedLatestAnswer'
  })

  useEffect(() => {
    if (ethPrice) {
      const ethPriceInUSD = Number(ethPrice) / (10 ** 8);
      setEthPriceInUSD(ethPriceInUSD)
    }
  }, [ethPrice])
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <div className="p-5 grow flex flex-col items-center justify-center">
        ok
      </div>
      <Footer />
    </div>
  );
}
