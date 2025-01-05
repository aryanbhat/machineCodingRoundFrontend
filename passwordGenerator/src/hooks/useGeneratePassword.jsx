import { useState } from "react";

export default function useGeneratePassword() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [pswdErr, setPswdErr] = useState("");
  function generatePassword(
    length,
    includeUpperCase,
    includeLowerCase,
    includeNumber,
    includeSymbol
  ) {
    let password = "";
    let option = "";
    let err = "";
    let check = false;

    setPswdErr(err);

    if (includeUpperCase) {
      option += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      check = true;
    }
    if (includeLowerCase) {
      option += "abcdefghijklmnopqrstuvwzyz";
      check = true;
    }
    if (includeNumber) {
      option += "0123456789";
      check = true;
    }
    if (includeSymbol) {
      option += "`~!@#$%^&*()-_=+;:/?";
      check = true;
    }

    if (!check) {
      err = "Please select one option";
      setPswdErr(err);
      return;
    }

    for (let i = 0; i < length; i++) {
      const temp = Math.floor(Math.random() * option.length);
      password += option[temp];
    }

    console.log(password);

    setGeneratedPassword(password);
  }

  return { generatedPassword, pswdErr, generatePassword };
}
