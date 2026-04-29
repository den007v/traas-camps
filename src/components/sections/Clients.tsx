import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

type Client = {
  id: string;
  name: string;
  logoSrc: string;
  caseLabel?: string;
  caseYear?: number;
  caseHref?: string;
};

const clients: Client[] = [
  {
    id: "element",
    name: "Элемент",
    logoSrc: "/logos/element.png",
    caseLabel: "Корпоративная программа",
    caseYear: 2024,
  },
  {
    id: "partner-1",
    name: "Клиент TraaS",
    logoSrc: "/logos/partner-1.png",
  },
  {
    id: "natura-siberica",
    name: "Natura Siberica",
    logoSrc: "/logos/natura-siberica.png",
  },
  {
    id: "cdek",
    name: "СДЭК",
    logoSrc: "/logos/cdek.png",
    caseLabel: "Tech Bootcamp alumni",
    caseYear: 2024,
  },
  {
    id: "partner-2",
    name: "Клиент TraaS",
    logoSrc: "/logos/partner-2-clean.png",
  },
  {
    id: "partner-3",
    name: "Клиент TraaS",
    logoSrc: "/logos/partner-3.png",
  },
  {
    id: "etalon",
    name: "Эталон",
    logoSrc: "/logos/etalon-clean.png",
  },
  {
    id: "aqua-holding",
    name: "Aqua Holding",
    logoSrc: "/logos/aqua-holding-clean.png",
  },
  {
    id: "binno",
    name: "Binno",
    logoSrc: "/logos/binno.png",
  },
  {
    id: "segezha",
    name: "Segezha Group",
    logoSrc: "/logos/segezha.png",
    caseLabel: "Инструменты управления",
    caseYear: 2024,
    caseHref: "/cases/segezha-project-office",
  },
];

function ClientLogo({ client }: { client: Client }) {
  return (
    <>
      <span className="flex h-[46px] w-[88%] max-w-[168px] items-center justify-center md:h-[56px] md:max-w-[192px] lg:h-[68px] lg:max-w-[220px]">
        <Image
          src={client.logoSrc}
          alt={client.name}
          width={240}
          height={96}
          sizes="(max-width: 767px) 42vw, (max-width: 1023px) 20vw, 220px"
          className="max-h-full w-auto max-w-full object-contain opacity-80 brightness-0 invert transition duration-300 group-hover:-translate-y-1.5 group-hover:opacity-100 motion-reduce:group-hover:translate-y-0"
        />
      </span>
      {client.caseLabel ? (
        <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] tracking-[0.02em] text-white/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {client.caseLabel}
          {client.caseYear ? ` · ${client.caseYear}` : ""}
        </span>
      ) : null}
    </>
  );
}

function ClientCell({ client }: { client: Client }) {
  const className =
    "group relative flex min-h-[112px] cursor-pointer items-center justify-center border-b border-r border-white/[0.07] px-4 py-6 text-center transition duration-300 hover:bg-[rgba(193,49,71,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white/50 md:min-h-[130px] lg:min-h-[160px]";

  if (client.caseHref) {
    return (
      <Link href={client.caseHref} className={className} aria-label={`${client.name} — кейс`}>
        <ClientLogo client={client} />
      </Link>
    );
  }

  return (
    <div className={className}>
      <ClientLogo client={client} />
    </div>
  );
}

export function Clients() {
  return (
    <section
      aria-labelledby="clients-heading"
      className="relative overflow-hidden border-b border-[var(--divider)] bg-[var(--surface-soft)] py-10 sm:py-12 lg:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_10%_0%,rgba(227,6,19,0.14),transparent_32%),radial-gradient(circle_at_92%_20%,rgba(159,123,36,0.09),transparent_30%)]"
      />
      <Container className="relative">
        <div className="mx-auto mb-7 max-w-3xl text-center lg:mb-8">
          <h2
            id="clients-heading"
            className="text-balance text-[32px] font-medium leading-[1.15] tracking-[-0.01em] text-white/95 sm:text-4xl lg:text-[44px]"
          >
            Работаем с лидерами рынка
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-xl border-l border-t border-white/[0.07] md:grid-cols-5">
          {clients.map((client) => (
            <ClientCell key={client.id} client={client} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/cases"
            className="text-sm font-medium text-white/70 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50"
          >
            Все кейсы →
          </Link>
        </div>
      </Container>
    </section>
  );
}
