import React from "react";
import { Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";

const CarAvatar = ({ imageSrc }) => {
  return (
    <Box position="relative" width="150px" height="150px">
      <img
        src={imageSrc}
        alt="Car"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid white",
        }}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        backgroundColor="#333333"
        borderRadius="50%"
        padding="40px"
      >
        <FontAwesomeIcon icon={faCar} size="2x" color="white" />
      </Box>
    </Box>
  );
};

export default CarAvatar;
