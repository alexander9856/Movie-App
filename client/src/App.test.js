import { render, screen, act } from '@testing-library/react';
import { BrowserRouter, } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { PublicMoviesContext } from './contexts/PublicMoviesProvider';
import { MyMoviesContext } from './contexts/MyMoviesProvider';
import { ExploreMovies } from './components/ExploreMovies/ExploreMovies';
import { Picks } from './components/Picks/Picks'
import { Slider } from './components/ExploreMovies/Slider'
import { ExploreMoviesItem } from './components/ExploreMovies/ExploreMoviesItem';
import { PicksItem } from './components/Picks/PicksItem'

import App from './App';

describe('Header component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  it('renders the navigation links', () => {
    const movieExplorerLink = screen.getByText('Movie Explorer');
    const myPicksLink = screen.getByText('My Picks');

    expect(movieExplorerLink).toBeInTheDocument();
    expect(myPicksLink).toBeInTheDocument();
  });

  it('renders correct classes', () => {
    const movieExplorerLink = screen.getByText('Movie Explorer');
    const myPicksLink = screen.getByText('My Picks');

    expect(movieExplorerLink).toHaveClass('clicked');
    expect(myPicksLink).not.toHaveClass('clicked');

    act(() => {
      myPicksLink.click();
    });

    expect(movieExplorerLink).not.toHaveClass('clicked');
    expect(myPicksLink).toHaveClass('clicked');
  });

  it('navigates to the proper URL', () => {
    const movieExplorerLink = screen.getByText('Movie Explorer');
    const myPicksLink = screen.getByText('My Picks');

    act(() => {
      movieExplorerLink.click();
    });

    expect(window.location.pathname).toBe('/');

    act(() => {
      myPicksLink.click();
    });

    expect(window.location.pathname).toBe('/picks');
  });
});

describe('Error404 component', () => {
  it('renders on invalid URL', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      window.history.pushState({}, 'Test Page', '/invalidUrl');
    });
    const error404Element = screen.getByTestId('error-404');
    expect(error404Element).toBeInTheDocument();

    const backButton = screen.getByRole('link', { name: /Back to home/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton.getAttribute('href')).toBe('/');
  });
});

describe('ExploreMovies', () => {
  const mockedContextValue = {
    movies: [],
    searchedMovies: [],
    searchValue: '',
    onSearchHandler: jest.fn(),
    selected: '',
    onSelectChangeHandler: jest.fn(),
    loading: false,
  };
  it('renders ExploreMovies component', () => {
    render(
      <PublicMoviesContext.Provider value={mockedContextValue}>
        <ExploreMovies />
      </PublicMoviesContext.Provider>
    );

    const exploreMoviesElement = screen.getByTestId('explore-movies');
    expect(exploreMoviesElement).toBeInTheDocument();
  });
  it('displays loading spinner when loading is true', () => {
    render(
      <PublicMoviesContext.Provider value={{ mockedContextValue, loading: true }}>
        <ExploreMovies />
      </PublicMoviesContext.Provider>
    );

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
  it('displays movie catalog when loading is false', () => {
    const mockMoviesContextData = { ...mockedContextValue, movies: [{ _id: 1 }] };
    render(
      <PublicMoviesContext.Provider value={mockMoviesContextData}>
        <ExploreMovies />
      </PublicMoviesContext.Provider>
    );
    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });
  it('renders correct number of items in the Slider', () => {
    const mockMovies = [
      { _id: 1, primaryImage: { url: 'image1.jpg' }, originalTitleText: { text: 'Movie 1' } },
      { _id: 2, primaryImage: { url: 'image2.jpg' }, originalTitleText: { text: 'Movie 2' } },
      { _id: 3, primaryImage: { url: 'image3.jpg' }, originalTitleText: { text: 'Movie 3' } },
    ];
    render(
      <PublicMoviesContext.Provider value={{ onClickPost: jest.fn() }}>
        <Slider movies={mockMovies} />
      </PublicMoviesContext.Provider>
    );
    const items = screen.getAllByTestId('item-wrapper');
    expect(items.length).toBe(mockMovies.length);
    screen.debug()
  });
})

describe('ExploreMoviesItem', () => {
  const mockItem = {
    id: '123',
    primaryImage: {
      url: 'http://example.com/image.jpg',
    },
    originalTitleText: {
      text: 'Test Movie',
    },
  };

  const mockOnClickPost = jest.fn();

  beforeEach(() => {
    render(
      <PublicMoviesContext.Provider value={{ onClickPost: mockOnClickPost }}>
        <ExploreMoviesItem item={mockItem} />
      </PublicMoviesContext.Provider>
    );
  });

  it('renders item image and title', () => {
    const itemImage = screen.getByAltText('Movie');
    const itemTitle = screen.getByText('Test Movie');

    expect(itemImage).toBeInTheDocument();
    expect(itemImage).toHaveAttribute('src', 'http://example.com/image.jpg');
    expect(itemTitle).toBeInTheDocument();
  });

  it('calls onClickPost when action icons are clicked', () => {
    const actionIcons = screen.getAllByTestId('action-icon');
    actionIcons[0].click();
    actionIcons[1].click();
    actionIcons[2].click();

    expect(mockOnClickPost).toHaveBeenCalledTimes(3);
    expect(mockOnClickPost).toHaveBeenCalledWith('favorites', '123');
    expect(mockOnClickPost).toHaveBeenCalledWith('watched', '123');
    expect(mockOnClickPost).toHaveBeenCalledWith('wishlist', '123');
  });
});


describe('Picks component', () => {
  const mockedContextValue = {
    myMovies: [],
    filter: 'all',
    loading: true,
    onChangeFilter: jest.fn(),
    onClickAction: jest.fn()
  };
  it('renders Picks component', () => {
    render(
      <MyMoviesContext.Provider value={mockedContextValue}>
        <Picks />
      </MyMoviesContext.Provider>
    );
    const myPicksElement = screen.getByTestId('my-picks');
    expect(myPicksElement).toBeInTheDocument();
  });
  it('renders loading spinner when loading is true', () => {
    render(
      <MyMoviesContext.Provider value={mockedContextValue}>
        <Picks />
      </MyMoviesContext.Provider>
    );
    const loadingSpinner = screen.getByTestId('spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });
  it('displays Picks catalog when loading is false', () => {
    render(
      <MyMoviesContext.Provider value={{ ...mockedContextValue, loading: false }}>
        <Picks />
      </MyMoviesContext.Provider>
    );
    const picksContainer = screen.getByTestId('picks-container');
    expect(picksContainer).toBeInTheDocument();
  });
  it('renders correct number of PickItems', () => {
    const myMovies = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
      { id: 3, title: 'Movie 3' },
    ];
    render(<MyMoviesContext.Provider value={{ ...mockedContextValue, myMovies: myMovies, loading: false }}>
      <Picks />
    </MyMoviesContext.Provider>
    );
    const pickItems = screen.getAllByTestId('pick-item');
    expect(pickItems.length).toBe(myMovies.length);
  });
});

describe('PicksItem component', () => {
  const mockItem = {
    id: 1,
    originalTitleText: { text: 'Movie Title' },
    image: 'path/to/image.jpg',
    collection: 'favorites',
  };
  it('renders item image and title', () => {
    render(<PicksItem item={mockItem} />);
    const itemImage = screen.getByAltText('Movie');
    const itemTitle = screen.getByText('Movie Title');

    expect(itemImage).toBeInTheDocument();
    expect(itemImage).toHaveClass('item-image');
    expect(itemTitle).toBeInTheDocument();
  });
});