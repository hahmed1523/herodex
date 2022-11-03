import './styles/styles.js';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/header';
import HomePage from './pages/homePage';
import HeroPage from './pages/heroPage.js';
import CreateHeroPage from './pages/createHeroPage.js';
import CreateHeroFromPage from './pages/createHeroFromPage.js';

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/hero/:id' element={<HeroPage/>} />
          <Route path='/hero/create' element={<CreateHeroPage />} />
          <Route path='/hero/update/:id' element={<CreateHeroPage />} />
          <Route path='/herofrom/create' element={<CreateHeroFromPage />} />

        </Routes>
    </div>
  );
}

export default App;
