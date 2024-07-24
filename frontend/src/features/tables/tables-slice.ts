// features/tables/candidates-slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as CandidateService from '../../services/candidates-service';

interface Candidate {
  id: number;
  name: string;
  role: string;
  // Add other fields as needed
}

interface TablesState {
  candidateData: Candidate[];
  selectedCandidate: Candidate | null;
  buttonValue: string;
  isModalOpen: boolean;
  projectsTableData: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TablesState = {
  candidateData: [],
  selectedCandidate: null,
  buttonValue: '',
  isModalOpen: false,
  projectsTableData: [],
  loading: false,
  error: null,
};

export const fetchCandidates = createAsyncThunk('candidates/fetchCandidates', async () => {
  const response = await CandidateService.getCandidates();
  return response;
});

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action: PayloadAction<Candidate[]>) => {
        state.candidateData = action.payload;
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
} = tablesSlice.actions;

export default tablesSlice.reducer;
