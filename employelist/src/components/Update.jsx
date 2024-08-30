import React, { useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
const Update = () => {
const {id} = useParams();
  const initialValue = {
    id:id,
    name: "",
    email: "",
    salary: "",
  };
  let url =
    "https://file.notion.so/f/f/3849cbaa-5010-40df-a27a-f34a3a69c598/ce7879ce-8dee-462f-9a6f-52a31ea104e5/MOCK_DATA.json?table=block&id=5766873f-14ad-4eba-9e97-7c51337fa118&spaceId=3849cbaa-5010-40df-a27a-f34a3a69c598&expirationTimestamp=1725004800000&signature=7kROS-fsLFKxuCF_ObYvaa-wmffcl-RzC30v2EDHq0s&downloadName=MOCK_DATA.json";

  const [values, setValues] = useState(initialValue);
//   useEffect(() => {
//     axios.get(url)
      
//       .then((data) => setValues(data));
//   }, []);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
        let responce = await axios.patch(`${url}/${values.id}`, values);
        console.log(responce.data);
        
        setValues(responce.data);
    } catch (error) {
        console.log(error);
        
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
        //   placeholder="Update name"
          value={values.name}
          onChange={() => setValues(e.target.values)}
        />{" "}
        <br />
        <input
          type="email"
          name="email"
          placeholder="Update email"
          value={values.email}
          onChange={() => setValues(e.target.values)}
        />{" "}
        <br />
        <input
          type="number"
          name="salary"
          placeholder="Update salary"
          value={values.salary}
          onChange={() => setValues(e.target.values)}
        />
        
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;
