import Image from "next/image";
import Link from "next/link";

type Props = React.HTMLAttributes<HTMLDivElement>;

const AppLogo = ({ ...props }: Props) => {
  return (
    <div {...props}>
      <Link className="flex justify-center items-center z-40" href="/">
        <Image src={"/SushizumeLogo.png"} alt="Logo" width={170} height={50} />
      </Link>
    </div>
  );
};

export default AppLogo;
