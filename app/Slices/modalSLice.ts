// store/modalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  modalType: string | null; // e.g., 'upload', 'confirm', 'delete', etc.
  modalProps?: Record<string, unknown>; // optional props to pass into the modal
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  modalProps: {},
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ modalType: string; modalProps?: Record<string, unknown> }>
    ) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps || {};
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
