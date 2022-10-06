import ClassRegistrationCard from "./ClassRegistrationCard";
import "./class-registrations.css";
const ClassesRegistations = ({ classRegistrations }) => {
  return (
    <div className="class-registations-container">
      {classRegistrations?.map(classRegistration => (
        <ClassRegistrationCard
          key={classRegistration.id}
          classRegistration={classRegistration}
        />
      ))}
    </div>
  );
};

export default ClassesRegistations;
