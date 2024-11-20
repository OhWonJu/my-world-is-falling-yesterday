import React from "react";

interface DescriptionProps {
  description: string;
}

const Description = ({ description }: DescriptionProps) => {
  return (
    <div className="mb-24">
      <p className="whitespace-pre-line">{description}</p>
    </div>
  );
};

export default Description;
