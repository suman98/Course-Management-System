import { $themeBreakpoints } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    selected_lession_lists: [],
    all_courses:  localStorage.getItem('courses') || "[]" ,
    selected_course: null,
  },
  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
    UPDATE_LESSION_LISTS(state,val) {
      state.selected_lession_lists = val.lessions;
      state.selected_course = val.course;
    },
    UPDATE_COURSES (state,val) { 
      state.all_courses = val;
    },
    UPDATE_SELECTED_COURSE (state,val) { 
      state.selected_course = val;
    }
  },
  actions: {},
}
