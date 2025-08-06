import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Hero from './components/Sections/Hero/Hero';
import About from './components/Sections/About/About';
import Skills from './components/Sections/Skills/Skills';
import Projects from './components/Sections/Projects/Projects';
import Contact from './components/Sections/Contact/Contact';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './app.css';

function AppContent() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`App min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
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
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;