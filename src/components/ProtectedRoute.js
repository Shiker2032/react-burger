import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export function ProtectedRoute({ children, ...rest }) {
  const auth = useSelector((store) => store.authReducer);
  console.log(auth);
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
}
