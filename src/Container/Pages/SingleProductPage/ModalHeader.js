import React from "react";
import { RxCross2 } from "react-icons/rx";

const ModalHeader = ({ name, closeModal }) => {
  return (
    <div className="flex justify-between p-10 items-center">
      <div className="text-gray-700 font-semibold font-serif text-lg">
        {name}
      </div>
      <div>
        <RxCross2
          size={30}
          className="cursor-pointer"
          onClick={() => closeModal(false)}
        />
      </div>
    </div>
  );
};

export default ModalHeader;
