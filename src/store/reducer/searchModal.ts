import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ISearchModalState {
  isOpen: boolean;
}

const initState: ISearchModalState = {
  isOpen: false,
};

export const searchModalSlice = createSlice({
  name: "searchModal",
  initialState: initState,
  reducers: {
    toggleSearchModal: (state, action: PayloadAction<boolean>) => {
      console.log(`file: searchModal.ts:16 > action:`, action.payload);
      return {
        ...state,
        isOpen: action.payload,
      };
    },
  },
});

export const { toggleSearchModal } = searchModalSlice.actions;

export default searchModalSlice.reducer;
