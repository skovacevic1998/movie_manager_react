import React from "react";
import { Form, Input, Button, InputNumber, Row, Col } from "antd";
import Axios from "axios";
import { Movie } from "../../redux/types";

export const AddMovies: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values:", values);

    const movieData: Movie = {
      id: 0,
      title: values.title,
      year: values.year,
      revenue: values.revenue,
      genre: values.genre,
      description: values.description,
      director: values.director,
      actors: values.actors,
      runtime: values.runtime,
      rating: values.rating,
      votes: values.votes,
      metascore: values.metascore,
    };

    Axios.post("http://localhost:8080/api/addMovie", movieData)
      .then((response) => {
        console.log("Movie added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
      });

    form.resetFields();
  };

  const formatCurrency = (value: string | number | undefined) => {
    if (!value) return "";
    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseCurrency = (value: string | undefined) => {
    if (typeof value !== "string" || !value) return "";
    return value.replace(/\$\s?|(,*)/g, "");
  };

  return (
    <div className="addm_main_div">
      <Form form={form} name="movieForm" onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={11}>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} offset={1}>
            <Form.Item label="Year" name="year" rules={[{ required: true }]}>
              <InputNumber
                style={{ width: "100%" }}
                parser={(value) => (value ? value.replace(/\D/g, "") : "")}
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Revenue"
              name="revenue"
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={formatCurrency}
                parser={parseCurrency}
              />
            </Form.Item>
          </Col>
          <Col span={12} offset={1}>
            <Form.Item label="Genre" name="genre" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Director"
              name="director"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} offset={1}>
            <Form.Item
              label="Actors"
              name="actors"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Runtime"
              name="runtime"
              rules={[{ required: true }]}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <InputNumber style={{ width: "calc(100% - 32px)" }} />
                <span style={{ marginLeft: 8 }}>min</span>
              </div>
            </Form.Item>
          </Col>
          <Col span={12} offset={1}>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="Votes" name="votes" rules={[{ required: true }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12} offset={1}>
            <Form.Item
              label="Metascore"
              name="metascore"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit">
                ADD MOVIE
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
