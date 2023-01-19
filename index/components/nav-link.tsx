import Link from "next/link";
import { useRouter } from "next/router";

export default function NavLink({
  href = "/",
  className = "",
  activeClassName = "",
  inactiveClassName = "",
  ...rest
}) {
  let { asPath } = useRouter();

  let classes =
    asPath === href
      ? `${className} ${activeClassName}`
      : `${className} ${inactiveClassName}`;

  return <Link className={classes} href={href} {...rest} />;
}
