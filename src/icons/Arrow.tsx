interface Props {
  className?: string;
}

export function ArrowIcon({ className }: Props) {
  return (
    <svg
      className={className}
      width="96"
      height="6"
      viewBox="0 0 96 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 3L5 5.88675L5 0.113249L0 3ZM96 3.00001L91 0.113257L91 5.88676L96 3.00001ZM4.5 3.5L91.5 3.50001L91.5 2.50001L4.5 2.5L4.5 3.5Z"
        fill="white"
        fillOpacity="0.5"
      />
    </svg>
  );
}
