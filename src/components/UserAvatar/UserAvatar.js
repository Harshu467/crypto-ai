import {useContext} from "react";
import {UserContext} from "@/context/UserContext";

const UserAvatar = () => {
    const {name} = useContext(UserContext);
    const {initialLetter} = name!== "" ? name[0].toUpperCase() :"A"
    return (
        <div
        className={`w-[40px] select-none h-[40px] bg-white cursor-pointer border-[1px] rounded-full flex border items-center justify-center `}
        >
            <span className="text-[18px] text-[#000000] select-none cursor-pointer bg-center font-medium">
                {initialLetter}
            </span>
        </div>
  );
};

export default UserAvatar;
