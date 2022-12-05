import Tags from "./Tags";
// IDEA - put filers on the left hand side like amazon
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
    <div className="w-full">
      <select
        onChange={e => setNameFilterBy(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="all">Select Painting</option>
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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="all">Select Date</option>
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
