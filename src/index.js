import React from "react";
import ReactDOM from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import UserContextProvider from "./Context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CartContextProvider from "./Context/CartContext";
import WhishContextProvider from "./Context/WhishContext";

let queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartContextProvider>
    <WhishContextProvider>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools> </ReactQueryDevtools>
      </QueryClientProvider>
    </UserContextProvider>
    </WhishContextProvider>
  </CartContextProvider>
);
