import {create} from 'zustand';

const useAppSettings = create(set => ({
  language: 'tr',
  loading: false,
  setLanguage: language => set(state => ({...state, language})),
  setLoading: loading => set(state => ({...state, loading})),
}));

export const setLanguage = language =>
  useAppSettings.getState().setLanguage(language);

export const language = useAppSettings.getState().language;

export default useAppSettings;
