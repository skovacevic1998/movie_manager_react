import React, { useEffect, useState } from "react";
import { Button, Col, Row, Select } from "antd";
import { ViewMoviesTable } from "../utils/ViewMoviesTable";
import { RedoOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { filterTop10Revenue, replaceMovieList } from "../../redux/movieSlice";
import { RootState } from "../../redux/store";
import axios from "axios";
import { Movie } from "../../redux/types";

const { Option } = Select;

export const ViewMovies = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 },
    (_, index) => `${currentYear - index}`
  );

  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movieList);

  const [alternativeMovies, setAlternativeMovies] = useState<Movie[]>(movies);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [visibleText, setVisibleText] = useState<string | null>(
    "Top 10 Revenue per Year"
  );
  const [isResetButtonVisible, setIsResetButtonVisible] = useState(false);

  const handleYearSelect = (value: string | null) => {
    if (value !== null) {
      const numericValue = parseInt(value, 10);
      setSelectedYear(numericValue);
      setVisibleText(`Top Revenue ${numericValue}`);
      setIsResetButtonVisible(true);

      const filteredMovies = movies
        .filter((movie) => movie.year === numericValue)
        .sort((a, b) => b.revenue - a.revenue);
      setAlternativeMovies(filteredMovies);
    } else {
      setSelectedYear(null);
      setVisibleText("Top 10 Revenue per Year");
      setIsResetButtonVisible(false);

      setAlternativeMovies(movies);
    }
  };

  const handleBlur = () => {
    if (selectedYear !== null) {
      setVisibleText(`Top Revenue ${selectedYear}`);
    }
  };

  const handleReset = () => {
    setSelectedYear(null);
    setVisibleText("Top 10 Revenue per Year");
    setIsResetButtonVisible(false);

    setAlternativeMovies(movies);
  };

  const handleTop10Revenue = () => {
    dispatch(filterTop10Revenue());
    const sortedMovies = movies.slice().sort((a, b) => b.revenue - a.revenue);

    const sortedTop10Movies = sortedMovies.slice(0, 10);
    setAlternativeMovies(sortedTop10Movies);
    setIsResetButtonVisible(true);
    setVisibleText("Top 10 Revenue per Year");
    setSelectedYear(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/fetchMovies"
        );
        dispatch(replaceMovieList(response.data));
        setAlternativeMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    console.log("Component is mounting");
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div>
        <div className="vm_main_div">
          <Row>
            <Col span={24}>
              <h1 className="vm_title">Movie ranking</h1>
            </Col>
          </Row>
          <Row className="vm_button_div">
            <Col>
              <Button className="vm_top_button" onClick={handleTop10Revenue}>
                Top 10 Revenue
              </Button>
            </Col>
            <Col offset={1}>
              <Select
                className={selectedYear !== null ? "vm_year_select" : ""}
                value={visibleText}
                style={{
                  background:
                    visibleText === "Top 10 Revenue per Year" ? "" : "#e6f7ff",
                  width: 200,
                }}
                onChange={handleYearSelect}
                onBlur={handleBlur}
              >
                {years.map((year) => (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col offset={1}>
              {isResetButtonVisible && (
                <Button
                  shape="circle"
                  type="text"
                  icon={<RedoOutlined />}
                  onClick={handleReset}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <ViewMoviesTable movies={alternativeMovies} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
