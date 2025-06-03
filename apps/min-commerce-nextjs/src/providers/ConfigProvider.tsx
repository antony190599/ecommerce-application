/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    useState,
    useEffect,
    useContext,
    createContext,
    ReactNode,
    FC,
} from 'react';

// TYPES
export interface ConfigContextType {
  data: any;
  isConfigReady: boolean;
}

// CONTEXTS
const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType);

// PROVIDERS
export const ConfigProvider: FC<
  React.PropsWithChildren<{children: ReactNode}>
> = ({children}) => {
  const [isConfigReady, setIsConfigReady] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setData({ message: 'Config loaded from API!' });
      setIsConfigReady(true);
    }, 100); // 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  const value: ConfigContextType = {
    data,
    isConfigReady,
  };

  return (
    <ConfigContext.Provider value={value}>
      {isConfigReady && children}
    </ConfigContext.Provider>
  );
};

// EXPORT HOOKS
export const useConfig = (): ConfigContextType => useContext(ConfigContext);