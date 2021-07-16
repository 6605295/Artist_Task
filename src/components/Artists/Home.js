import React, { Component } from "react";
import { InputGroup, Button, Card } from "react-bootstrap";
import { getArtistByName } from "../../api/artistsApi";
import "./home.css";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtArtist: "",
      data: {},
      isLoading: false,
      firstLoad: true,
      errorMsg: "",
    };
  }

  handleSearch = () => {
    const name = this.state.txtArtist;
    if (name == "") {
      this.setState({
        errorMsg: "* This field is required!",
        data: {},
        firstLoad: true,
      });
      setTimeout(() => {
        this.setState({ errorMsg: "" });
      }, 4000);
    } else {
      this.setState({ isLoading: true });
      getArtistByName(name)
        .then(({ data }) => {
          this.setState({ data: data, firstLoad: false, isLoading: false });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  render() {
    const { data, errorMsg, isLoading } = this.state;
    return (
      <div className="home">
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <InputGroup className="mb-3">
                <input
                  type="text"
                  value={this.state.txtArtist}
                  onChange={(e) => this.setState({ txtArtist: e.target.value })}
                  placeholder="Search artist"
                  className="form-control searchBox"
                />
                <Button className="searchBtn" onClick={this.handleSearch}>
                  <i className="fa fa-search iconColor"></i>
                </Button>
              </InputGroup>
              <span className="text-red">{errorMsg}</span>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-3">
            <div className="col-md-3"></div>
            {isLoading ? (
              <div className="mt-5 d-flex justify-content-center">
                <Loader type="Puff" color="#00BFFF" height={80} width={80} />
              </div>
            ) : (
              <>
                <div
                  className="col-md-8"
                  style={
                    this.state.firstLoad
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  {data && data.id ? (
                    <>
                      <h6>
                        {data && data.id ? "1" : "0"} Result Found for "
                        {data && data.name}"
                      </h6>
                      <div className="row">
                        <div className="col-md-4">
                          <Link
                            to={`/details/${data && data.name}`}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <Card className="mt-5 w-100 border-0">
                              <Card.Body>
                                <div className="card-body-flow mt-2">
                                  <img
                                    src={data.thumb_url}
                                    className="rounded-circle card-img-size"
                                    alt="img"
                                  />
                                  <span>
                                    <Card.Text className="card-body-title">
                                      {data.name}
                                    </Card.Text>
                                    <Card.Subtitle className="mb-2 text-muted card-body-desc">
                                      {data.facebook_page_url == "" ? (
                                        "No Facebook url available"
                                      ) : (
                                        <a
                                          href={data.facebook_page_url}
                                          target="_blank"
                                          style={{
                                            textDecoration: "none",
                                            color: "grey",
                                          }}
                                        >
                                          {data.facebook_page_url}
                                        </a>
                                      )}
                                    </Card.Subtitle>
                                  </span>
                                </div>
                              </Card.Body>
                            </Card>
                          </Link>
                        </div>
                      </div>{" "}
                    </>
                  ) : (
                    <h6>No Record Found!</h6>
                  )}
                </div>
              </>
            )}

            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    );
  }
}
