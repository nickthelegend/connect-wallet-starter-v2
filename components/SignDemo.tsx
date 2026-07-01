'use client'

import { useState } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'
import algosdk from 'algosdk'
import { PenLine } from 'lucide-react'

/**
 * Minimal proof that the active wallet (including the Privy embedded wallet)
 * can sign an Algorand transaction. Builds a 0-Algo self-payment on TestNet and
 * signs it — no submit, so it works even for a freshly-created, unfunded wallet.
 */
export function SignDemo() {
  const { activeAddress, algodClient, signTransactions } = useWallet()
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  if (!activeAddress) return null

  const handleSign = async () => {
    setBusy(true)
    setStatus(null)
    try {
      const suggestedParams = await algodClient.getTransactionParams().do()
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        sender: activeAddress,
        receiver: activeAddress,
        amount: 0,
        suggestedParams,
        note: new TextEncoder().encode('Signed with a Privy embedded wallet on Algorand'),
      })

      const [signed] = await signTransactions([txn])
      if (!signed) throw new Error('Signing was cancelled or returned null')

      setStatus({ ok: true, text: `Signed ✓  txID ${txn.txID()}  (${signed.length} bytes)` })
    } catch (err) {
      setStatus({ ok: false, text: err instanceof Error ? err.message : String(err) })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 border border-zinc-800 bg-zinc-900/30 rounded-2xl backdrop-blur-sm text-left">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-bold text-white uppercase text-xs tracking-widest mb-1">Sign a transaction</h3>
          <p className="text-xs text-zinc-500 font-mono break-all">{activeAddress}</p>
        </div>
        <button
          onClick={handleSign}
          disabled={busy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <PenLine size={14} />
          {busy ? 'Signing…' : 'Sign test txn'}
        </button>
      </div>

      {status && (
        <p
          className={`mt-4 text-xs font-mono break-all ${status.ok ? 'text-teal-400' : 'text-red-400'}`}
        >
          {status.text}
        </p>
      )}
    </div>
  )
}
