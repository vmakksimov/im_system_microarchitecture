import { Input, Checkbox, Button, Typography, Select, Option } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import "./add-candidate.css";
import { useState } from "react";


export function AddCandidate({ close }) {

    const [defaultValue, setDefaultValue] = useState("Choose");
    const handleRoleChange = (value) => {
        setDefaultValue(value);
      };

   
    return (
        <section className="addcandidate-section" >

            <div className="form-background">
                <button id="close-button" onClick={close}>X</button>
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">Add Candidate</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Fill the form below:</Typography>
                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                    
                    <div className="mb-1 flex flex-col gap-6">
                        
                        <Typography variant="small" color="blue-gray" className="-mb-5 font-medium">
                            Email
                        </Typography>
                        <Input
                            size="md"
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

                            size="md"
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
                            size="md"
                            placeholder="Last Name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Phone Number
                        </Typography>
                        <Input

                            size="md"
                            placeholder="0XXXXXXXX"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Date for interview
                        </Typography>
                        <input
                            size="lg"
                            type="date"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            className="input-date !border-t-blue-gray-200 focus:!border-t-gray-900 px-3 py-2 rounded-lg"
                            style={{ border: "1px solid rgb(176 190 197)" }}
                        />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Role
                        </Typography>
                        <Select
                            size="md"
                            value={defaultValue}
                            
                            onChange={(e) => {
                                handleRoleChange(e)
                             }}
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

                    <Button className="mt-6" fullWidth style={{ color: "white" }}>
                        Add
                    </Button>



                </form>
            </div>
        </section>
    );
}

export default AddCandidate;




