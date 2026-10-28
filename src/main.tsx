import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

const ProjectPage = lazy(() => import('./pages/ProjectPage.tsx'))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="absolute inset-0 w-12 h-12 animate-spin" viewBox="0 0 100 100" fill="none" style={{ animationDuration: '3s' }}>
              <polygon points="50,3 97,28 97,72 50,97 3,72 3,28" stroke="#4f46e5" strokeWidth="4" />
            </svg>
            <span className="font-mono text-xs text-[#4f46e5] font-bold">CGN</span>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
