function Checkbox({ handleToggle }) {
  return (
    <label>
      <input type="checkbox" onChange={() => handleToggle()} />
      Show only online users
    </label>
  );
}

export default Checkbox;
