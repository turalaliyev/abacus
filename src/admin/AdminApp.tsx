import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import azAZ from 'antd/locale/az_AZ'
import { QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import adminI18n from './i18n'
import { queryClient } from './lib/queryClient'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminLayout } from './layouts/AdminLayout'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { SiteSettingsPage } from './pages/SiteSettingsPage'
import { MediaPage } from './pages/MediaPage'
import { NavigationPage } from './pages/NavigationPage'
import { TeamPage } from './pages/TeamPage'
import { ServicesPage } from './pages/ServicesPage'
import { StatsPage } from './pages/StatsPage'
import { PartnersPage } from './pages/PartnersPage'
import { WhyUsPage } from './pages/WhyUsPage'
import { BlogPage } from './pages/BlogPage'
import { AcademyPage } from './pages/AcademyPage'
import { InquiriesPage } from './pages/InquiriesPage'
import './admin.css'

function PublicOnly({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  if (loading) return null
  if (session) return <Navigate to="/admin" replace />
  return children
}

/**
 * Rendered under the `/admin/*` route in src/App.tsx and loaded lazily, so
 * none of this code (antd, tiptap, the admin i18n bundle) ships with the
 * public site. Paths are absolute so they match the URLs the browser shows.
 */
export default function AdminApp() {
  useEffect(() => {
    document.title = 'Abacus Admin'
    // The admin panel must never appear in search results.
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = 'noindex, nofollow'
    return () => {
      document.head.querySelector('meta[name="robots"]')?.remove()
    }
  }, [])

  return (
    <I18nextProvider i18n={adminI18n}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          locale={azAZ}
          theme={{
            token: {
              colorPrimary: '#ff5a1f',
              borderRadius: 8,
              fontFamily: 'Instrument Sans, system-ui, sans-serif',
            },
          }}
        >
          <AuthProvider>
            <Routes>
              <Route
                path="login"
                element={
                  <PublicOnly>
                    <LoginPage />
                  </PublicOnly>
                }
              />
              <Route
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="settings" element={<SiteSettingsPage />} />
                <Route path="media" element={<MediaPage />} />
                <Route path="navigation" element={<NavigationPage />} />
                <Route path="team" element={<TeamPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="stats" element={<StatsPage />} />
                <Route path="partners" element={<PartnersPage />} />
                <Route path="why-us" element={<WhyUsPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="academy" element={<AcademyPage />} />
                <Route path="inquiries" element={<InquiriesPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </AuthProvider>
        </ConfigProvider>
      </QueryClientProvider>
    </I18nextProvider>
  )
}
