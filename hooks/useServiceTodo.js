export const useGetServiceTodos = () => {
    const [state, setState] = useState({ ...INITIAL_STATE });
    const route = useRouter();
    const service = async (path, type) => {
      try {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
        }));
        const response = await fetch(
          `https://service.pace-unv.cloud/api${path}?type=${type}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`,
            },
          }
        );
        const result = await response.json();
        const { success, message, data } = result;
        if (!success) {
          toast.error(message);
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
            message: message,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
            data,
            message: message,
          }));
        }
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          message: error,
        }));
      }
    };
  
    const reset = () => {
      setState(() => ({
        ...INITIAL_STATE,
      }));
    };
  
    return { state, service, reset };
  };