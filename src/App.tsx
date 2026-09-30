import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import ScrollManager from './components/ScrollManager'
import { DEFAULT_LANG, getLang, homePath, isAvailableLang } from './i18n'
import { LanguageProvider, useLanguagePreference } from './i18n/LanguageProvider'
import GMMessage from './pages/GMMessage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'

/** "/" is English. Visitors who saved another language are sent to it (index.html does this before load too). */
function RootHome() {
  const { saved, ready } = useLanguagePreference()
  if (ready && saved && saved !== DEFAULT_LANG) return <Navigate to={homePath(saved)} replace />
  return <Home ctx={getLang(DEFAULT_LANG)} />
}

/** /ar, /hi, /ur, /ml, /bn, /ne show the home page in that language. Unknown codes show the 404 page. */
function LanguageHome() {
  const { lang } = useParams()
  if (lang === DEFAULT_LANG) return <Navigate to="/" replace />
  if (!isAvailableLang(lang)) return <NotFound />
  return <Home ctx={getLang(lang)} />
}

/**
 * All pages. The router around it differs: BrowserRouter in the browser (main.tsx),
 * StaticRouter when pages are pre-rendered at build time (entry-server.tsx).
 */
export function AppRoutes() {
  return (
    <LanguageProvider>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<RootHome />} />
        <Route path="/gm-message" element={<GMMessage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/:lang" element={<LanguageHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
  )
}

export default AppRoutes