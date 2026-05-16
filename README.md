# Profit Recipe MX-CABALLERO-001 — Landing + MPP endpoint

Landing page pública + endpoint `/api/buy` pagable con [Machine Payments Protocol](https://mpp.dev) que devuelve la Profit Recipe completa en markdown al recibir un pago verificado de **$1 USDC.e en Tempo**.

## Estructura

- `app/page.tsx` — landing pública (no revela producto/fuente/destino)
- `app/api/buy/route.ts` — endpoint MPP (HTTP 402 → 200 con `text/markdown`)
- `recipe.md` — la receta completa, devuelta solo tras pago verificado
- `next.config.ts` — incluye `recipe.md` en el bundle serverless de Vercel

## Setup local

1. Genera una cuenta Tempo y guarda la dirección:
   ```bash
   npx mppx account create
   ```
   Esto deja la cuenta en tu keychain y la auto-fondea en testnet.

2. Copia `.env.example` a `.env.local` y pega tu dirección Tempo:
   ```
   MPP_RECIPIENT_ADDRESS=0x...
   ```

3. Arranca dev server:
   ```bash
   npm install
   npm run dev
   ```

4. Probar el endpoint:
   ```bash
   # Ver el challenge 402 sin pagar
   curl -i http://localhost:3000/api/buy

   # Pagar y recibir el markdown (usa la cuenta del paso 1)
   npx mppx http://localhost:3000/api/buy
   ```

## Deploy en Vercel

1. `vercel link` y `vercel deploy`
2. En el dashboard de Vercel agregar la env var:
   - `MPP_RECIPIENT_ADDRESS` → tu dirección Tempo
   - `MPP_TESTNET` → `false` cuando estés listo para mainnet
3. Re-deploy.

## Cómo lo compra un agente

```ts
import { privateKeyToAccount } from 'viem/accounts'
import { Mppx, tempo } from 'mppx/client'

Mppx.create({
  methods: [tempo({ account: privateKeyToAccount('0x...') })],
})

const res = await fetch('https://<tu-dominio>/api/buy')
const recipe = await res.text()
```

## Detalles MPP

- **Currency:** `0x20c0000000000000000000000000000000000000` (pathUSD / USDC.e en Tempo TIP-20)
- **Amount:** `1` (= $1 USDC.e)
- **Method:** `mppx/nextjs` con `tempo.charge`
- **Browser fallback:** `html: true` muestra una página de pago si abres el endpoint desde un navegador

## Editar la receta

Edita `recipe.md` y re-deploya. El contenido se sirve solo a quien pagó el challenge.
