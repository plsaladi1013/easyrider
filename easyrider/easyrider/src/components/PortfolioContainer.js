import React, { Component } from "react";
import NavTabs from "./NavTabs";
import Home from "./pages/Home";
import Uber from "./pages/Uber";
import Lyft from "./pages/Lyft";
import Transit from "./pages/Weather";

class Portfolio extends Component {
  state = {
    currentPage: "Home"
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    if (this.state.currentPage === "Home") {
      return <Home />;
    } else if (this.state.currentPage === "Uber") {
      return <Uber />;
    } else if (this.state.currentPage === "Lyft") {
      return <Lyft />;
    } else {
      return <Transit />;
    }
  };

  render() {
    return (
      <div>
        <NavTabs
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
        />
        {this.renderPage()}
      </div>
    );
  }
}

export default Portfolio;
