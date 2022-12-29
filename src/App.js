import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import DataProvider from "./Data/Context";
import Store from "./Data/Store";
import Routers from "./Routes";

// Preloader
$(window).on("load", function () {
  $(".lds-ellipsis").fadeOut(); // will first fade out the loading animation
  $(".preloader").delay(333).fadeOut("slow"); // will fade out the white DIV that covers the website.
  $("body").delay(333);
});

function App() {
  return (
    <Provider store={Store}>
      <DataProvider>
        <Router>
          <Routers />
        </Router>
      </DataProvider>
    </Provider>
  );
}

export default App;
