import * as styles from "./SearchUser.module.css";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { fetchUsers } from "../../../services/userServices";
import { useOutsideClick } from "../../../hooks/hooks";
import EntityCard from "../../../components/entities/EntityCard/EntityCard";

function SearchUser({ handleNewUser, msg = null, width = "default" }) {
  const [term, setTerm] = useState("");
  const [debouncedTerm] = useDebounce(term, 300);
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
      };
      getUsers();
    }
  }, [debouncedTerm]);

  return (
    <article className={styles.searchUserContainer} data-testid="SearchUser">
      <input
        type="text"
        name="name"
        value={term}
        onChange={handleChange}
        placeholder={msg ? msg : "Search for users"}
        className={
          width == "group"
            ? styles.searchUserInputGroup
            : styles.searchUserInput
        }
        ref={ref}
        autoComplete="off"
      />
      {isSearching ? (
        <section
          className={styles.searchUserDropdown}
          data-testid="SearchUserDropdown"
        >
          {users.length > 0 ? (
            users.map((item) => {
              return (
                <div key={item.id}>
                  <EntityCard
                    entity={item}
                    handleClick={() => handleNewUser(item)}
                  />
                </div>
              );
            })
          ) : (
            <div className={styles.searchUserPending}> Pending... </div>
          )}
        </section>
      ) : null}
    </article>
  );
}

export default SearchUser;
