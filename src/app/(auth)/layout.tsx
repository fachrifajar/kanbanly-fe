export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
    // className="flex items-center justify-center"
    >
      {/* <div className="w-md mt-10"> */}
      {children}
      {/* </div> */}
    </div>
  );
}
