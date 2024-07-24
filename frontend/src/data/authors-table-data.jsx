import * as CandidateService from '../services/candidates-service'

const getCandidatesData = async () => {
  try {
    const candidates = await CandidateService.getCandidates();
    let inProgressCandidates = candidates.filter((candidate) => candidate.status == 'pending' || candidate.status == 'Pending');
    return inProgressCandidates;
  } catch (error) {
    console.log("error in fetch from the DB", error);
    return [];
  }
};

export const authorsTableData = getCandidatesData();

// export default authorsTableData;
