import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Runs an async loader (a service-layer call) and exposes { data, loading,
 * error, reload }. Because every page already goes through this hook, moving
 * from mock data to a real API requires no component changes.
 *
 * @param {Function} loader async function returning the data
 * @param {Array} deps dependency list that should re-trigger the loader
 * @param {*} initialData value used before the first resolution
 */
export function useAsyncData(loader, deps = [], initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.resolve()
      .then(() => loaderRef.current())
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadToken]);

  const reload = useCallback(() => setReloadToken((token) => token + 1), []);

  return { data, loading, error, reload };
}

export default useAsyncData;
