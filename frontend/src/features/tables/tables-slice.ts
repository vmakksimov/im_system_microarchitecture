import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Candidate {
    // Define your candidate type here
    name: string;
    role: string;
    // Add other fields as needed
  }
  
  interface TablesState {
    candidateData: Candidate[];
    selectedCandidate: Candidate | null;
    buttonValue: string;
    isModalOpen: boolean;
    projectsTableData: any[]; // Adjust the type according to your projects data
  }
  
  const initialState: TablesState = {
    candidateData: [],
    selectedCandidate: null,
    buttonValue: '',
    isModalOpen: false,
    projectsTableData: [],
  };
  
  const tablesSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
      setCandidateData(state, action: PayloadAction<Candidate[]>) {
        state.candidateData = action.payload;
      },
      setSelectedCandidate(state, action: PayloadAction<Candidate | null>) {
        state.selectedCandidate = action.payload;
      },
      setButtonValue(state, action: PayloadAction<string>) {
        state.buttonValue = action.payload;
      },
      setModalOpen(state, action: PayloadAction<boolean>) {
        state.isModalOpen = action.payload;
      },
      setProjectsTableData(state, action: PayloadAction<any[]>) {
        state.projectsTableData = action.payload;
      },
      // Add other reducers as needed
    },
  });
  
  export const {
    setCandidateData,
    setSelectedCandidate,
    setButtonValue,
    setModalOpen,
    setProjectsTableData,
  } = tablesSlice.actions;
  
  export default tablesSlice.reducer;