import React from "react";
import clsx from "clsx"; 

export default function Message({ text, sender }) {
  return (
    <div
      className={clsx(
        " p-2 rounded-lg  my-2.5 ",
        sender === "user"
          ? "bg-blue-500 text-white self-end max-w-fit max-h-fit"
          : "bg-gray-200 text-gray-800"
      )}
      aria-label={`${sender} message`}
    >
      {text}
    </div>
  );
}
