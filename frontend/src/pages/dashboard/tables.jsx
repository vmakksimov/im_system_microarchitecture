import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { authorsTableData, projectsTableData as initialProjectsTableData } from "@/data";
import DashboardNavbar from "@/widgets/layout/dashboard-navbar";
import routes from "@/routes";
import CompletedTables from './completed/completedtables';
import Modal from '@/widgets/layout/modal/modal';
import EditCandidateInfo from '../candidate/edit-candidate';
import CandidateTable from './inprogress/candidate-table';
import AddCandidate from '../candidate/add-candidate';

export function Tables() {

  const [candidateData, setCandidateData] = useState(authorsTableData);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [buttonValue, setButtonValue] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [projectsTableData, setProjectsTableData] = useState(initialProjectsTableData);

  // console.log('candidate data1', candidateData)

  const handleCandidateUpdate = (updatedCandidate) => {
    console.log('updatedcandidate', updatedCandidate)
    setCandidateData(prevData =>
      prevData.map(candidate =>
        candidate.name === updatedCandidate.name ? updatedCandidate : candidate
      )
    );
    closeModal();
  };

  const addCandidate = (newCandidate) => {
    console.log('newCandiate,', newCandidate)
    setCandidateData(prevData => [...prevData, newCandidate])
    console.log(candidateData)

    // setCandidateData(...candidateData, newCandidate);
    closeModal();
  }

  const isFeedbackSent = (index) => {
    setProjectsTableData(prevState => {
      const newState = [...prevState];
      newState[index].feedback = true;
      return newState;
    });
  }

  const changeButtonValue = (e) => {
    setButtonValue(e.target.textContent)
  }

  return (
    <>
      <div>
        <DashboardNavbar
          routes={routes}
          openModal={openModal}
          changeButtonValue={changeButtonValue}
        />
        {isModalOpen && buttonValue === 'ADD Candidate' && (
          <Modal>
            <div className="modal-overlay">
              <div className="modal-box">
                <AddCandidate
                  close={closeModal}
                  addCandidate={addCandidate}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              In progress candidates table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["candidate", "role", "status", "interview date", "stage", ""].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <CandidateTable
                candidateData={candidateData}
                changeButtonValue={changeButtonValue}
                setSelectedCandidate={setSelectedCandidate}
                openModal={openModal}
              />
            </table>
          </CardBody>
          {isModalOpen && buttonValue === 'Edit' && selectedCandidate && (
            <Modal>
              <div className="modal-overlay">
                <div className="modal-box">
                  <EditCandidateInfo
                    close={closeModal}
                    candidate={selectedCandidate}
                    handleCandidateUpdate={handleCandidateUpdate}
                  />
                </div>
              </div>
            </Modal>
          )}
        </Card>
        <CompletedTables
          isFeedbackSent={isFeedbackSent}
          projectsTableData={projectsTableData}
        />
      </div>
    </>
  );
}

export default Tables;
