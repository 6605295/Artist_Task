import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEventsByName } from "../../api/artistsApi";
import Loader from "react-loader-spinner";
import moment from "moment";
import "./details.css";
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      eventsList: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    const name = this.props.match.params.name;
    getEventsByName(name)
      .then(({ data }) => {
        this.setState({
          data: data[0]?.artist,
          eventsList: data,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  render() {
    const { data, eventsList, isLoading } = this.state;
    return (
      <div className="home">
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <h6>
                  <i className="fa fa-chevron-left back-arrow"></i> Back to
                  Results
                </h6>
              </Link>
              {isLoading ? (
                <div className="mt-5 d-flex justify-content-center">
                  <Loader type="Puff" color="#00BFFF" height={80} width={80} />
                </div>
              ) : (
                <>
                  {data && data.id ? (
                    <>
                      {/* artist start */}
                      <div className="row">
                        <div className="col-md-4">
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
                        </div>
                      </div>{" "}
                      {/* artist end */}
                      <h6 className="mt-5">
                        {eventsList && eventsList.length} Upcoming Events
                      </h6>
                      {/* events start */}
                      <div className="row">
                        {console.log("events list ", eventsList)}
                        {eventsList.map((event, i) => {
                          return (
                            <>
                              <div className="col-md-4" key={i}>
                                <Card className="mt-3 w-100">
                                  <Card.Body>
                                    <span>
                                      <Card.Subtitle className="mb-2 text-muted">
                                        Event Deatils
                                      </Card.Subtitle>
                                      <hr />
                                      <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-6 col-6">
                                          <h6 className="main">Country</h6>
                                          <p className="mb-2 text-muted sub">
                                            {event?.venue?.country}
                                          </p>
                                          <h6 className="main">Venue</h6>
                                          <p className="mb-2 text-muted sub">
                                            {event?.venue?.name}
                                          </p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-6 col-6">
                                          <h6 className="main">City</h6>
                                          <p className="mb-2 text-muted sub">
                                            {event?.venue?.city}
                                          </p>
                                          <h6 className="main">Date</h6>
                                          <p className="mb-2 text-muted sub">
                                            {moment(event?.datetime).format(
                                              "Do MMMM, YYYY"
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    </span>
                                  </Card.Body>
                                </Card>
                              </div>
                            </>
                          );
                        })}
                      </div>{" "}
                      {/* events end */}
                    </>
                  ) : (
                    <h6 className="text-center mt-5">No Events available.</h6>
                  )}
                </>
              )}
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    );
  }
}
