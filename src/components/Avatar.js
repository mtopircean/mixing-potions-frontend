import React from "react";

const Avatar = ({ src, height = 45, width = 45, alt = "avatar", className }) => (
  <img src={src} height={height} width={height} alt={alt} className={className}/>
);

export default Avatar;
