import { createContext, useContext, useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const { props } = usePage();

  const [ip, setIp] = useState(props.client_ip ?? null);
  const [name, setName] = useState(props.client_details?.first ?? null);
  const [idNumber, setIdNumber] = useState(props.client_details?.id_number ?? null);
  const [type ,setType] = useState(props.type ?? null);
  const [success ,setSuccess] = useState(props.successMessage ?? null);
  const [error ,setError] = useState(props.errorMessage ?? null);
  const [queue, setQueue] = useState(props.queue ?? null);

  useEffect(() => {
    setIp(props.client_ip ?? null);
    setName(props.client_details?.first ?? null);
    setIdNumber(props.client_details?.id_number ?? null);
    setType(props.type ?? null);
    setError(props.errorMessage ?? null);
    setSuccess(props.successMessage ?? null);
    setQueue(props.queue ?? null);
  }, [props.client_ip, props.client_details,props.type,props.successMessage,props.errorMessage,props.queue ]);

  console.log(props);
  console.log("🌐 IP:", ip, "👤 Name:", name, "🪪 ID:", idNumber ,"Type: ",type ,'Data: ' ,queue);

  return (
    <AppContext.Provider value={{ ip, name, idNumber,type,success,error,queue }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
