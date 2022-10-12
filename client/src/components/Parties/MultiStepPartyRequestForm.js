import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserDetails from "./PartyRequestFormComponents/UserDetails";
import PartyPackage from "./PartyRequestFormComponents/PartyPackage";
import PartyDetails from "./PartyRequestFormComponents/PartyDetails";
import Confirmation from "./PartyRequestFormComponents/Confirmation";
import Success from "./PartyRequestFormComponents/Success";
const MultiStepPartyRequestForm = () => {
  let tomorrow = new Date();
  tomorrow.setHours(4, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = tomorrow.toISOString().slice(0, -1);
  const [formData, setFormData] = useState({
    step: 1,
    date: tomorrow,
    name: "",
    phone_number: "",
    email: "",
    package: "",
    number_of_participants: 0,
  });
  const [childrensParty, setChildrensParty] = useState(true);
  const [errors, setErrors] = useState(null);
  const user = useSelector(state => state.user.value);

  const prevStep = () => {
    setFormData(prev => ({ ...prev, step: prev.step - 1 }));
  };
  const nextStep = () => {
    setFormData(prev => ({ ...prev, step: prev.step + 1 }));
  };
  const handleChange = e => {
    console.log(e.target);
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);
  switch (formData.step) {
    case 1:
      return (
        <PartyPackage
          nextStep={nextStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 2:
      return (
        <UserDetails
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 3:
      return (
        <PartyDetails
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 4:
      return (
        <Confirmation
          nextStep={nextStep}
          prevStep={prevStep}
          values={formData}
        />
      );
    case 5:
      return (
        <Success />
        // never forget the default case, otherwise VS code would be mad!
      );
    default:
    // do nothing
  }
  return <div>MultiStepPartyRequestForm</div>;
};

export default MultiStepPartyRequestForm;
