import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Button
} from "@material-tailwind/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateCandidateData, updateCandidate, removeCandidate as removeCandidateAction, updateFeedbackStatus } from "../../../features/tables/tables-slice";
import * as CandidateService from '../../../services/candidates-service';

const CompletedTables = ({ isFeedbackSent, projectsTableData }) => {
    const dispatch = useAppDispatch();
    const [popupMessage, setPopupMessage] = useState('');
    const [popupColor, setPopupColor] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const feedbackStatus = useAppSelector(state => state.tables.feedbackStatus);
    

    const checkStatus = (value) => {
        if (value.includes('Approved')) {
            return 'Approved';
        }
        return 'Rejected';
    };

    const removeCandidate = (e) => {
        let candidateEmail = e.target.parentElement.parentElement.children[0].children[0].children[1].children[1].textContent;
        let candidateId = projectsTableData.find((cand) => cand.email === candidateEmail)?.id;
        CandidateService.removeCandidate(candidateId)
            .then(res => {
                console.log(res);
                dispatch(removeCandidateAction(candidateId));
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const sendFeedback = (e) => {
        const status = e.target.parentElement.parentElement.parentElement.children[2].children[0].children[0].textContent.toLowerCase();
        const candidateEmail = e.target.parentElement.parentElement.parentElement.children[0].children[0].children[1].children[1].textContent;
        let candidateId = projectsTableData.find((cand) => cand.email === candidateEmail)?.id;
        let candidateData = projectsTableData.find((cand) => cand.email === candidateEmail);
        let newData = { ...candidateData, feedback: true };
        const { id, ...candidateWithoutId } = newData;
        CandidateService.editCandidate(candidateId, candidateWithoutId)
            .then(res => {
                console.log('res from feedback', res);
                dispatch(updateCandidate(res));
                if (res.status !== 'Pending') {
                    dispatch(updateCandidateData(candidateId));
                }

                console.log('candidate ID before sendFeedback', candidateId)
                CandidateService.sendFeedback(candidateId)
                    .then(res => {
                        console.log("response from feedback", res);
                        if (res.status === 200) {
                           
                            setPopupMessage('Feedback has been sent successfully!');
                            setPopupColor('bg-green-500');
                            setShowPopup(true);
                            dispatch(updateFeedbackStatus({ candidateId, status: 'success' }));
                            setTimeout(() => {
                                setShowPopup(false);
                            }, 3000);
                        } else {
                            setPopupMessage('Feedback was not sent!');
                            setPopupColor('bg-red-500');
                            setShowPopup(true);
                            dispatch(updateFeedbackStatus({ candidateId, status: 'failure' }));
                            setTimeout(() => {
                                setShowPopup(false);
                            }, 3000);
                        }
                    })
                    .catch((error) => {
                        console.log("Error in candidate update feedback", error);
                        setPopupMessage('Feedback was not sent!');
                        setPopupColor('bg-red-500');
                        setShowPopup(true);
                        dispatch(updateFeedbackStatus({ candidateId, status: 'failure' })); // Update feedback status
                        setTimeout(() => {
                            setShowPopup(false);
                        }, 3000);
                    });
            })
            .catch((error) => {
                console.log("Error in candidate update", error);
            });
    };



    useEffect(() => { }, [projectsTableData]);

    return (
        <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                <Typography variant="h6" color="white">
                    Completed candidates
                </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            {["candidate", "job", "status", "feedback sent", ""].map(
                                (el) => (
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
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {projectsTableData.length > 0 ? projectsTableData.map(
                            ({ img, name, email, job, status, feedback }, key) => {
                                const className = `py-3 px-5 ${key === projectsTableData.length - 1
                                    ? ""
                                    : "border-b border-blue-gray-50"
                                    }`;
                                const candidateId = projectsTableData.find((cand) => cand.email === email)?.id;

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
                                            {job}
                                        </td>
                                        <td className={className}>
                                            <Chip
                                                variant="gradient"
                                                color={checkStatus(status) === 'Approved' ? 'green' : 'red'}
                                                value={checkStatus(status)}
                                                className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                            />
                                        </td>
                                        <td className={className}>
                                            <div className="w-10/12">
                                                <Typography
                                                    variant="small"
                                                    className="mb-1 block text-xs font-medium text-blue-gray-600"
                                                >
                                               
                                               {feedbackStatus[candidateId] === 'success'
                                                        ? <><span><CheckIcon className="h-6 w-6 text-green-500 ml-2" /></span></>
                                                        : <><span><XMarkIcon className="h-6 w-6 text-red-500 ml-2" /></span></>
                                                    }
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                as="a"
                                                href="#"
                                                className="text-xs font-semibold text-blue-gray-600"
                                            >
                                                {checkStatus(status) === 'Approved'
                                                    ? <Button
                                                        color={!feedback ? 'green' : 'gray'}
                                                        disabled={feedback}
                                                        onClick={(e) => { e.preventDefault(); isFeedbackSent(key); sendFeedback(e); }}>SEND JOB OFFER</Button>
                                                    : <Button
                                                        color={!feedback ? 'red' : 'gray'}
                                                        disabled={feedback}
                                                        onClick={(e) => { e.preventDefault(); isFeedbackSent(key); sendFeedback(e); }}>SEND FEEDBACK</Button>
                                                }
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                as="a"
                                                href="#"
                                                className="text-xs font-semibold text-blue-gray-600"
                                                onClick={removeCandidate}
                                            >
                                                Remove
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            }
                        )
                            : <tr>
                                <td>
                                    <div>
                                        <p>No data</p>
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </CardBody>

            {showPopup && (
                <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-4 rounded shadow-lg ${popupColor}`}>
                    {popupMessage}
                </div>
            )}
        </Card>
    )
}

export default CompletedTables;
