import { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import * as CandidateService from '../../services/candidates-service'
import "./add-candidate.css";



export function AddCandidate({ close, addCandidate }) {

    const [formData, setFormData] = useState({
        img: "/img/team-2.jpeg",
        email: '',
        name: '',
        date: '',
        stage: 'FIRST',
        job: 'Developer',
        status: 'Pending',
    });

    const handleChange = (e) => {
        console.log("in handle change", e.target.value)
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    function hasEmptyValues(obj) {
        for (const [key, value] of Object.entries(obj)) {
            if (value === "" || value === null || value === undefined) {
                return true;
            }
        }
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newData = Object.fromEntries(new FormData(e.target))
        console.log("newData", newData)
        console.log("formData", formData)
        let isEmpty = hasEmptyValues(formData)
        if (isEmpty) {
            alert("Please fill all the fields")
            return
        }
        addCandidate(formData);
        CandidateService.createCandidate(formData)
        .then(res => {
            console.log('response from createCandidate', res)
        })
        .catch((error) => {
            console.log("error", error)
        })
    };

    return (
        <section className="addcandidate-section" >

            <div className="form-background">
                <button id="close-button" onClick={close}>X</button>
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">Add Candidate</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Fill the form below:</Typography>
                </div>
                {hasEmptyValues(formData) && <p style={{ color: "red", marginLeft: "26px", marginTop: "4px" }}>All the fields below are required!</p>}
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>

                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-5 font-medium">
                            Email
                        </Typography>
                        <Input
                            size="md"
                            placeholder="name@mail.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"

                        />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Full Name
                        </Typography>
                        <Input

                            size="md"
                            placeholder="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"

                        />

                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Date for interview
                        </Typography>
                        <input
                            size="lg"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}

                            className="input-date !border-t-blue-gray-200 focus:!border-t-gray-900 px-3 py-2 rounded-lg"
                            style={{ border: "1px solid rgb(176 190 197)" }}
                        />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Stage
                        </Typography>
                        <select
                            size="md"
                            style={{ border: "1px solid rgb(176 190 197)" }}
                            name="stage"
                            value={formData.stage}
                            onChange={handleChange}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 px-3 py-2 rounded-lg"
                        >
                            <option value="FIRST">1</option>
                            <option value="SECOND">2</option>
                            <option value="THIRD">3</option>
                        </select>
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Role
                        </Typography>
                        <select
                            size="md"
                            name="job"
                            style={{ border: "1px solid rgb(176 190 197)" }}
                            value={formData.job}
                            onChange={handleChange}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 px-3 py-2 rounded-lg"
                        >
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                    <Button className="mt-6" fullWidth style={{ color: "white" }} type="submit">
                        Add
                    </Button>
                </form>
            </div>
        </section>
    );
}

export default AddCandidate;




