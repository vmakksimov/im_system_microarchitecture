import { createAsyncThunk } from '@reduxjs/toolkit';
import * as CandidateService from '../../services/candidates-service';


export const fetchCandidates = createAsyncThunk(
    'candidates/fetchCandidates',
    async (status: string | null = null) => {
      const response = await CandidateService.getCandidates(status);
      return response;
    }
  );
