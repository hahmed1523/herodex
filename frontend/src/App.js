import './styles/styles.js';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/header';
import HomePage from './pages/homePage';
import HeroPage from './pages/heroPage.js';
import CreateHeroPage from './pages/createHeroPage.js';
import CreateHeroFromPage from './pages/createHeroFromPage.js';
import HeroesFromIndexPage from './pages/heroesFromIndexPage.js';
import HeroesFromPage from './pages/heroesFromPage.js';

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/hero/:id' element={<HeroPage/>} />
          <Route path='/hero/create' element={<CreateHeroPage />} />
          <Route path='/hero/update/:id' element={<CreateHeroPage />} />
          <Route path='/heroesfrom' element={<HeroesFromIndexPage />} />
          <Route path='/heroesfrom/:id' element={<HeroesFromPage />} />
          <Route path='/heroesfrom/create' element={<CreateHeroFromPage />} />
          <Route path='/heroesfrom/update/:id' element={<CreateHeroFromPage />} />


        </Routes>
    </div>
  );
}

export default App;
