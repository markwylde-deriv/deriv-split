function useDerivAPI (command, filter) {
  const deriv = useContext(DerivAPIContext);

  const [state, setState] = useState();

  useEffect(() => {
    const unsubscribe = deriv.subscribe(command, filter, setState);

    return () => unsubscribe()
  }, []);

  return state;
}

export default useDerivAPI;
