interface IMainProps {
  children: React.ReactNode;
  className?: string | undefined;
}

export function Main({ children, className }: IMainProps) {
  return (
    <main
      className={`${className} sm:px-28 sm:py-16 p-6 flex-1 flex justify-items-stretch`}
    >
      {children}
    </main>
  );
}
