import UpcomingClassRegistrationCard from "./UpcomingClassRegistrationCard";

const UpcomingClassesRegistations = ({ upcomingClassRegistrations }) => {
  return (
    <div>
      <h1>Upcoming Painting Classes</h1>
      {upcomingClassRegistrations?.map(upcomingClassRegistration => (
        <UpcomingClassRegistrationCard
          key={upcomingClassRegistration.id}
          upcomingClassRegistration={upcomingClassRegistration}
        />
      ))}
    </div>
  );
};

export default UpcomingClassesRegistations;
