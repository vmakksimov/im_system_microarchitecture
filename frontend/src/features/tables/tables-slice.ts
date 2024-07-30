// features/tables/candidates-slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as CandidateService from '../../services/candidates-service';

interface Candidate {
  id: number;
  name: string;
  role: string;
  email: string; // Ensure email is included
  status: string; 
  // Add other fields as needed
}

interface TablesState {
  candidateData: Candidate[];
  unfilteredCandidateData: Candidate[]; // Add this
  selectedCandidate: Candidate | null;
  buttonValue: string;
  isModalOpen: boolean;
  unfilteredProjectsTableData: any[]; // Add this
  projectsTableData: any[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

const initialState: TablesState = {
  unfilteredCandidateData: [],
  candidateData: [],
  selectedCandidate: null,
  buttonValue: '',
  isModalOpen: false,
  unfilteredProjectsTableData: [],
  projectsTableData: [],
  loading: false,
  error: null,
  searchTerm: '',
};

export const fetchCandidates = createAsyncThunk('candidates/fetchCandidates', async () => {
  const response = await CandidateService.getCandidates();
  console.log('candidates from tables-slice.ts', response);
  return response;
});

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    setCandidateData(state, action: PayloadAction<Candidate[]>) {
      state.candidateData = action.payload;
      state.unfilteredCandidateData = action.payload;
    },
    updateCandidate(state, action) {
      const updatedCandidate = action.payload;
      // Update candidateData and projectsTableData
      console.log('Previous candidateData:', state.candidateData);
      console.log('Previous projectsTableData:', state.projectsTableData);
      console.log('Dispatching updateCandidate with:', updatedCandidate);

      state.projectsTableData = state.projectsTableData.map(candidate =>
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      );

      state.candidateData = state.candidateData.map(candidate =>
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      );

      state.unfilteredCandidateData = state.unfilteredCandidateData.map(candidate =>
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      );

      state.unfilteredProjectsTableData = state.unfilteredProjectsTableData.map(candidate =>
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      );
      
      // Check if the updated candidate has status "Approved" or "Rejected"
      if (["Approved", "Rejected"].includes(updatedCandidate.status)) {
        // Check if the candidate is not already in projectsTableData
        const isInProjectsTable = state.projectsTableData.some(candidate => candidate.id === updatedCandidate.id);
        if (!isInProjectsTable) {
          state.projectsTableData.push(updatedCandidate);
          state.unfilteredProjectsTableData.push(updatedCandidate);
        }
      }

      console.log('Updated candidateData:', state.candidateData);
      console.log('Updated projectsTableData:', state.projectsTableData);
    },
    updateCandidateData(state, action){
      const candidateId = action.payload;

      state.candidateData = state.candidateData.filter(candidate => candidate.id !== candidateId);
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
    setProjectsTableData(state, action) {
      state.projectsTableData = action.payload;
      state.unfilteredProjectsTableData = action.payload;
      console.log('setprojectsTableData in store:', state.projectsTableData);
    },
    removeCandidate(state, action: PayloadAction<string>) {
      const candidateId = action.payload;

      state.candidateData = state.candidateData.filter(candidate => candidate.id !== candidateId);
      state.projectsTableData = state.projectsTableData.filter(candidate => candidate.id !== candidateId);
      state.unfilteredCandidateData = state.unfilteredCandidateData.filter(candidate => candidate.id !== candidateId);
      state.unfilteredProjectsTableData = state.unfilteredProjectsTableData.filter(candidate => candidate.id !== candidateId);
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      const searchTerm = action.payload;
      state.searchTerm = searchTerm;

      if (searchTerm.trim() === '') {
        // Reset to unfiltered data if search term is cleared
        state.candidateData = state.unfilteredCandidateData;
        state.projectsTableData = state.unfilteredProjectsTableData;
      } else {
        const lowerCaseTerm = searchTerm.toLowerCase();

        const filterCandidates = (candidates: Candidate[]) =>
          candidates.filter(candidate =>
            candidate.name.toLowerCase().includes(lowerCaseTerm) ||
            candidate.email.toLowerCase().includes(lowerCaseTerm)
          );

        state.candidateData = filterCandidates(state.unfilteredCandidateData);
        state.projectsTableData = filterCandidates(state.unfilteredProjectsTableData);
      }
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action: PayloadAction<Candidate[]>) => {
        state.candidateData = action.payload;
        state.unfilteredCandidateData = action.payload;
        state.loading = false;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch candidates';
      });
  },
});

export const {
  setCandidateData,
  setSelectedCandidate,
  setButtonValue,
  setModalOpen,
  setProjectsTableData,
  removeCandidate,
  updateCandidate,
  updateCandidateData,
  setSearchTerm
} = tablesSlice.actions;

export default tablesSlice.reducer;

// Selector to get filtered candidates
export const selectFilteredCandidates = (state: { tables: TablesState }) => {
  return {
    candidateData: state.tables.candidateData,
    projectsTableData: state.tables.projectsTableData,
  };
};
