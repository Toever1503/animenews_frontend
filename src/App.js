import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './site/site_web/Component/Page/Home';
import SiteLayout from './site/site_web/SiteLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categoryzz from './site/site_web/Component/Page/Category';
import AnimeList from './site/site_web/Component/Page/AnimeList';
import CharacterBirthday from './site/site_web/Component/Page/CharacterBirthday';
import CharacterDetail from './site/site_web/Component/Page/CharacterDetail';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path='anime_trending' element={<AnimeList/>}/>
          <Route path='sinh_nhat_nhan_vat_anime' element={<CharacterBirthday /> }/>
          <Route path='sinh_nhat_nhan_vat_anime/:month' element={<CharacterBirthday /> }/>
          {/* <Route path='anime/{anime-name}/{id}' /> */}
          <Route path='character/:character_name/:id' element={<CharacterDetail />}/>
          <Route path='/:category' element={<Categoryzz/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
