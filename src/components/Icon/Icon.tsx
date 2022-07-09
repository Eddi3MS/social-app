import { HTMLAttributes, useMemo } from "react";

import "./Icon.scss";

interface IIconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  type?: "normal" | "outlined" | "round";
  size?: string | number;
}

const Icon = ({ name, type = "normal", size, ...rest }: IIconProps) => {
  const spanClassName = useMemo(() => {
    let base = `c-icon ${rest.className ?? ""}`;

    if (type === "normal") {
      return `material-icons ${base}`;
    }

    return `material-icons-${type} ${base}`;
  }, [type, rest.className]);

  const spanStyle = useMemo(() => {
    if (size) {
      return {
        ...rest.style,
        fontSize: size,
        width: size,
        height: size,
      };
    }

    return rest.style;
  }, [rest.style, size]);

  return (
    <span
      {...rest}
      className={spanClassName}
      style={{
        ...spanStyle,
        userSelect: "none",
      }}
    >
      {name}
    </span>
  );
};

export default Icon;
