import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Lookbook from "./components/Lookbook";
import Collections from "./components/Collections";
import Story from "./components/Story";
import Visit from "./components/Visit";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Lookbook />
        <Collections />
        <Story />
        <Visit />
      </main>
    </>
  );
}
