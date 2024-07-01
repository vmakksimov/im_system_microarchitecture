import {
    Typography,
    Avatar,
    Chip,
    Progress,
} from "@material-tailwind/react";

const CandidateTable = ({ candidateData, changeButtonValue, setSelectedCandidate, openModal }) => {
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

    const getStatusColor = (status) => {
        switch(status){
            case 'pending':
                return 'gray';
            case 'approved':
                return 'green'
            case 'rejected':
                return 'red'
            default:
                return 'gray'
            
        }
    }
    return (
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
                            </td>
                            <td className={className}>
                                <Chip
                                    variant="gradient"
                                    color={getStatusColor(status)}
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
                                        console.log("Selected Candidate:", { img, name, email, job, status, date, stage });
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
    )
}

export default CandidateTable;