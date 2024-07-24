import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Button
} from "@material-tailwind/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { useEffect } from "react";
import { fetchCandidates } from '../../../features/tables/candidates-thunk';
import * as CandidateService from '../../../services/candidates-service';

const CompletedTables = ({ isFeedbackSent }) => {
    const dispatch = useAppDispatch();
    const projectsTableData = useAppSelector((state) => state.tables.projectsTableData);
    console.log("projectsstable", projectsTableData)
    
    // useEffect(() => {
    //     // Fetch only candidates with approved and rejected statuses
    //     dispatch(fetchCandidates('approved, rejected'));
    // }, [dispatch]);
  const checkStatus = (value) => {

      if (value.includes('approved')) {
        return 'approved'
      }
      return 'rejected'
    }

  //TODO remove functionality
  const remove = (e) => {
      let candidateEmail = e.target.parentElement.parentElement.children[0].children[0].children[1].children[1].textContent
      let candidateId = projectsTableData.find((cand) => cand.email === candidateEmail)?.id
      console.log(candidateId)
      CandidateService.removeCandidate(candidateId)
      .then(res => {
          console.log(res)
      })
      .catch((error) => {
          console.log("error", error)
      })
  }

  //TODO send feedback
  const sendFeedback = (e) => {
      console.log(e.target.textContent)
  }

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
                                          {/* {members.map(({ img, name }, key) => (
                                              <Tooltip key={name} content={name}>
                                                  <Avatar
                                                      src={img}
                                                      alt={name}
                                                      size="xs"
                                                      variant="circular"
                                                      className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                                          }`}
                                                  />
                                              </Tooltip>
                                          ))} */}
                                      </td>
                                      <td className={className}>
                                          <Chip
                                              variant="gradient"
                                              color={checkStatus(status) === 'approved' ? 'green' : 'red'}
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
                                                  {feedback
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
                                              {checkStatus(status) === 'approved'
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
                                              onClick={remove}

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
      </Card>
  )
}

export default CompletedTables;