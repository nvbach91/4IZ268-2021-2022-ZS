import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route, useLocation } from 'react-router-dom'

import Settings from './components/Settings'
import Competition from './components/Competition'
import Footer from './components/Footer'
import RaceSelect from './components/RaceSelect'

import { useStore } from './hooks/useStore'

import './App.css';

export const queryClient = new QueryClient();

const App = () => {

  const title = useStore((state) => state.title)
  const subtitle = useStore((state) => state.subtitle)
  const [setTitle, setSubtitle] = useStore((state) => [state.setTitle, state.setSubtitle])

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/~bukp00/sp2/') {
      if (title !== 'Orienteering Live Results') {
        setTitle('Orienteering Live Results')
        setSubtitle('')
      }
    }
  }, [location, title, setTitle, setSubtitle])

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Layout.Header className="header">
          <h2 className="title">{title}</h2>
          <h4 className="subtitle">{subtitle}</h4>
          <div className="settings">
            <Settings />
          </div>
        </Layout.Header>
        <Layout.Content>
          <Routes>
            <Route path="/~bukp00/sp2/" element={<RaceSelect />} />
            <Route path="/~bukp00/sp2/:id" element={<Competition />} />
          </Routes>
        </Layout.Content>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
