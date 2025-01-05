/* eslint-disable react/prop-types */
function CheckBoxInput({ label, value, setValue }) {
  return (
    <div className=" flex items-center gap-2">
      <input
        type="checkbox"
        value={value}
        onChange={(e) => {
          setValue(e.target.checked);
        }}
      />
      <label className=" capitalize font-semibold"> {label}</label>
    </div>
  );
}

export default CheckBoxInput;
