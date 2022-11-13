const NightModeIcon = ({ fill = "#7a7a7a", ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.594 14.65c-6.03 3.02-13.368.58-16.388-5.45A12.162 12.162 0 016.34.54C.61 3.683-1.656 10.82 1.294 16.713c3.02 6.03 10.357 8.471 16.388 5.452A12.181 12.181 0 0024 14.434c-.134.074-.268.148-.406.217z"
        fill="#7A7A7A"
      />
    </svg>
  );
};

export default NightModeIcon;
