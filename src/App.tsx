import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import { NotFound } from "./pages/NotFound"

function App() {
  return (
    <BrowserRouter>
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
          <Route path="/akademiya" element={<Academy variant="maliyye" />} />
          <Route path="/akademiya/maliyye" element={<Academy variant="maliyye" />} />
          <Route path="/akademiya/insan-resurslari" element={<Academy variant="insan-resurslari" />} />
          <Route path="/akademiya/satin-alma" element={<Academy variant="satin-alma" />} />
          <Route path="/kalkulyator" element={<Calculator />} />
          <Route path="/elaqe" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
