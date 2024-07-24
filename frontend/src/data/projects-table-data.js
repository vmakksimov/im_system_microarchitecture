import * as CandidateService from '../services/candidates-service'

const getCandidatesData = async () => {
  try {
    const candidates = await CandidateService.getCandidates();
    let completedCandidates = candidates.filter((candidate) => candidate.status == 'approved' || candidate.status == 'rejected');
    // console.log("completedcandidates in the projects", completedCandidates)
    return completedCandidates;
  } catch (error) {
    console.log("error in fetch from the DB", error);
    return [];
  }
};

export const projectsTableData = getCandidatesData();
