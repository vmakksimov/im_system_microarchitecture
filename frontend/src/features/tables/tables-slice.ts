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
  console.log('candidates from tables-slice.ts', response);
  return response;
});

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    setCandidateData(state, action: PayloadAction<Candidate[]>) {
      state.candidateData = action.payload;
    },
    updateCandidate(state, action) {
      const updatedCandidate = action.payload;
      // Update candidateData and projectsTableData
      console.log('Previous candidateData:', state.candidateData);
      console.log('Previous projectsTableData:', state.projectsTableData);
      console.log('Dispatching updateCandidate with:', updatedCandidate);

      const createCandidateProxy = (candidate) => {
        return new Proxy(candidate, {
          get(target, prop, receiver) {
            return Reflect.get(target, prop, receiver);
          },
          set(target, prop, value, receiver) {
            return Reflect.set(target, prop, value, receiver);
          },
        });
      };


      state.projectsTableData = state.projectsTableData.map(candidate =>
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      );

      state.candidateData = state.candidateData.map(candidate =>
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      );
      
      // Check if the updated candidate has status "Approved" or "Rejected"
      if (["Approved", "Rejected"].includes(updatedCandidate.status)) {
        // Check if the candidate is not already in projectsTableData
        const isInProjectsTable = state.projectsTableData.some(candidate => candidate.id === updatedCandidate.id);
        if (!isInProjectsTable) {
          state.projectsTableData.push(updatedCandidate);
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
      console.log('setprojectsTableData in store:', state.projectsTableData);
    },
    removeCandidate(state, action: PayloadAction<string>) {
      const candidateId = action.payload;

      state.candidateData = state.candidateData.filter(candidate => candidate.id !== candidateId);
      state.projectsTableData = state.projectsTableData.filter(candidate => candidate.id !== candidateId);
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
  removeCandidate,
  updateCandidate,
  updateCandidateData
} = tablesSlice.actions;

export default tablesSlice.reducer;
