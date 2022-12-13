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
import DeleteCommentPage from './pages/comments/deleteComment.js';
import LoginPage from './pages/login_reg/login.js';
import RegisterPage from './pages/login_reg/register.js';
import PrivateRoutes from './utils/private_routes.js';
import RegisterRoutes from './utils/reg_route.js';
import { AuthProvider } from './context/auth_context.js';

function App() {
  return (
    <div className="App">
        <AuthProvider>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/hero/:id' element={<HeroPage/>} />
            <Route path='/heroesfrom' element={<HeroesFromIndexPage />} />
            <Route path='/heroesfrom/:id' element={<HeroesFromPage />} />
            <Route path='/moves' element={<MovesIndexPage />} />
            <Route path='/moves/:id' element={<MovePage />} />
            
            <Route element={<PrivateRoutes />}>
              <Route path='/hero/create' element={<CreateHeroPage />} />
              <Route path='/hero/update/:id' element={<CreateHeroPage />} />
              <Route path='/heroesfrom/create' element={<CreateHeroFromPage />} />
              <Route path='/heroesfrom/update/:id' element={<CreateHeroFromPage />} />
              <Route path='/moves/create' element={<CreateMovePage />} />
              <Route path='/moves/update/:id' element={<CreateMovePage />} />
              <Route path='/comments/update/:comment_id' element={<CreateCommentsPage />} />
              <Route path='/comments/delete/:comment_id' element={<DeleteCommentPage />} />
            </Route>

            <Route element={<RegisterRoutes />}>
              <Route path='/register' element={<RegisterPage />} />
            </Route>
            

          </Routes>
        </AuthProvider>

    </div>
  );
}

export default App;
