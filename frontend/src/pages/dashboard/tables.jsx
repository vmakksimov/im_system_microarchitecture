import React, { useState } from 'react';
import { authorsTableData, projectsTableData as initialProjectsTableData } from "@/data";
import DashboardNavbar from "@/widgets/layout/dashboard-navbar";
import routes from "@/routes";
import CompletedTables from './completedtables';
import InProgressTables from './in-progress-tables';

export function Tables() {

  const [buttonValue, setButtonValue] = useState('');

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [projectsTableData, setProjectsTableData] = useState(initialProjectsTableData);

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


  const checkStatus = (value) => {

    if (value.includes('approved')) {
      return 'approved'
    }
    return 'rejected'
  }
  return (
    <>
      <DashboardNavbar
        routes={routes}
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        changeButtonValue={changeButtonValue}
        buttonValue={buttonValue}
      />
      <div className="mt-12 mb-8 flex flex-col gap-12">

        <InProgressTables
          checkStatus={checkStatus}
          authorsTableData={authorsTableData}
          isModalOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          changeButtonValue={changeButtonValue}
          buttonValue={buttonValue}
        />
        <CompletedTables
          checkStatus={checkStatus}
          isFeedbackSent={isFeedbackSent}
          projectsTableData={projectsTableData}
        />
      </div>
    </>
  );
}

export default Tables;
