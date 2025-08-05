import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Hero from './components/Sections/Hero/Hero';
import About from './components/Sections/About/About';
import Skills from './components/Sections/Skills/Skills';
import Projects from './components/Sections/Projects/Projects';
import Contact from './components/Sections/Contact/Contact';
import { ThemeProvider } from './context/ThemeContext';
import './app.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;