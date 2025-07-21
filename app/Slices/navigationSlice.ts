import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SidebarItem = {
  id: string;
  label: string;
  icon: 'Home' | 'History' | 'Settings' | 'HelpCircle'; // Match actual icon keys used in iconMap
  path: string;
};

type NavigationState = {
  sidebarItems: SidebarItem[];
  activeItemId: string | null;
};

const initialState: NavigationState = {
  sidebarItems: [
    { id: 'dashboard', label: 'Dashboard', icon: 'Home', path: '/dashboard' },
    { id: 'history', label: 'History', icon: 'History', path: '/dashboard/history' },
    { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
    { id: 'support', label: 'Support', icon: 'HelpCircle', path: '/support' },
  ],
  activeItemId: 'dashboard',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveItem: (state, action: PayloadAction<string>) => {
      state.activeItemId = action.payload;
    },
  },
});

export const { setActiveItem } = navigationSlice.actions;
export default navigationSlice.reducer;
