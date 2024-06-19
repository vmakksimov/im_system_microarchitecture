import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Progress,
} from "@material-tailwind/react";
import Modal from '@/widgets/layout/modal/modal';
import EditCandidateInfo from '../candidate/edit-candidate';

const InProgressTables = ({ checkStatus, authorsTableData, isModalOpen, closeModal, openModal, buttonValue, changeButtonValue }) => {
    const [candidateData, setCandidateData] = useState(authorsTableData);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    

    console.log('candidate data1', candidateData)

    const handleCandidateUpdate = (updatedCandidate) => {
        console.log('updatedcandidate', updatedCandidate)
        setCandidateData(prevData =>
            prevData.map(candidate =>
                candidate.name === updatedCandidate.name ? updatedCandidate : candidate
            )
        );
        closeModal();
    };

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

    return (
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
                    <tbody>
                        {candidateData.map(
                            ({ img, name, email, job, status, date, stage }, key) => {
                                const className = `py-3 px-5 ${key === candidateData.length - 1
                                    ? ""
                                    : "border-b border-blue-gray-50"
                                    }`;

                                return (
                                    <tr key={name}>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Avatar src={img} alt={name} size="sm" variant="rounded" />
                                                <div>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        {name}
                                                    </Typography>
                                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                                        {email}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {job}
                                            </Typography>
                                            {/* <Typography className="text-xs font-normal text-blue-gray-500">
                                                {job}
                                            </Typography> */}
                                        </td>
                                        <td className={className}>
                                            <Chip
                                                variant="gradient"
                                                color={status == 'pending' ? 'gray' : status == 'approved' && 'green' || status == 'rejected' && 'red' }
                                                value={status}
                                                className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                            />
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {date}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <div className="w-10/12">
                                                <Typography
                                                    variant="small"
                                                    className="mb-1 block text-xs font-medium text-blue-gray-600"
                                                >
                                                    {stage}/3
                                                </Typography>
                                                <Progress
                                                    value={stageToProgress(parseInt(stage))}
                                                    variant="gradient"
                                                    color={stage == 3 ? "green" : "gray"}
                                                    className="h-1"
                                                />
                                            </div>
                                        </td>
                                        <td className={className}>

                                            <Typography
                                                as="a"
                                                href="#"
                                                className="text-xs font-semibold text-blue-gray-600"

                                                onClick={(e) => {
                                                    changeButtonValue(e);
                                                    setSelectedCandidate({ img, name, email, job, status, date, stage });
                                                    openModal();
                                                }}
                                            >
                                                Edit
                                            </Typography>

                                        </td>

                                    </tr>
                                );
                            }
                        )}
                    </tbody>
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

    )
}

export default InProgressTables;