import { createContext, useContext, useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const { props } = usePage();

  const [ip, setIp] = useState(props.client_ip ?? null);
  const [name, setName] = useState(props.client_details?.first ?? null);
  const [idNumber, setIdNumber] = useState(props.client_details?.id_number ?? null);
  const [type ,setType] = useState(props.type ?? null);
  useEffect(() => {
    setIp(props.client_ip ?? null);
    setName(props.client_details?.first ?? null);
    setIdNumber(props.client_details?.id_number ?? null);
    setType(props.type ?? null);
  }, [props.client_ip, props.client_details,props.type ]);
  console.log(props);
  console.log("🌐 IP:", ip, "👤 Name:", name, "🪪 ID:", idNumber ,"Type: ",type);

  return (
    <AppContext.Provider value={{ ip, name, idNumber,type }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
