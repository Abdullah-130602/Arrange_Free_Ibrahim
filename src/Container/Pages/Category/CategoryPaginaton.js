import { Pagination } from "antd";
import React from "react";

const CategoryPaginaton = ({ totalPages, pageNumber, handlePageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <Pagination
        current={pageNumber}
        total={totalPages * 20}
        pageSize={20}
        onChange={handlePageChange}
        size="large"
      />
    </div>
  );
};

export default CategoryPaginaton;
