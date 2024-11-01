const { getMovies, getMovieById } = require('../controllers/index');
const { app } = require('../index');
const request = require('supertest');
const http = require('http');

jest.mock('../controllers/index', () => ({
  ...jest.requireActual('../controllers/index'),
  getMovies: jest.fn(),
  getMovieById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

// 3
describe('Test Api Endpoints', () => {
  it('GET /movies should get all movies', async () => {
    const mockMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];

    getMovies.mockReturnValue(mockMovies);
    const res = await request(server).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockMovies);
    expect(res.body.length).toBe(3);
  });

  // 4
  it('GET /movies/details/:id should get movie by Id', async () => {
    const mockEmployee = [
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
    ];

    getMovieById.mockReturnValue(mockEmployee);
    const res = await request(server).get('/movies/details/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockEmployee);
  });
});

// 5
describe('Test controller function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('GET /movies should return all movies', () => {
    const mockMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];

    getMovies.mockReturnValue(mockMovies);
    const result = getMovies();
    expect(result).toEqual(mockMovies);
    expect(result.length).toBe(3);
  });
});
