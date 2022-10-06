import "./filter.css";
import { convertDate } from "../utils/util";
import Tags from "./Tags";
const Filter = ({
  classes,
  setNameFilterBy,
  setDateFilterBy,
  setTagFilters,
}) => {
  const paintings = classes?.reduce((prev, cur) => {
    if (!prev.find(item => item.id === cur.painting.id)) {
      prev.push(cur.painting);
    }
    return prev;
  }, []);
  const dates = classes?.reduce((prev, current) => {
    const date = current.date.slice(0, current.date.indexOf("T"));
    if (!prev.includes(date)) {
      prev.push(date);
    }
    return prev;
  }, []);
  const tags = paintings?.reduce((prev, current) => {
    current.tags.forEach(tag => {
      if (!prev.includes(tag)) {
        prev.push(tag);
      }
    });
    return prev;
  }, []);

  return (
    <div className="filter-container">
      <select
        onChange={e => setNameFilterBy(e.target.value)}
        className="filter-item painting-filter"
      >
        <option value="all">-- Filter By Painting --</option>
        {paintings?.map((painting, i) => {
          return (
            <option key={painting.id} value={painting.name}>
              {painting.name}
            </option>
          );
        })}
      </select>
      <select
        onChange={e => setDateFilterBy(e.target.value)}
        className="filter-item date-filter"
      >
        <option value="all">-- Filter By Date --</option>
        {dates?.map(date => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <Tags tags={tags} setTagFilters={setTagFilters} />
    </div>
  );
};

export default Filter;
