import { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import "./edit-candidate.css";

export function EditCandidateInfo({ close, candidate, handleCandidateUpdate }) {
    const [formData, setFormData] = useState({
        stage: '',
        job: '',
        status: 'Choose',
        date: ''
    });

    useEffect(() => {
        if (candidate) {
            setFormData({
                img: candidate.img || '',
                email: candidate.email || '',
                stage: candidate.stage || '',
                job: candidate.job || '',
                status: candidate.status || '',
                date: candidate.date || ''
            });
        }
    }, [candidate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        console.log('candindate in submit', candidate)
        e.preventDefault();
        handleCandidateUpdate({
            ...candidate,
            ...formData,
        });

        // TODO Edit service
    };

    return (
        <section className="addcandidate-section">
            <div className="form-background">
                <button id="close-button" onClick={close}>X</button>
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">Edit Candidate</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Fill the form below:</Typography>
                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Role
                        </Typography>
                        <select
                            size="md"
                            name="job"
                            style={{ border: "1px solid rgb(176 190 197)" }}
                            value={formData.job || ''}
                            onChange={handleChange}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 px-3 py-2 rounded-lg"
                            

                        >
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Manager">Manager</option>
                        </select>
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Stage
                        </Typography>
                        <select
                            name="stage"
                            value={formData.stage || ''}
                            onChange={handleChange}
                            style={{ border: "1px solid rgb(176 190 197)" }}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 px-3 py-2 rounded-lg"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Date for interview
                        </Typography>
                        <input
                            name="date"
                            value={formData.date || ''}
                            onChange={handleChange}
                            size="md"
                            type="date"
                            className="input-date !border-t-blue-gray-200 focus:!border-t-gray-900 px-3 py-2 rounded-lg"
                            style={{ border: "1px solid rgb(176 190 197)" }}
                        />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Status
                        </Typography>
                        <select
                            name="status"
                            value={formData.status || ''}
                            onChange={handleChange}
                            style={{ border: "1px solid rgb(176 190 197)" }}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 px-3 py-2 rounded-lg"
                        >
                            <option value="Choose">Choose</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <Button className="mt-6" fullWidth style={{ color: "white" }} type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </section>
    );
}

export default EditCandidateInfo;
