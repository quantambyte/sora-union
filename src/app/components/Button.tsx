import React from 'react';

const Button = ({
  onClick,
  selectedSortion,
  text,
  term,
}: {
  onClick: (term: string) => void;
  selectedSortion: string;
  text: string;
  term: string;
}) => {
  return (
    <button
      onClick={() => onClick(term)}
      className={`${
        selectedSortion === term ? 'bg-blue-500 text-white' : 'bg-gray-200'
      } py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      {text}
    </button>
  );
};

export default Button;
