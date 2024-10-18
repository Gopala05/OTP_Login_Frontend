// Library Imports
import React, { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value.replace(/\D/g, ""); // Allow only digits
    const newValueArr = value.split("");

    if (newValue.length <= 1) {
      newValueArr[index] = newValue;
      onChange(newValueArr.join(""));
    }

    // Focus next input if not in the last field
    if (newValue.length === 1 && index < 5) {
      (
        document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement
      )?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      // Remove the character and set focus to the previous input
      const newValueArr = value.split("");
      newValueArr[index] = "";
      onChange(newValueArr.join(""));

      if (index > 0) {
        (
          document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement
        )?.focus();
      }
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="flex gap-3">
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          maxLength={1}
          className="w-10 md:w-20 h-10 md:h-20 text-center text-2xl border-black border-2 rounded-lg focus:border-blue-500 focus:outline-none"
        />
      ))}
    </div>
  );
};

export default OTPInput;
