import { AgeGate } from "@/components/age-gate";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { Experiencia } from "@/components/sections/experiencia";
import { Vinhos } from "@/components/sections/vinhos";
import { B2B } from "@/components/sections/b2b";
import { Reservas } from "@/components/sections/reservas";
import { Eventos } from "@/components/sections/eventos";
import { Contactos } from "@/components/sections/contactos";

export default function HomePage() {
  return (
    <>
      <AgeGate />
      <Navbar />
      <main>
        <Hero />
        <Experiencia />
        <Vinhos />
        <B2B />
        <Reservas />
        <Eventos />
        <Contactos />
      </main>
      <Footer />
    </>
  );
}
