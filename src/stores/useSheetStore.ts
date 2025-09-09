import { create } from "zustand";

// This defines the shape of our store's state
type SheetState = {
    selectedLeadId: number | null;
    isOpen: boolean;
};

// This defines the actions we can perform on the state
type SheetActions = {
    openSheet: (leadId: number) => void;
    closeSheet: () => void;
};

// This creates the actual store that our components will use.
export const useSheetStore = create<SheetState & SheetActions>((set) => ({
    selectedLeadId: null,
    isOpen: false,
    // When openSheet is called, it sets the state to open and stores the lead's ID.
    openSheet: (leadId) => set({ isOpen: true, selectedLeadId: leadId }),
    // When closeSheet is called, it resets the state.
    closeSheet: () => set({ isOpen: false, selectedLeadId: null }),
}));

