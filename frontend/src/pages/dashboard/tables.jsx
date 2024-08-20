import React, { useState, useEffect, useContext } from 'react';
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
  updateCandidate,
  fetchCandidates,
  selectFilteredCandidates,


} from '../../features/tables/tables-slice';

import { authorsTableData, projectsTableData as initialProjectsTableData } from "@/data";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useSelector } from 'react-redux';
import DashboardNavbar from "@/widgets/layout/dashboard-navbar";
import routes from "@/routes";
import CompletedTables from './completed/completedtables';
import Modal from '@/widgets/layout/modal/modal';
import EditCandidateInfo from '../candidate/edit-candidate';
import CandidateTable from './inprogress/candidate-table';
import AddCandidate from '../candidate/add-candidate';
import * as CandidateService from '../../services/candidates-service';
// import { selectFilteredCandidates } from '../../features/tables/tables-slice';
import { AuthContext } from '../../context/AuthContext';

export function Tables() {
  const { candidateData, projectsTableData } = useSelector(selectFilteredCandidates);
  // const candidateData = useAppSelector((state) => state.tables.candidateData);
  const selectedCandidate = useAppSelector((state) => state.tables.selectedCandidate);
  const buttonValue = useAppSelector((state) => state.tables.buttonValue);
  const isModalOpen = useAppSelector((state) => state.tables.isModalOpen);
  // const projectsTableData = useAppSelector((state) => state.tables.projectsTableData);
  // const candidateData = useAppSelector(selectFilteredCandidates);
  // const projectsTableData = useAppSelector(selectCompletedCandidates);
  // const selectedCandidate = useAppSelector((state) => state.tables.selectedCandidate);
  // const buttonValue = useAppSelector((state) => state.tables.buttonValue);
  // const isModalOpen = useAppSelector((state) => state.tables.isModalOpen);
  const dispatch = useAppDispatch();



  const fetchData = () => {
    authorsTableData.then(res => {
      dispatch(setCandidateData(res));
    }).catch((error) => {
      console.error('Error fetching candidate data:', error);
    });

    initialProjectsTableData.then(res => {
      dispatch(setProjectsTableData(res));
    }).catch((error) => {
      console.error('Error fetching projects table data:', error);
    });
  };


  useEffect(() => {

  }, [candidateData, projectsTableData]);

  useEffect(() => {

    fetchData();

  }, [dispatch]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCandidates()).unwrap();
        console.log('unwraped', dispatch(fetchCandidates()).unwrap());
      } catch (error) {
        console.error('Error dispatching fetchCandidates:', error);
      }
    };

    fetchData();
  }, [dispatch]);


  const openModal = () => dispatch(setModalOpen(true));
  const closeModal = () => dispatch(setModalOpen(false));

  const handleCandidateUpdate = (updatedCandidate) => {
    dispatch(updateCandidate(updatedCandidate));
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
    console.log('changeButtonValue', e.target.textContent === '');
    if (e.target.textContent === ''){
      dispatch(setButtonValue('ADD Candidate'));
    }else{
      dispatch(setButtonValue(e.target.textContent));
    }
    
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
              <thead className='table-auto hidden lg:table'>
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