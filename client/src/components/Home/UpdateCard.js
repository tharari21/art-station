const UpdateCard = ({ update }) => {
  console.log(update.body);
  return (
    <div className="update-card">
      <h4>{update.title}</h4>
      <p>{update.body.body}</p>
    </div>
  );
};

export default UpdateCard;
