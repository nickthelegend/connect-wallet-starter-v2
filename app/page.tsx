'use client'

import { WalletButton } from '@txnlab/use-wallet-ui-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-950 text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-4xl font-bold tracking-tighter">
          Algorand Wallet Starter V2
        </h1>
        
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col items-center gap-6">
          <p className="text-zinc-400 text-center max-w-xs leading-relaxed">
            Click the button below to connect your Algorand wallet using Pera, Defly, or Lute.
          </p>
          
          <WalletButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-12 text-center">
          <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
            <h3 className="font-bold text-teal-500 mb-2 uppercase text-[10px] tracking-widest">Wallets</h3>
            <p className="text-xs text-zinc-500">Pera, Defly, Lute</p>
          </div>
          <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
            <h3 className="font-bold text-teal-500 mb-2 uppercase text-[10px] tracking-widest">Network</h3>
            <p className="text-xs text-zinc-500">Testnet (Default)</p>
          </div>
          <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
            <h3 className="font-bold text-teal-500 mb-2 uppercase text-[10px] tracking-widest">Built With</h3>
            <p className="text-xs text-zinc-500">@txnlab/use-wallet</p>
          </div>
        </div>
      </div>
    </main>
  )
}
