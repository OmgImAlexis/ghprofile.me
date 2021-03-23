// Modules
import React from "react";
import api from "../api.js";
import qs from "querystring";
import { withRouter } from "react-router-dom";

// Components
import Navbar from "./components/Navbar.js";
import Landing from "./components/Landing.js";


export default withRouter(class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  };

  get_data = async (username) => {

    let response = await api.get(`/historic/view?username=${username}`)
    this.setState({
      data: response.data.payload,
      username: username.toLowerCase()
    });

    if (this.state.data.period._all_time === "0") {
      this.props.updateModal(true);
    };

  }

  async componentDidMount() {
    const parameters = qs.parse(this.props.location.search.replace("?", ""))
    this.get_data(parameters.username ? parameters.username : "TrustedMercury")
  }

  render() {

    return (
      <div className="bg-gray-200 w-full h-full">
        <Navbar />
        {
          this.state.data &&
          <Landing data={this.state.data} username={this.state.username} get_data={this.get_data} />
        }
      </div>
    )
  }

})
