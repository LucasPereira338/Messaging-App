import * as styles from "./SearchUser.module.css";
import { fetchUsers } from "../../../services/userServices";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

function SearchUser() {
  const [term, setTerm] = useState("");
  const [debouncedTerm] = useDebounce(term, 1000);
  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    console.log("started useEffect");
    if (debouncedTerm.length > 0) {
      const getUsers = async () => {
        const result = await fetchUsers(debouncedTerm);

        console.log(result);
      };
      getUsers();
    }
  }, [debouncedTerm]);
  return (
    <div className={styles.searchUserContainer}>
      <form>
        <input
          type="text"
          name="name"
          value={term}
          onChange={handleChange}
          placeholder="Search users"
        />
        <button type="submit">Search for a user</button>
      </form>
    </div>
  );
}

export default SearchUser;
