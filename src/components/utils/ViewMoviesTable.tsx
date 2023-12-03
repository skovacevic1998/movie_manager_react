import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Movie, ViewMoviesTableProps } from "../../redux/types";
import { EyeOutlined } from "@ant-design/icons";
import { MovieModal } from "./MovieModal";

const movieColumns: ColumnsType<Movie> = [
  {
    title: "Ranking",
    dataIndex: "ranking",
    key: "ranking",
    render: (text: any, record: Movie, index: number) => index + 1,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
    render: (value: number) => `$${value.toLocaleString()}`,
  },
  {
    title: "",
    dataIndex: "watchicon",
    key: "watchicon",
    render: () => <EyeOutlined />,
  },
];

export const ViewMoviesTable: React.FC<ViewMoviesTableProps> = ({ movies }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Movie | null>(null);

  const handleRowClick = (record: Movie) => {
    setSelectedRow(record);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Table
        columns={movieColumns}
        rowKey={(record) => record.id}
        dataSource={movies}
        scroll={{ y: 500 }}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />

      {selectedRow && (
        <MovieModal
          visible={modalVisible}
          onCancel={handleModalCancel}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
};
