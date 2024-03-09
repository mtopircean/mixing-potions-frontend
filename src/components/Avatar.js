import React from "react";
import defaultProfileImage from "../assets/def_profile.jpg";

const Avatar = ({ src, height = 45, width = 45, alt = "avatar", className }) => (
  <img src={src || defaultProfileImage} height={height} width={height} alt={alt} className={className}/>
);

export default Avatar;
