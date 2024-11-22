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

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  useEffect(() => {
    console.log(ethPrice);
    if (ethPrice) {
      const ethPriceInUSD = Number(ethPrice) / 10 ** 8;
      console.log(ethPrice);

      console.log("ETH Price raw data", ethPriceInUSD);
      setEthPriceInUSD(ethPriceInUSD)
    }
  }, [ethPrice])

  const mint = async (amountInUSD: number) => {
    let price;
    try {
      if (ethPriceInUSD) {
        price = (amountInUSD + 0.01 * (amountInUSD)) / ethPriceInUSD;
        price = parseEther(price.toString());
      }
      writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'mint',
        args: [address, amountInUSD / 10],
        value: price
      })
    }
    catch (error) {
      console.log(error);
    }
  }
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const renderMintOption = (amountInUSD: number) => (
    <div className="flex flex-col, items-center m-1 p-4 bg-gray-800 rounded-lg shadow-2xl transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold mb-4 text-white text-center">
        ${amountInUSD} <span className="text-sm text-gray-400">
          (~{ethPriceInUSD && (amountInUSD / ethPriceInUSD).toFixed(4)} ETH)
        </span>
      </h2>
      <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold ml-3 py-3 px-6 rounded-full hover:from-blue-600 hover:to-purple-600 transition duration-300" onClick={() => mint(amountInUSD)}>Mint for ${amountInUSD}</Button>
    </div>
  )
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <div className="p-5 grow flex flex-col items-center justify-center">
        {isConnected ? (
          <>
            <h1>Mint your own Belin Tokens</h1>
            <p className="text-lg mb-12 text-gray-400">Choose the amount you want to mint</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {renderMintOption(100)}
              {renderMintOption(200)}
              {renderMintOption(500)}
              {renderMintOption(1000)}
            </div>
            <div className="mt-8 w-full max-w-3xl">
              {hash && <Alert className="bg-blue-600 text-white mt-2">
                <AlertTitle>Transaction Hash</AlertTitle>
                <AlertDescription>
                  {hash}
                </AlertDescription>
              </Alert>}
              {isConfirming && <Alert className="bg-yellow-600 text-white mt-2">
                <AlertTitle>A moment ...</AlertTitle>
                <AlertDescription>
                  Waiting for confirmation
                </AlertDescription>
              </Alert>}
              {isConfirmed && <Alert className="bg-green-500 text-white mt-2">
                <AlertTitle>Congratulation !</AlertTitle>
                <AlertDescription>
                  Transacxtion confirmed
                </AlertDescription>
              </Alert>}
              {error && <Alert className="bg-red-500 text-white mt-2">
                <AlertTitle>Error !</AlertTitle>
                <AlertDescription>
                  {(error as BaseError).shortMessage || error.message}
                </AlertDescription>
              </Alert>}
            </div>
          </>
        ) : (
          <div className="text-center text-2xl text-white"> Please connect your wallet to mint</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
