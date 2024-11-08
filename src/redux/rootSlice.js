import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  portfolioData: null,
  isReloadData: false,
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    reloadData: (state, action) => {
      state.reloadData = action.payload;
    },
    resetRootState: (state, action) => {
      state = initialState;
    },
  }
});

export default rootSlice.reducer;
export const { setLoading, setPortfolioData, reloadData, resetRootState } = rootSlice.actions;