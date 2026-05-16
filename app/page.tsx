import { headers } from "next/headers";

const RECIPE_PRICE_USD = "1.00";
const TEMPO_CURRENCY = "USDC.e on Tempo (TIP-20)";

async function getBaseUrl() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host =
    h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

export default async function Home() {
  const baseUrl = await getBaseUrl();
  const buyUrl = `${baseUrl}/api/buy`;

  return (
    <main className="flex flex-col items-center px-6 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse" />
          Profit Recipe · Mercado Mexicano · Pagable con MPP
        </div>

        {/* Hero */}
        <h1 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05] text-zinc-50">
          Arbitraje B2B → B2C dentro del mismo marketplace.
          <span className="text-lime-400"> 180–230% ROI</span> en 6–10 semanas.
        </h1>
        <p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-2xl">
          Compras un pack mayorista de un accesorio de caballero en un retailer
          mexicano. Lo atomizas en listings de menudeo y lo vendes en tres
          canales que ya están corriendo. Receta lista para ejecutar — incluye
          URL del producto, scripts de copy, fotos sugeridas y playbook
          semanal.
        </p>

        {/* Metrics grid */}
        <section className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900 rounded-2xl overflow-hidden">
          <Metric label="Inversión" value="$330 USD" sub="≈ $6,598 MXN" />
          <Metric
            label="Ganancia neta"
            value="$925–$1,100"
            sub="USD por ciclo"
            highlight
          />
          <Metric label="ROI" value="180–230%" sub="sobre inversión" />
          <Metric label="Tiempo" value="6–10 sem" sub="a sell-through 100%" />
          <Metric label="Margen / unidad" value="~$185 MXN" sub="≈ $9 USD neto" />
          <Metric label="Dificultad" value="Baja–Media" sub="ejecutable solo" />
        </section>

        {/* Category */}
        <section className="mt-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Industria
          </h2>
          <p className="mt-3 text-xl text-zinc-200">
            Accesorios de moda para caballero — segmento gifting masivo, ticket
            $200–$400 MXN, sin sensibilidad de marca premium.
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Demanda perenne (Día del Padre, Navidad, Buen Fin, regreso a
            oficina, cumpleaños). Sin estacionalidad negativa fuerte. Producto
            ligero, no perecedero, sin caducidad — riesgo de inventario muerto
            mínimo.
          </p>
        </section>

        {/* What you get */}
        <section className="mt-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Lo que recibes (markdown completo, ~3,500 palabras)
          </h2>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {[
              "Producto exacto + URL directa al vendedor mayorista (reputación verde, +5k ventas)",
              "Backup: 2 proveedores alternativos con contacto",
              "Tres canales de reventa con % de mix recomendado",
              "Copy ganador de listings (título + descripción) probado",
              "Setup de fotos: 6 ángulos por modelo, instrucciones de fondo y luz",
              "Playbook semana 0 → semana 11 con horas estimadas",
              "Estrategia B2B corporativo: scripts LinkedIn + cotización",
              "9 riesgos con su mitigación específica",
              "5 métricas para monitorear con objetivo numérico",
              "Variante avanzada para escalar a 3 packs (300 unidades, $50k+ MXN brutos)",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-zinc-300"
              >
                <span className="mt-1.5 inline-block h-1 w-3 rounded-full bg-lime-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Why this works */}
        <section className="mt-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Por qué existe la oportunidad
          </h2>
          <div className="mt-4 space-y-4 text-sm text-zinc-300 leading-relaxed">
            <p>
              <span className="text-lime-400 font-semibold">
                1. Asimetría B2B / B2C dentro del mismo marketplace.
              </span>{" "}
              Las dos búsquedas que separan el costo mayorista del precio
              menudeo coexisten en el mismo sitio pero nunca se cruzan en
              resultados. Tu margen vive en esa fricción de descubrimiento.
            </p>
            <p>
              <span className="text-lime-400 font-semibold">
                2. Los wholesalers no atomizan.
              </span>{" "}
              Su operación está optimizada para mover volumen. Fotos
              profesionales, atención uno-a-uno y gestión de devoluciones les
              destruyen el margen — te dejan ese pedazo del valor.
            </p>
            <p>
              <span className="text-lime-400 font-semibold">
                3. Sin sensibilidad de marca premium.
              </span>{" "}
              El comprador menudeo busca <em>“se ve bien por menos de $400”</em>,
              no busca marca top. El producto pasa visualmente sin nombre
              fuerte.
            </p>
            <p>
              <span className="text-lime-400 font-semibold">
                4. Inventario rescatable.
              </span>{" "}
              Si te queda stock, lo rematas en Facebook Marketplace a $199
              cash. No caduca, no pasa de moda. Peor caso = liquidar inversión
              sin ganancia.
            </p>
          </div>
        </section>

        {/* Payment — for agents */}
        <section className="mt-16 border border-lime-400/30 rounded-2xl bg-lime-400/5 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-lime-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-400" />
            Comprar con un agente · MPP / HTTP 402
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-zinc-50">
            Pago directo, una sola llamada HTTP.
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-xl">
            Este endpoint está protegido por{" "}
            <a
              href="https://mpp.dev"
              className="text-lime-400 underline-offset-4 hover:underline"
            >
              Machine Payments Protocol
            </a>
            . Tu agente paga{" "}
            <span className="font-mono text-zinc-200">${RECIPE_PRICE_USD}</span>{" "}
            en {TEMPO_CURRENCY} en el mismo request y recibe la receta completa
            en{" "}
            <span className="font-mono text-zinc-200">text/markdown</span>.
          </p>

          {/* Endpoint */}
          <div className="mt-6">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              Endpoint
            </div>
            <pre className="overflow-x-auto rounded-lg bg-black border border-zinc-800 px-4 py-3 text-sm font-mono text-zinc-200">
              <span className="text-lime-400">GET</span> {buyUrl}
            </pre>
          </div>

          {/* CLI command */}
          <div className="mt-6">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              Disparar la compra (CLI)
            </div>
            <pre className="overflow-x-auto rounded-lg bg-black border border-zinc-800 px-4 py-3 text-sm font-mono text-zinc-200">
              <span className="text-zinc-500">$ </span>npx mppx {buyUrl}
            </pre>
            <p className="mt-2 text-xs text-zinc-500">
              Primero corre{" "}
              <code className="text-zinc-300">npx mppx account create</code>{" "}
              para generar una cuenta autofundeada en testnet Tempo.
            </p>
          </div>

          {/* Agent code */}
          <div className="mt-6">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              Desde un agente (TypeScript)
            </div>
            <pre className="overflow-x-auto rounded-lg bg-black border border-zinc-800 px-4 py-3 text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed">
              {`import { privateKeyToAccount } from 'viem/accounts'
import { Mppx, tempo } from 'mppx/client'

Mppx.create({
  methods: [tempo({ account: privateKeyToAccount('0x...') })],
})

const res = await fetch('${buyUrl}')
const recipe = await res.text() // markdown`}
            </pre>
          </div>

          {/* Curl */}
          <div className="mt-6">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              Inspeccionar el challenge 402 sin pagar
            </div>
            <pre className="overflow-x-auto rounded-lg bg-black border border-zinc-800 px-4 py-3 text-sm font-mono text-zinc-200">
              <span className="text-zinc-500">$ </span>curl -i {buyUrl}
            </pre>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-900 text-xs font-mono text-zinc-600 flex flex-col sm:flex-row sm:justify-between gap-2">
          <span>Recipe ID: MX-CABALLERO-001 · Pago: $1 USDC.e Tempo</span>
          <span>
            Powered by{" "}
            <a
              href="https://mpp.dev"
              className="text-zinc-400 hover:text-lime-400"
            >
              mpp.dev
            </a>
          </span>
        </footer>
      </div>
    </main>
  );
}

function Metric({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-black p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
        {label}
      </div>
      <div
        className={`mt-2 text-2xl font-semibold tracking-tight ${
          highlight ? "text-lime-400" : "text-zinc-50"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-zinc-500">{sub}</div>
    </div>
  );
}
