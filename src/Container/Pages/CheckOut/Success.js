import React, { useEffect } from "react";
import JSConfetti from "js-confetti";
import { useNavigate } from "react-router-dom";

const Success = () => {
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      // Your custom logic goes here
      // You can show a prompt or prevent the navigation
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  let Navigate = useNavigate();

  const jsConfetti = new JSConfetti();

  const searchParams = new URLSearchParams(window.location.search);
  const Invoice = searchParams.get("invoice");

  useEffect(() => {
    jsConfetti.addConfetti();
  }, []);

  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch(Invoice).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        let name = Invoice.split("/");
        alink.download = name[name.length - 1];
        alink.click();
      });
    });
  };

  return (
    <div>
      <div className="py-20 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow">
          <h1 className="text-4xl text-black font-bold mb-4">Success!</h1>
          <div className="flex flex-col gap-4">
            <p className="text-lg text-gray-700 mb-8">
              Order Placed successful.
            </p>
            <button
              onClick={onButtonClick}
              className="bg-black text-white px-4 py-2 rounded hover:scale-105 transition duration-300 w-full"
            >
              Get Invoice
            </button>
            <button
              onClick={() => Navigate("/")}
              className="bg-black text-white px-4 py-2 rounded hover:scale-105 transition duration-300 w-full"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
