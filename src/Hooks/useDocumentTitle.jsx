import { useEffect } from 'react';
import { useState } from 'react';

function useDocumentTitle(defaultTitle) {
const [documentTitle, SetDocumentTitle] = useState(defaultTitle) 
  
  
  useEffect(() => {
    if (!documentTitle.trim()) {
      document.title = defaultTitle
    } else {
      document.title = documentTitle
    }

  }, [documentTitle]);
  return [documentTitle, SetDocumentTitle]
}
export default useDocumentTitle