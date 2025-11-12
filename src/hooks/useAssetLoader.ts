import { useState, useCallback, useRef } from 'react';

interface LoadedAssets {
  [key: string]: boolean;
}

export function useAssetLoader() {
  const [loadedAssets, setLoadedAssets] = useState<LoadedAssets>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadAsset = useCallback(async (assetPath: string): Promise<boolean> => {
    if (loadedAssets[assetPath]) return true;

    setIsLoading(true);
    setError(null);

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch(assetPath, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to load asset: ${assetPath} (${response.status})`);
      }

      setLoadedAssets((prev) => ({ ...prev, [assetPath]: true }));
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error loading asset';
      setError(errorMsg);
      console.error(`Asset loader error for ${assetPath}:`, errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [loadedAssets]);

  const cancelLoad = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return { loadAsset, isLoading, error, loadedAssets, cancelLoad };
}
