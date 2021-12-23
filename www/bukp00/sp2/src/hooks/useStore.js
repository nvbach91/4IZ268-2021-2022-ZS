import create from 'zustand'

export const useStore = create((set) => ({
  title: 'Orienteering Live Results',
  setTitle: (newTitle) => set({title: newTitle}),
  subtitle: '',
  setSubtitle: (newSubtitle) => set({subtitle: newSubtitle})
}))

export const usePersonalSettings = create((set) => ({
  highlightClub: null,
  setHighlightClub: (clubName) => set({highlightClub: clubName}),
  autoRefetch: true,
  setAutoRefetch: (bool) => set({autoRefetch: bool}),
  refetchInterval: 15000,
  setRefetchInterval: (interval) => set({refetchInterval: interval}),
}))

export const useDataStore = create((set) => ({
  lastPassings: null,
  setLastPassings: (data) => set({lastPassings: data}),
  clubList: [],
  setClubList: (list) => set({clubList: list})
}))
