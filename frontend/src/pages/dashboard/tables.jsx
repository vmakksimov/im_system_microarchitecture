import React, { useState } from 'react';

import { authorsTableData, projectsTableData as initialProjectsTableData } from "@/data";
import DashboardNavbar from "@/widgets/layout/dashboard-navbar";
import routes from "@/routes";
import CompletedTables from './completedtables';
import InProgressTables from './in-progress-tables';

export function Tables() {

  const [projectsTableData, setProjectsTableData] = useState(initialProjectsTableData);

  const isFeedbackSent = (index) => {
      setProjectsTableData(prevState => {
          const newState = [...prevState];
          newState[index].feedback = true;
          return newState;
      });
  }

  const [stage, setStage] = useState(3); // Initial stage is 1
  
  // Function to handle next stage
  const handleNextStage = () => {
    setStage(prevStage => (prevStage < 3 ? prevStage + 1 : 3));
  };

  // Function to handle previous stage
  const handlePrevStage = () => {
    setStage(prevStage => (prevStage > 1 ? prevStage - 1 : 1));
  };

  // Map stage to progress percentage
  const stageToProgress = (stage) => {
    switch (stage) {
      case 1:
        return 33.33;
      case 2:
        return 66.66;
      case 3:
        return 100;
      default:
        return 0;
    }
  }

  const checkStatus = (value) => {

    if (value.includes('approved')) {
      return 'approved'
    }
    return 'rejected'
  }
  return (
    <>
      <DashboardNavbar routes={routes} />
      <div className="mt-12 mb-8 flex flex-col gap-12">

        <InProgressTables
          checkStatus={checkStatus}
          stageToProgress={stageToProgress}
          stage={stage}
          authorsTableData={authorsTableData}/>
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
