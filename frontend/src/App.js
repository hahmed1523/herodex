import './styles/styles.js';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/header';
import HomePage from './pages/homePage';
import HeroPage from './pages/hero/heroPage.js';
import CreateHeroPage from './pages/hero/createHeroPage.js';
import CreateHeroFromPage from './pages/hero_sources/createHeroFromPage.js';
import HeroesFromIndexPage from './pages/hero_sources/heroesFromIndexPage.js';
import HeroesFromPage from './pages/hero_sources/heroesFromPage.js';
import MovesIndexPage from './pages/moves/movesIndex.js';
import MovePage from './pages/moves/movePage.js';
import CreateMovePage from './pages/moves/createMove.js';
import CreateCommentsPage from './pages/comments/createComments.js';
import UpdateCommentsPage from './pages/comments/updateComment.js';

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
          <Route path='/moves' element={<MovesIndexPage />} />
          <Route path='/moves/:id' element={<MovePage />} />
          <Route path='/moves/create' element={<CreateMovePage />} />
          <Route path='/moves/update/:id' element={<CreateMovePage />} />
          <Route path='/comments/update/:comment_id' element={<CreateCommentsPage />} />
          


        </Routes>
    </div>
  );
}

export default App;
