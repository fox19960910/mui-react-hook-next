import React, { useState } from 'react';

function useVisible() {
  const [state, setstate] = useState(false);

  return {
    state,
    setstate,
  };
}

export default useVisible;
