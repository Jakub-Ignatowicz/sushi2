import Image from "next/image";
import Link from "next/link";

type Props = React.HTMLAttributes<HTMLDivElement>;

const LogoImage = (src: string) => (
  <Image
    src={src}
    alt="Logo"
    width={150}
    height={150}
    className="w-full h-auto"
  />
);

const AppLogo = ({ ...props }: Props) => {
  return (
    <div {...props}>
      <Link
        className="flex justify-center items-center z-40 max-w-[150px]"
        href="/"
      >
        <div className="block dark:hidden">
          {LogoImage("/sushizume-text-logo.svg")}
        </div>
        <div className="hidden dark:block">
          {LogoImage("/sushizume-text-logo-dark.svg")}
        </div>
      </Link>
    </div>
  );
};

export default AppLogo;
