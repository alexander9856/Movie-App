import './App.css';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import { ExploreMovies } from './components/ExploreMovies/ExploreMovies';
import { Header } from './components/Header/Header';
import { Route, Routes } from 'react-router'
import { Picks } from './components/Picks/Picks';
import { Error404 } from './components/Error404/Error404';
import { PublicMoviesProvider } from './contexts/PublicMoviesProvider';
import { MyMoviesProvider } from './contexts/MyMoviesProvider'

function App() {
  return (
    <>
      <Header />
      <Routes >

        <Route path='/' element={
          <PublicMoviesProvider>
            <ExploreMovies />
          </PublicMoviesProvider>
        } />

        <Route path='/picks' element={
          <MyMoviesProvider>
            <Picks />
          </MyMoviesProvider>
        } />
        
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App;
