import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import {
  setCandidateData,
  setSelectedCandidate,
  setButtonValue,
  setModalOpen,
  setProjectsTableData,
} from '../../features/tables/tables-slice'; 
import { authorsTableData, projectsTableData as initialProjectsTableData } from "@/data";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DashboardNavbar from "@/widgets/layout/dashboard-navbar";
import routes from "@/routes";
import CompletedTables from './completed/completedtables';
import Modal from '@/widgets/layout/modal/modal';
import EditCandidateInfo from '../candidate/edit-candidate';
import CandidateTable from './inprogress/candidate-table';
import AddCandidate from '../candidate/add-candidate';

export function Tables() {

  // const [candidateData, setCandidateData] = useState(authorsTableData);
  // const [selectedCandidate, setSelectedCandidate] = useState(null);
  // const [buttonValue, setButtonValue] = useState('');
  // const [isModalOpen, setModalOpen] = useState(false);
  // const openModal = () => setModalOpen(true);
  // const closeModal = () => setModalOpen(false);

  // const [projectsTableData, setProjectsTableData] = useState(initialProjectsTableData);
  const candidateData = useAppSelector((state) => state.tables.candidateData);
  const selectedCandidate = useAppSelector((state) => state.tables.selectedCandidate);
  const buttonValue = useAppSelector((state) => state.tables.buttonValue);
  const isModalOpen = useAppSelector((state) => state.tables.isModalOpen);
  const projectsTableData = useAppSelector((state) => state.tables.projectsTableData);

  const dispatch = useAppDispatch();
  useEffect(() => {
    // Initialize candidateData and projectsTableData as needed
    dispatch(setCandidateData(authorsTableData));
    dispatch(setProjectsTableData(initialProjectsTableData));
  }, []);

  const openModal = () => {
    console.log('open modal')
    dispatch(setModalOpen(true))
  };
  const closeModal = () => dispatch(setModalOpen(false));

  // console.log('candidate data1', candidateData)

  const handleCandidateUpdate = (updatedCandidate) => {
    console.log('updatedcandidate', updatedCandidate)
    // setCandidateData(prevData =>
    //   prevData.map(candidate =>
    //     candidate.name === updatedCandidate.name ? updatedCandidate : candidate
    //   )
    // );
    // closeModal();
    dispatch(setCandidateData(
      candidateData.map(candidate =>
        candidate.name === updatedCandidate.name ? updatedCandidate : candidate
      )
    ));
    closeModal();
  };

  const addCandidate = (newCandidate) => {
    console.log('newCandiate,', newCandidate)
    // setCandidateData(prevData => [...prevData, newCandidate])
    dispatch(setCandidateData([...candidateData, newCandidate]));
    closeModal();
    console.log(candidateData)

    // setCandidateData(...candidateData, newCandidate);
    // closeModal();
  }

  const isFeedbackSent = (index) => {
    // setProjectsTableData(prevState => {
    //   const newState = [...prevState];
    //   newState[index].feedback = true;
    //   return newState;
    // });
    dispatch(setProjectsTableData(
      projectsTableData.map((item, idx) => 
        idx === index ? { ...item, feedback: true } : item
      )
    ));
  }

  const changeButtonValue = (e) => {
    // setButtonValue(e.target.textContent)
    dispatch(setButtonValue(e.target.textContent));
  }

  const setCandidate = (e) => {
    console.log('ismodalOpen', isModalOpen)
    console.log('buttonValue', buttonValue)
    console.log('selectedCandidate', selectedCandidate)
    console.log('e.target', e)
    // setButtonValue(e.target.textContent)
    dispatch(setSelectedCandidate(e));
    console.log(selectedCandidate)
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
                setSelectedCandidate={setCandidate}
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
