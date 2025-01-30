import { useState } from 'react';

export const useThrowAsyncError = () => {
  const [state, setState] = useState();
  return (error: unknown) => {
    setState(() => {
      throw error;
    });
  };
};
