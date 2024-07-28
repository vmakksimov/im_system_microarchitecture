import * as CandidateService from '../services/candidates-service'

const getCandidatesData = async () => {
  try {
    const candidates = await CandidateService.getCandidates();
    let completedCandidates = candidates.filter((candidate) => candidate.status !== 'Pending');
    return completedCandidates;
  } catch (error) {
    console.log("error in fetch from the DB", error);
    return [];
  }
};

export const projectsTableData = getCandidatesData();
