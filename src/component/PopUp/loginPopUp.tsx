// Library Imports
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

// Custom Imports
import OTPInput from "@/component/PopUp/otpInput";
import { cn } from "@/utils/utils";
import Loader from "@/component/Loader/loader";

// Custom CSS for Modal
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 30,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1rem",
    border: "none",
    padding: 0,
    minWidth: "20vw",
    minHeight: "30vh",
    zIndex: 30,
  },
};

interface LoginProps {
  open: boolean;
  setClose: () => void;
}

const LoginPopUp: React.FC<LoginProps> = ({ open, setClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [sendOTP, setSendOTP] = useState<boolean>(false);
  const [OTPSent, setOTPSent] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setIsOpen(open);

    // Disable scrolling when the modal is open
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Handler for sending OTP
  const handleSendOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOTP("");
    if (!phoneNumber) {
      toast.error("Phone Number is Required");
      return;
    }
    if (phoneNumber.length !== 10) {
      toast.error("Phone Number should be 10 digits long!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/`,
        { phoneNumber: `+91${phoneNumber}` }
      );

      if (response.status === 200) {
        setIsOpen(false);
        setOTPSent(true);
        setIsLoading(false);
        toast.success(response.data.message);
      } else if (response.status === 201) {
        setIsOpen(false);
        setOTPSent(true);
        setIsLoading(false);
        toast.success(response.data.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(
        error?.response?.data?.error || "Something went Wrong, try again later!"
      );
      if (axios.isAxiosError(error)) {
        console.error(
          error.message || "Something went Wrong, try again later!"
        );
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  // Handler for Login
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("OTP should be 6 digits long!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/`,
        { phoneNumber: `+91${phoneNumber}`, enteredOtp: parseInt(otp) }
      );

      if (response.status === 200) {
        setIsLoading(false);
        toast.success(
          "Please add router.push(" + "path" + ") here instead of toast success"
        );
        setIsOpen(false);
        setOTPSent(false);
        router.refresh();
        toast.success(response?.data?.message);
      } else {
        setIsLoading(false);
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      toast.error(
        error?.response?.data?.error || "Something went Wrong, try again later!"
      );
      if (axios.isAxiosError(error)) {
        console.error(
          error.message || "Something went Wrong, try again later!"
        );
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  // Handle phone number change
  const handlePhoneChange = (phone: string) => {
    setPhoneNumber(phone);
    setSendOTP(phone.length === 10);
  };

  return (
    <>
      {/* Phone Number Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
          setClose();
        }}
        style={customStyles}
      >
        <div className="flex w-full">
          {/* Details */}
          <div className="font-bold p-10 flex w-full flex-col gap-y-8 items-center justify-center">
            <div className="flex w-full flex-col items-center">
              <h1 className="text-xl text-black md:text-3xl">Login</h1>
              <p className="text-base md:text-lg text-black">
                Or
                <span className="text-[#2bb8a4] underline font-semibold ml-1 hover:cursor-pointer">
                  Create an account
                </span>
              </p>
            </div>
            <form className="w-full text-base">
              <div className="relative">
                <span className="absolute start-0 bottom-3 text-black dark:text-black">
                  <svg
                    className="w-5 h-6 mr-2 rtl:rotate-[270deg]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 19 18"
                  >
                    <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="floating-phone-number"
                  className="block py-2.5 ps-6 pe-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  pattern="[0-9]{10}"
                  placeholder=" "
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  disabled={OTPSent}
                />
                <label
                  htmlFor="floating-phone-number"
                  className="absolute text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Phone number
                </label>
              </div>
            </form>
            <button
              disabled={!sendOTP}
              className={cn(
                "border bg-green-700 p-2 w-full rounded-2xl",
                !sendOTP &&
                  "disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
              )}
              onClick={handleSendOTP}
            >
              Get OTP
            </button>
            <p className="text-xs text-black md:text-base">
              By clicking Get OTP, you agree to our
              <br className="block md:hidden" />
              &nbsp;<u className="text-[#2bb8a4]">Terms and Conditions</u>
              &nbsp;and&nbsp;
              <u className="text-[#2bb8a4]">Privacy Policies</u>
            </p>
          </div>
        </div>
      </Modal>

      {/* OTP Modal */}
      <Modal
        isOpen={OTPSent}
        onRequestClose={() => {
          setIsOpen(false);
          setClose();
        }}
        style={customStyles}
      >
        <div className="flex justify-end w-full py-4 px-5">
          <button
            onClick={() => {
              setIsOpen(false);
              setClose();
            }}
          >
            <img
              src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 50 50'%3E%3Cline x1='10' y1='10' x2='40' y2='40' stroke='black' stroke-width='5' /%3E%3Cline x1='40' y1='10' x2='10' y2='40' stroke='black' stroke-width='5' /%3E%3C/svg%3E"
              alt="Cross Icon"
            />
          </button>
        </div>
        <div className="font-bold flex w-full text-black flex-col gap-y-8 px-10 pb-10 items-center">
          <h1 className="text-xl md:text-2xl">
            Please enter the OTP sent to your mobile number
          </h1>
          <OTPInput value={otp} onChange={setOTP} />
          <h1>
            Didn&apos;t get OTP ?&nbsp;
            <span
              className="underline hover:italic text-green-400 hover:cursor-pointer"
              onClick={handleSendOTP}
            >
              Resend OTP
            </span>
          </h1>
          <button
            disabled={otp.length !== 6}
            className={cn(
              "border bg-green-700 p-2 w-full rounded-2xl",
              otp.length !== 6 &&
                "disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
            )}
            onClick={handleLogin}
          >
            Verify
          </button>
          <p className="text-xs text-black md:text-base">
            By clicking Verify, you agree to our
            <br className="block md:hidden" />
            &nbsp;<u className="text-green-500">Terms and Conditions</u>
            &nbsp;and&nbsp;<u className="text-green-500">Privacy Policies</u>
          </p>
        </div>
      </Modal>
      {/* Loader */}
      {isLoading && <Loader />}
    </>
  );
};

export default LoginPopUp;
