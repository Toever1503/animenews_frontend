import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './site/site_web/Component/Page/Home';
import SiteLayout from './site/site_web/SiteLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categoryzz from './site/site_web/Component/Page/Category';
import AnimeList from './site/site_web/Component/Page/AnimeList';
import CharacterBirthday from './site/site_web/Component/Page/CharacterBirthday';
import CharacterDetail from './site/site_web/Component/Page/CharacterDetail';
import AnimeDetail from './site/site_web/Component/Page/AnimeDetail';
import Archive from './site/site_web/Component/Page/Archive';
import Search from './site/site_web/Component/Page/Search';
import AdminLayout from './site/site_admin/AdminLayout';
import MediaManage from './site/site_admin/Component/Media/MediaManage';
import TagManage from './site/site_admin/Component/Tag/TagManage';
import TermManage from './site/site_admin/Component/Term/TermManage';
import UserManage from './site/site_admin/Component/User/UserManage';
import UserNewEdit from './site/site_admin/Component/User/UserNewEdit';
import PostManage from './site/site_admin/Component/Post/PostManage';
import PostAddEdit from './site/site_admin/Component/Post/PostAddEdit';
import { Provider } from 'react-redux';
import store from './store/store';
import React from 'react';
import Signup from './site/component/Signup';
import Signin from './site/component/Signin';
import SinglePost from './site/site_web/Component/Post/SinglePost';
import Logout from './site/component/Logout';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path='anime_trending' element={<AnimeList />} />
              <Route path='sinh_nhat_nhan_vat_anime' element={<CharacterBirthday />} />
              <Route path='sinh_nhat_nhan_vat_anime/:month' element={<CharacterBirthday />} />
              <Route path='character/:character_name/:id' element={<CharacterDetail />} />
              <Route path='anime/:anime_name/:id' element={<AnimeDetail />} />
              <Route path='archive/:year/:month/:day' element={<Archive />} />
              <Route path='tag/:tagName' element={<Archive />} />
              <Route path='search/:q' element={<Search />} />
              <Route path='/:category' element={<Categoryzz />} />
              <Route path='/:postName/:postDate' element={<SinglePost />} />

            </Route>
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
            <Route path='logout' element={<Logout />} />

            <Route path='admin' element={<AdminLayout />}>
              <Route index element={'dashboard'} />

              <Route path='pages' element={'all pages'} />
              <Route path='page_new' element={'new page'} />

              <Route path='posts' element={<PostManage />} />
              <Route path='post_new' element={<PostAddEdit />} />

              <Route path='tags' element={<TagManage />} />
              <Route path='tag_new' element={'new tag'} />

              <Route path='categories' element={<TermManage />} />
              <Route path='term_new' element={'new term'} />

              <Route path='animes' element={'all animes'} />
              <Route path='anime_new' element={'new anime'} />

              <Route path='characters' element={'all characters'} />
              <Route path='character_new' element={'new character'} />

              <Route path='comments' element={'all comments'} />
              <Route path='comment_new' element={'new comment'} />

              <Route path='medias' element={<MediaManage />} />

              <Route path='Users' element={<UserManage />} />
              <Route path='user_new' element={<UserNewEdit />} />

              <Route path='settings' element={'all settings'} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
