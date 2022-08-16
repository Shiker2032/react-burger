import { ConstructorElement as ConstructorUI } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";

export const ConstructorElement: FC<{
  type?: "top" | "bottom";
  isLocked?: boolean;
  handleClose?: () => void;
  text: string;
  thumbnail: string;
  price: number;
}> = ConstructorUI;
