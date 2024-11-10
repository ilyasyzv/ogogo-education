import { useMemo } from 'react';

const useParseHtml = (htmlContent: string) => {
  return useMemo(() => {
    return { __html: htmlContent };
  }, [htmlContent]);
};

export default useParseHtml;