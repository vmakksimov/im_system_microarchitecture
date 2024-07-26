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
  updateCandidate
  
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
import * as CandidateService from '../../services/candidates-service';

export function Tables() {

  const candidateData = useAppSelector((state) => state.tables.candidateData);
  const selectedCandidate = useAppSelector((state) => state.tables.selectedCandidate);
  const buttonValue = useAppSelector((state) => state.tables.buttonValue);
  const isModalOpen = useAppSelector((state) => state.tables.isModalOpen);
  const projectsTableData = useAppSelector((state) => state.tables.projectsTableData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize candidateData and projectsTableData as needed
    console.log('candidateData', candidateData)
    console.log('projectsTableData', projectsTableData)
    console.log('authorsTableData', authorsTableData)

    authorsTableData.then(res => {
      console.log('res from authors table', res)
      dispatch(setCandidateData(res));
    }).catch((error) => {
      console.error('Error fetching candidate data:', error);
    });

    initialProjectsTableData.then(res => {
      console.log('res from projects table', res)
      dispatch(setProjectsTableData(res));
    });

  }, [dispatch]);

  useEffect(() => {

  }, [candidateData]);

  const openModal = () => dispatch(setModalOpen(true));
  const closeModal = () => dispatch(setModalOpen(false));

  const handleCandidateUpdate = (updatedCandidate) => {
    dispatch(updateCandidate(updatedCandidate));
    // dispatch(setProjectsTableData(candidateData.map(candidate =>
    //   candidate.name === updatedCandidate.name ? updatedCandidate : candidate
    // )));
    closeModal();
  };

  const addCandidate = (newCandidate) => {
    dispatch(setCandidateData([...candidateData, newCandidate]));
    closeModal();
  };

  const isFeedbackSent = (index) => {
    dispatch(setProjectsTableData(
      projectsTableData.map((item, idx) =>
        idx === index ? { ...item, feedback: true } : item
      )
    ));
  };

  const changeButtonValue = (e) => {
    dispatch(setButtonValue(e.target.textContent));
  };

  const setCandidate = (data) => {
    dispatch(setSelectedCandidate(data));
  };

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
                    candidateId={selectedCandidate.id}
                    candidateData={candidateData}
                    projectsTableData={projectsTableData}
                  />
                </div>
              </div>
            </Modal>
          )}
        </Card>
        <CompletedTables
          isFeedbackSent={isFeedbackSent}
          projectsTableData={projectsTableData}
          candidateData={candidateData}
        />
      </div>
    </>
  );
}

export default Tables;