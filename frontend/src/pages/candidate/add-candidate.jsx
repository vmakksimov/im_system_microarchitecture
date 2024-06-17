import { Input, Checkbox, Button, Typography, Select, Option } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import "./add-candidate.css";


export function AddCandidate({close}) {
    return (
        <section className="signup-section" >
           
            <div className="form-background">
                <button id="close-button" onClick={close}>X</button>
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">Add Candidate</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Fill the form below:</Typography>
                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Email
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            First Name
                        </Typography>
                        <Input

                            size="lg"
                            placeholder="First name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Last Name
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Last Name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Role
                        </Typography>
                        <Select
                            size="lg"
                            placeholder="Last Name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}

                        >
                            <Option value="developer">Developer</Option>
                            <Option value="designer">Designer</Option>
                            <Option value="manager">Manager</Option>
                        </Select>
                    </div>

                    <Button className="mt-6" fullWidth>
                        Add
                    </Button>



                </form>
            </div>
        </section>
    );
}

export default AddCandidate;




