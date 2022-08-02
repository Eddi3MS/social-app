import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Head, Loading } from "../../../../components";
import { ErrorModalContext } from "../../../../context/ErrorFeedbackContext";
import { ErrorHandling } from "../../../../errors/errorHandling/ErrorHandling";
import { userService } from "../../../../services/userService/userService";
//import { UserGraphs } from "./components";

const UserGraphs = React.lazy(() => import("./components/UserGraphs"));

interface IGraph {
  acessos: string;
  id: number;
  title: string;
}

const Stats = () => {
  const [data, setData] = useState<IGraph[]>([]);
  const { setErrorModal } = useContext(ErrorModalContext);

  const getStatsToShow = useCallback(async () => {
    try {
      const { data } = await userService.getStats();

      setData(data);
    } catch (error) {
      const errorHandling = new ErrorHandling(error, "Erro ao postar a foto.");
      setErrorModal(errorHandling.error);
    }
  }, []);

  useEffect(() => {
    getStatsToShow();
  }, [getStatsToShow]);

  return (
    <Suspense fallback={<Loading />}>
      <Head title="Estatísticas" description="Social App - Stats Page" />
      <UserGraphs data={data} />
    </Suspense>
  );
};

export default Stats;
