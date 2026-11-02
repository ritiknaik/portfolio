import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Lenses from './components/Lenses';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import useTheme from './hooks/useTheme';
import useReveal from './hooks/useReveal';

export default function App() {
  const [theme, toggleTheme] = useTheme();
  useReveal();

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Ticker />
        <Skills />
        <Lenses />
        <Experience />
        <Education />
        <Projects />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
