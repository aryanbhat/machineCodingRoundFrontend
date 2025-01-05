import { useState } from "react";
import CheckBoxInput from "./CheckBoxInput";
import useGeneratePassword from "../hooks/useGeneratePassword";

function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(1);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeSymbol, setIncludeSymbol] = useState(false);
  const [copied, setCopied] = useState(false);
  const { generatePassword, generatedPassword, pswdErr } =
    useGeneratePassword();

  function handleGeneratePassword() {
    generatePassword(
      passwordLength,
      includeUpperCase,
      includeLowerCase,
      includeNumber,
      includeSymbol
    );
  }

  async function handleCopyClick() {
    if (generatedPassword) {
      setCopied(true);
      await navigator.clipboard.writeText(generatedPassword);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }

  function calculateStrength(password) {
    if (password.length < 8) {
      return "poor";
    } else if (password.length >= 8 && password.length < 12) {
      return "medium";
    } else if (password.length >= 12 && password.length < 16) {
      return "strong";
    } else return "very strong";
  }

  return (
    <div className=" text-slate-200 bg-slate-800 w-[70vh] mx-auto mt-10 p-5 rounded-md flex flex-col gap-4">
      {generatedPassword && (
        <div className=" flex items-center justify-between">
          <span className="text-xl font-bold">{generatedPassword}</span>
          <button
            className=" bg-teal-600 hover:bg-teal-800 cursor-pointer p-2 text-xs font-semibold rounded-md capitalize"
            onClick={handleCopyClick}
          >
            {copied ? "copied!" : "copy"}
          </button>
        </div>
      )}

      <div className=" flex flex-col gap-2">
        <div className=" flex items-center justify-between ">
          <span>Character Length</span>
          <span>{passwordLength}</span>
        </div>
        <input
          type="range"
          min={1}
          max={20}
          className=" w-full cursor-grab"
          value={passwordLength}
          onChange={(e) => {
            setPasswordLength(e.target.value);
          }}
        />
      </div>
      <div className=" grid grid-cols-2 gap-3 ">
        <CheckBoxInput
          label={"include uppercase letters"}
          value={includeUpperCase}
          setValue={setIncludeUpperCase}
        />
        <CheckBoxInput
          label={"include lowercase letters"}
          value={includeLowerCase}
          setValue={setIncludeLowerCase}
        />
        <CheckBoxInput
          label={"include numbers"}
          value={includeNumber}
          setValue={setIncludeNumber}
        />
        <CheckBoxInput
          label={"include symbols"}
          value={includeSymbol}
          setValue={setIncludeSymbol}
        />
      </div>
      {pswdErr && <span className=" block text-red-500">{pswdErr}</span>}
      {generatedPassword && (
        <div className=" flex items-center justify-between">
          <span className=" font-bold">Password strength </span>
          <span className=" text-lg font-bold text-teal-600 capitalize">
            {calculateStrength(generatedPassword)}
          </span>
        </div>
      )}
      <button
        onClick={handleGeneratePassword}
        className=" bg-teal-600 hover:bg-teal-800 cursor-pointer w-full my-4 py-3 text-xl font-bold rounded-md"
      >
        Generate Password
      </button>
    </div>
  );
}

export default PasswordGenerator;
