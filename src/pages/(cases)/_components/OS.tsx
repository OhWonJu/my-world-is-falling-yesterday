import React from "react";
import { osName, osVersion } from "react-device-detect";

const OS = () => {
  throw new ReferenceError(`${osName}-${osVersion} make some error`);

  return <div>OS</div>;
};

export default OS;
