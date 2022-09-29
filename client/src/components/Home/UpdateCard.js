
const UpdateCard = ({update}) => {
    console.log(update.body)
  return (
    <div>
      <h1>{update.title}</h1>
      <p>{update.body.body}</p>
    </div>
  );
}

export default UpdateCard