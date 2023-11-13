import {create} from 'zustand';

const useMovie = create(set => ({
  trending: [],
  upComing: [],
  topRated: [],
  movie: {},
  person: {},
  personMovies: [],
  cast: [],
  similar: [],
  setTrending: trending => set(state => ({...state, trending})),
  setUpComing: upComing => set(state => ({...state, upComing})),
  setTopRated: topRated => set(state => ({...state, topRated})),
  setMovie: movie => set(state => ({...state, movie})),
  setCast: cast => set(state => ({...state, cast})),
  setSimilar: similar => set(state => ({...state, similar})),
  setPerson: person => set(state => ({...state, person})),
  setPersonMovies: personMovies => set(state => ({...state, personMovies})),
}));

export default useMovie;
