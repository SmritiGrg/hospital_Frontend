import { Nav } from "./components/Nav";
import {
  StageHero,
  StageFrame,
  StageIris,
  StageNight,
} from "./components/home";
import {
  Explainer,
  Specialities,
  Doctors,
  Rates,
  Journey,
  Faq,
  SiteFooter,
} from "./components/Bands";

function App() {
  return (
    <div id="top" className="relative bg-navy">
      <div className="grain-plate" aria-hidden="true" />

      <Nav />

      <main>
        <StageHero />
        <StageFrame />
        <StageIris />
        <StageNight />
        <Explainer />
        <Specialities />
        <Doctors />
        <Rates />
        <Journey />
        <Faq />
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
