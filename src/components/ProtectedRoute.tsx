import { FC, ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelectorHook } from "../services/types/index";

export type TProtectedRoute = {
  children: ReactNode;
  path: string;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
  const auth = useSelectorHook((store) => store.authReducer);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            // Передадим в пропс to не строку, а объект.
            to={{
              // Маршрут, на который произойдёт переадресация
              pathname: "/login",
              // В from сохраним текущий маршрут
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
