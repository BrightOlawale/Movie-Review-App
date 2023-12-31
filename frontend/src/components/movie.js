import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies.js";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container.js";
import Row from "react-bootstrap/esm/Row.js";
import Col from "react-bootstrap/esm/Col.js";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Media from "react-bootstrap/Media";
import moment from "moment";
import { Button } from "bootstrap";

const Movie = (props) => {
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster + "/100px250"} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {props.user && (
                  <Link to={"/movies/" + props.match.params.id + "/review"}>
                    Add Review
                  </Link>
                )}
              </Card.Body>
            </Card>
            <br></br>
            <h2>Reviews</h2>
            <br></br>
            {movie?.reviews?.map((review, index) => (
              <Media key={index}>
                <Media.Body>
                  <h5>
                    {review.name + " reviewed on "}{" "}
                    {moment(review.date).format("Do MMMM YYYY")}
                  </h5>
                  <p>{review.review}</p>
                  {props.user && props.user.id === review.user_id && (
                    <Row>
                      <Col>
                        <Link
                          to={{
                            pathname:
                              "/movies/" + props.match.params.id + "/review",
                            state: { currentReview: review },
                          }}
                        >
                          Edit
                        </Link>
                      </Col>
                      <Col>
                        <Button variant="link">Delete</Button>
                      </Col>
                    </Row>
                  )}
                </Media.Body>
              </Media>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
