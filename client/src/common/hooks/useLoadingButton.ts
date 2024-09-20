import { useState } from 'react'

export default function useLoadingButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (action: () => Promise<void>) => {
    setIsLoading(true);
    try {
        await action();
    } finally {
        setIsLoading(false);
    }
  };

    return {
        isLoading,
        handleClick,
    }
};