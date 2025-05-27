import { SecretsProvider } from './context/SecretsContext'
import { ScrollProvider } from './context/ScrollContext'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import RotationWrapper from './components/RotationWrapper'
import { useRef } from 'react'

const App = () => {
  const wrapperRef = useRef(null);

  return (
    <ScrollProvider>
      <SecretsProvider>
        <>
          <RotationWrapper ref={wrapperRef}>
            <Navbar />
            <Hero wrapperRef={wrapperRef} />
            <About />
            <Projects />
            <Footer />
          </RotationWrapper>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(12px)',
                color: '#fff',
                padding: '20px 24px',
                borderRadius: '12px',
                fontSize: '1.25rem',
                fontWeight: '500',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '400px',
                maxWidth: '600px',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              },
              duration: 5000,
            }}
          />
        </>
      </SecretsProvider>
    </ScrollProvider>
  )
}

export default App