'use client'

import { NetworkId, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import { WalletUIProvider } from '@txnlab/use-wallet-ui-react'
import { PrivyProvider } from '@privy-io/react-auth'
import '@txnlab/use-wallet-ui-react/dist/style.css'
import { privyWalletProvider } from '@/lib/privyWallet'
import { PrivyBridge } from '@/components/PrivyBridge'

const PRIVY_ICON =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzY5NjdmZiI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iOS41IiByPSIzLjIiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNi41IDE4YzAtMyAyLjUtNC44IDUuNS00LjhTMTcuNSAxNSAxNy41IDE4eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=='

const walletManager = new WalletManager({
  wallets: [
    WalletId.PERA,
    WalletId.DEFLY,
    WalletId.LUTE,
    {
      id: WalletId.CUSTOM,
      options: { provider: privyWalletProvider },
      metadata: { name: 'Privy', icon: PRIVY_ICON },
    },
  ],
  defaultNetwork: NetworkId.TESTNET,
})

const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

export function Providers({ children }: { children: React.ReactNode }) {
  if (!privyAppId) {
    // Fail loudly in dev rather than rendering a broken Privy provider.
    throw new Error(
      'Missing NEXT_PUBLIC_PRIVY_APP_ID. Add it to .env.local (get one at https://dashboard.privy.io).',
    )
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        // Login options shown in the Privy modal, in display order. Note: in
        // Privy's API, X is 'twitter'. Each OAuth provider must also be enabled
        // in the Privy dashboard (Login methods) or it errors on click.
        loginMethodsAndOrder: {
          primary: ['email', 'google', 'twitter', 'github'],
        },
        // Auto-provision an embedded Solana (ed25519) wallet on login — this is
        // the keypair we re-encode into an Algorand address and sign txns with.
        embeddedWallets: {
          solana: { createOnLogin: 'users-without-wallets' },
        },
        appearance: {
          walletChainType: 'solana-only',
        },
      }}
    >
      <WalletProvider manager={walletManager}>
        <WalletUIProvider>
          <PrivyBridge />
          {children}
        </WalletUIProvider>
      </WalletProvider>
    </PrivyProvider>
  )
}
