
import "./filter.css"
import { convertDate } from "./util";
const Filter = ({classes, setClasses}) => {
    // const handleChange = (e) => {
    //     setClasses(classes.filter(class_ => class_))
    // }
    
    const paintings = classes?.reduce((prev, cur) => {
        if (!prev.find(item => item.id === cur.painting.id)) {
            prev.push(cur.painting)
        }
        return prev
    }, [])

  return (
    <div className="filter-container">
      <select className="filter-item painting-filter">
        <option>---- Filter By Painting ----</option>
        {paintings?.map((painting, i) => {
          return <option key={painting.id}>{painting.name}</option>;
        })}
      </select>
      <select className="filter-item date-filter">
        <option>---- Filter By Date ----</option>
        {classes?.map((class_) => {
          const { month, day, year } = convertDate(class_.date);
          return <option key={class_.id}>{`${month}/${day}/${year}`}</option>;
        })}
      </select>
      <select className="filter-item tag-filter">
        <option>---- Filter By Tags ----</option>
        
      </select>
    </div>
  );
}

export default Filter