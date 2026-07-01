This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Wallets

Built on [`@txnlab/use-wallet`](https://github.com/TxnLab/use-wallet). Supported connectors: **Pera**, **Defly**, **Lute**, and **Privy** (embedded/custodial).

### Privy embedded wallet for Algorand

Privy provisions an **embedded Solana wallet**, which is an ed25519 keypair — and Algorand accounts are *also* ed25519 keypairs. That lets us onboard users with just an email or social login (no seed phrase, no extension) and use that same key on Algorand:

- **Address** — the embedded wallet's base58 public key is re-encoded as an Algorand address (`algosdk.encodeAddress`).
- **Signing** — Algorand transactions are signed by asking Privy for a raw ed25519 signature over `txn.bytesToSign()` (the `"TX"`-prefixed msgpack bytes), which is exactly Algorand's signing scheme.

How it's wired:

| File | Role |
| --- | --- |
| [`lib/privyWallet.ts`](lib/privyWallet.ts) | A `use-wallet` `CustomProvider` (`connect` / `disconnect` / `resumeSession` / `signTransactions`). |
| [`components/PrivyBridge.tsx`](components/PrivyBridge.tsx) | Feeds Privy's React hooks (login, wallet, `signMessage`) into the provider, which lives outside React. |
| [`components/Providers.tsx`](components/Providers.tsx) | Wraps the app in `<PrivyProvider>` and registers the custom wallet with `WalletId.CUSTOM`. |
| [`components/SignDemo.tsx`](components/SignDemo.tsx) | Signs a 0-Algo TestNet self-payment to prove the wallet works. |

### Setup

1. Create a free app at [dashboard.privy.io](https://dashboard.privy.io), enable **Solana** and turn on **embedded Solana wallets**.
2. Copy `.env.local.example` to `.env.local` and set your 25-character `NEXT_PUBLIC_PRIVY_APP_ID`.

```bash
cp .env.local.example .env.local
# then edit NEXT_PUBLIC_PRIVY_APP_ID
```

> Note: the network defaults to **TestNet** (`components/Providers.tsx`). A freshly created embedded wallet is unfunded, so the demo *signs* (not submits) a transaction. Fund the address from a TestNet dispenser to submit real transactions.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
