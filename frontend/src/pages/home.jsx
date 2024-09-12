import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard } from "@/widgets/cards";
import { featuresData } from "@/data";

export function Home() {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    message: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState("");
  
  // Validate the form fields
  const validate = () => {
    const errors = {};
    if (!formValues.fullName) errors.fullName = "Full Name is required.";
    if (!formValues.email) errors.email = "Email Address is required.";
    else if (!/\S+@\S+\.\S+/.test(formValues.email)) errors.email = "Email Address is invalid.";
    if (!formValues.message) errors.message = "Message is required.";
    if (!formValues.termsAccepted) errors.termsAccepted = "You must agree to the terms and conditions.";
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Simulate form submission
    setTimeout(() => {
      setNotification("Your message has been sent successfully!");
      setFormValues({
        fullName: "",
        email: "",
        message: "",
        termsAccepted: false,
      });
      setErrors({});
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }, 1000); // Simulate network delay
  };

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/imrs.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Your story starts with us.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                This is a simple demo for interview management process. You can
                automate the process of interview and interact with candidates
                fully automated.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Intuitive Interface
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                Experience a user-friendly interface designed to simplify complex workflows. Our platform's streamlined design helps you focus on what matters most: finding and hiring the right candidates.
                <br />
                <br />
                Rest assured knowing your interview data is secure. We prioritize data privacy and compliance, providing a safe environment for all your candidate and interview information.
              </Typography>
              <Button variant="filled">Read More</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/quick.png"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="small" color="blue-gray" className="font-normal">Enterprise</Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    Quick Setup and Integration
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    Our platform is designed for rapid deployment. Integrate seamlessly with your existing tools and start managing your interview processes efficiently without delay.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="Contact Us" heading="Want to work with us?">
            Complete this form and we will get back to you in 24 hours.
          </PageTitle>
          <form
            className="relative mx-auto w-full mt-12 lg:w-5/12"
            onSubmit={handleSubmit}
          >
            <div className="mb-8 flex flex-col sm:flex-row gap-8">
              <Input
                name="fullName"
                variant="outlined"
                size="lg"
                label="Full Name"
                value={formValues.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />
              <Input
                name="email"
                variant="outlined"
                size="lg"
                label="Email Address"
                value={formValues.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>
            <Textarea
              name="message"
              variant="outlined"
              size="lg"
              label="Message"
              rows={8}
              value={formValues.message}
              onChange={handleChange}
              error={errors.message}
            />
            <Checkbox
              name="termsAccepted"
              checked={formValues.termsAccepted}
              onChange={handleChange}
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <a
                    href="/terms.html"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
              error={errors.termsAccepted}
            />
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="mt-8"
              fullWidth
            >
              Send Message
            </Button>
            {notification && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-green-500 text-white p-4 rounded-md shadow-lg">
                  <p>{notification}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
