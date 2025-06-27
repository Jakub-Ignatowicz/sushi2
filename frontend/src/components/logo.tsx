import Image from "next/image";
import Link from "next/link";

type Props = React.HTMLAttributes<HTMLDivElement>;

const AppLogo = ({ ...props }: Props) => {
  return (
    <div {...props}>
      <Link
        className="flex justify-center items-center z-40 max-w-[200px] lg:max-w-[150px]"
        href="/"
      >
        <Image
          src={"/SushizumeLogo.png"}
          alt="Logo"
          width={150}
          height={150}
          className="w-full h-auto"
        />
      </Link>
    </div>
  );
};

export default AppLogo;
