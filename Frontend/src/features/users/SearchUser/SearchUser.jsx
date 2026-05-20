import * as styles from "./SearchUser.module.css";
import { fetchUsers } from "../../../services/userServices";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useOutsideClick } from "../../../hooks/hooks";
import UserCard from "../../../components/entities/EntityCard/EntityCard";

function SearchUser({ handleNewUser }) {
  const [term, setTerm] = useState("");
  const [debouncedTerm] = useDebounce(term, 1000);
  const [isSearching, setIsSearching] = useState(false);
  const [users, setUsers] = useState([]);

  const handleClickOutside = () => {
    setIsSearching(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  const handleChange = (e) => {
    setTerm(e.target.value);
    setIsSearching(true);
  };

  useEffect(() => {
    if (debouncedTerm.length > 0) {
      const getUsers = async () => {
        const result = await fetchUsers(debouncedTerm);
        setUsers(result);
        console.log(result);
      };
      getUsers();
    }
  }, [debouncedTerm]);
  return (
    <div className={styles.searchUserContainer}>
      <input
        type="text"
        name="name"
        value={term}
        onChange={handleChange}
        placeholder="Search users"
        className={styles.searchUserInput}
        ref={ref}
      />
      {isSearching ? (
        <div className={styles.searchUserDropdown}>
          {users.length > 0 ? (
            users.map((item, ind) => {
              return (
                <div onClick={() => handleNewUser(item)}>
                  <UserCard key={ind} user={item} />
                </div>
              );
            })
          ) : (
            <div className={styles.searchUserPending}> Pending... </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default SearchUser;
