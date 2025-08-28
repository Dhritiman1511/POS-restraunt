import React from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";

const RecentOrders = () => {
  const {
    data: resData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
        <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
          Recent Orders
        </h2>
        <div className="text-[#f5f5f5] p-4">Loading orders...</div>
      </div>
    );
  }

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
    return (
      <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
        <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
          Recent Orders
        </h2>
        <div className="text-[#f5f5f5] p-4">
          Failed to load orders. Please try again.
        </div>
      </div>
    );
  }

  if (resData?.data?.data) {
    console.log(resData.data.data);
  }
  return (
    <div className="px-8 mt-6">
      <div className="bg-[#1a1a1a] w-full h-[450px] rounded-lg">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Recent Orders
          </h1>
          <a href="/orders" className="text-[#025cca] text-sm font-semibold">
            View all
          </a>
        </div>

        <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search recent orders"
            className="bg-[#1f1f1f] outline-none text-[#f5f5f5]"
          />
        </div>

        <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar-hide">
          {resData?.data.data.length > 0 ? (
            resData.data.data
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((order) => <OrderList key={order._id} order={order} />)
          ) : (
            <p className="col-span-3 text-gray-500">No orders available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
