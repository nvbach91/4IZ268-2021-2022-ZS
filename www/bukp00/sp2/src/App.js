import React from 'react'
import { Layout } from 'antd'
import { QueryClient, QueryClientProvider } from 'react-query'

import { useStore } from './hooks/useStore'

import Settings from './components/Settings'
import Competition from './components/Competition'
import Footer from './components/Footer'
import './App.css';

export const queryClient = new QueryClient();

const App = () => {

  const title = useStore((state) => state.title)
  const subtitle = useStore((state) => state.subtitle)

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
          <Competition />
        </Layout.Content>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
