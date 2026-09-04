import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Seo } from "./components/seo/Seo"
import { SmoothScroll } from "./components/ui/SmoothScroll"
import { Layout } from "./components/layout/Layout"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { WhyUs } from "./pages/WhyUs"
import { Partners } from "./pages/Partners"
import { Services } from "./pages/Services"
import { ServiceDetail } from "./pages/ServiceDetail"
import { Blog } from "./pages/Blog"
import { Academy } from "./pages/Academy"
import { Calculator } from "./pages/Calculator"
import { Contact } from "./pages/Contact"
import { Inquiry } from "./pages/Inquiry"
import { NotFound } from "./pages/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Seo />
      <SmoothScroll />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/haqqimizda" element={<About />} />
          <Route path="/niye-biz" element={<WhyUs />} />
          <Route path="/partnyorlar" element={<Partners />} />
          <Route path="/xidmetler" element={<Services />} />
          <Route path="/xidmetler/:slug" element={<ServiceDetail />} />
          <Route path="/bloq" element={<Blog variant="xeberler" />} />
          <Route path="/bloq/xeberler" element={<Blog variant="xeberler" />} />
          <Route path="/bloq/qanunvericilik" element={<Blog variant="qanunvericilik" />} />
          <Route path="/akademiya" element={<Academy />} />
          <Route path="/akademiya/*" element={<Navigate to="/akademiya" replace />} />
          <Route path="/kalkulyator" element={<Calculator />} />
          <Route path="/elaqe" element={<Contact />} />
          <Route path="/muraciet" element={<Inquiry />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
