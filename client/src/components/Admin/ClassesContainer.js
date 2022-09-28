import { useContext,useEffect } from "react";
import { ActionCableContext } from "../..";
import ClassCard from './ClassCard'
import "./classes.css"
const ClassesContainer = ({classes}) => {
  const cable = useContext(ActionCableContext);
  useEffect(() => {
    const channel = cable.subscriptions.create(
      {
        channel: "ClassRegisterChannel",
      },
      {
        received(data) {
          // setRegistered((prev) => [...prev, data]);
          
        },
      }
    );
    return () => {
      channel.unsubscribe();
    };
  }, []);

    
  return (
    <div className="classes-container">
        <h1 className="classes-heading">Classes</h1>
        {classes?.map(class_ => <ClassCard key={class_.id} class_={class_} />)}
    </div>
  )
}

export default ClassesContainer