import { useLocation } from 'react-router-dom';
import  useDocumentTitle  from '../Hooks/useDocumentTitle';


export default function DocumentTitleUpdater() {
  const location = useLocation();
  const pathSegment = location.pathname.split('/').filter(Boolean).pop() || 'Home';

  const formattedTitle = `FitnessControl - ${pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1)}`;

  useDocumentTitle(formattedTitle);

  return null; // non renderizza nulla
}
