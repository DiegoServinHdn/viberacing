import { promises as fs } from "node:fs";
import path from "node:path";
import { Mppx, tempo } from "mppx/nextjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// pathUSD (USDC on Tempo TIP-20) — same address on testnet & mainnet
const PATH_USD = "0x20c0000000000000000000000000000000000000";

type Handler = (request: Request) => Promise<Response> | Response;
let cachedHandler: Handler | null = null;

function buildHandler(): Handler {
  const recipient = process.env.MPP_RECIPIENT_ADDRESS as
    | `0x${string}`
    | undefined;
  const secretKey = process.env.MPP_SECRET_KEY;
  const testnet = process.env.MPP_TESTNET !== "false";

  if (!recipient || !secretKey) {
    return () =>
      new Response(
        "Server misconfigured: set MPP_RECIPIENT_ADDRESS and MPP_SECRET_KEY env vars.\n",
        { status: 500, headers: { "content-type": "text/plain" } }
      );
  }

  const mppx = Mppx.create({
    secretKey,
    methods: [
      tempo.charge({
        currency: PATH_USD,
        recipient,
        testnet,
        html: true, // browsers visiting the URL get a payment page
      }),
    ],
  });

  return mppx.charge({
    amount: "1",
    description:
      "Profit Recipe MX-CABALLERO-001: wholesale-to-retail arbitrage playbook for men's accessories in Mexico. ROI 180-230% in 6-10 weeks. Returns ~3,500-word markdown.",
  })(async () => {
    const recipePath = path.join(process.cwd(), "recipe.md");
    const recipe = await fs.readFile(recipePath, "utf8");
    return new Response(recipe, {
      status: 200,
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        "content-disposition":
          'inline; filename="profit-recipe-MX-CABALLERO-001.md"',
        "cache-control": "private, no-store",
      },
    });
  });
}

function getHandler(): Handler {
  if (!cachedHandler) cachedHandler = buildHandler();
  return cachedHandler;
}

export const GET = (req: Request) => getHandler()(req);
export const POST = (req: Request) => getHandler()(req);
