"use client";
import IsAuthRoute from "~/app/_components/IsAuth";
import CardContainer from "./_components/CardContainer";
import { useCountDataQuery } from "~/store/services/resource";

const DashboardPage = () => {
  const { data: countData } = useCountDataQuery();

  return (
    <div className="bg-white">
      {countData?.data && <CardContainer {...countData?.data} />}
    </div>
  );
};

export default IsAuthRoute(DashboardPage);
