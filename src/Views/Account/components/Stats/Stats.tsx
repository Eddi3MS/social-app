import React, { Suspense, useContext, useEffect } from "react";
import { Head, Loading } from "../../../../components";
import { ErrorModalContext } from "../../../../context/ErrorFeedbackContext";
import { ErrorHandling } from "../../../../errors/errorHandling/ErrorHandling";
import { userService } from "../../../../services/userService/userService";
const UserGraphs = React.lazy(() => import("./components/UserGraphs"));

import { useQuery } from "@tanstack/react-query";

const Stats = () => {
  const { setErrorModal } = useContext(ErrorModalContext);

  const { data, isLoading, error } = useQuery(["getStats"], async () => {
    const { data } = await userService.getStats();
    return data;
  });

  useEffect(() => {
    if (error) {
      const errorHandling = new ErrorHandling(error, "Erro ao postar a foto.");
      setErrorModal(errorHandling.error);
    }
  }, [error]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Head title="Estatísticas" description="Social App - Stats Page" />
      {data && <UserGraphs data={data} />}
    </Suspense>
  );
};

export default Stats;
