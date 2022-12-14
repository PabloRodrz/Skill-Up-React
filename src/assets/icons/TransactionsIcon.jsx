const TransactionsIcon = ({ fill = "#7a7a7a", ...props }) => {
  return (
    <svg
      {...props}
      width={22}
      height={22}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.444 0A2.444 2.444 0 000 2.444v17.112A2.444 2.444 0 002.444 22h17.112A2.444 2.444 0 0022 19.556V2.444A2.444 2.444 0 0019.556 0H2.444zm12.792 5.795c-.34-1.132-1.922-1.186-2.338-.079l-2.442 6.511-1.343-4.03c-.347-1.043-1.783-1.145-2.275-.162L5.356 11h-.467a1.222 1.222 0 000 2.444h1.215c.467 0 .894-.264 1.103-.682l.511-1.02 1.5 4.5c.368 1.104 1.919 1.133 2.327.044l2.382-6.35.789 2.628c.156.524.636.88 1.181.88h1.214a1.222 1.222 0 100-2.444h-.313l-1.562-5.205z"
      />
    </svg>
  );
};

export default TransactionsIcon;
