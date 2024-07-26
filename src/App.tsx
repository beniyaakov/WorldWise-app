import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import City from "./components/City/City";
import CityList from "./components/City/CityList";
import CitiesContexts from "./contexts/CitiesContexts";
import FakeAuthProvider  from "./contexts/FackAuthContext";
import CountriesList from "./components/Countrie/CountriesList";
import ProtectedRoute from "./pages/ProtectedRoutes/ProtectedRoute";
import SpinnerFullPage from "./ui/Spinners/SpinnerFullPage";
import Form from "./ui/Form/Form";


const Homepage = lazy(()=>import("./pages/Homepage/Homepage"))
const Product = lazy(()=>import("./pages/Product/Product"))
const Pricing = lazy(()=>import("./pages/Product/Pricing"))
const Login = lazy(()=>import("./pages/Login/Login"))
const AppLayout = lazy(()=>import("./pages/AppLayout/AppLayout"))
const PageNotFound = lazy(()=>import("./pages/PageNotFound/PageNotFound"))




function App() {

  return (
    <>
    <FakeAuthProvider>
      <CitiesContexts>
        <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index path="/" element={<Homepage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute> }>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountriesList />} />
              <Route path="form" element={<Form />}/>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        </BrowserRouter>
      </CitiesContexts>
    </FakeAuthProvider>
    </>
  );
}

export default App;
