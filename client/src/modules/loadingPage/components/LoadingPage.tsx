import { Spinner } from '../../../components/spinner/spinner';
import Navbar from '../../navBar/components/Navbar';

import styles from '../styles/loadingPage.module.css';


export default function LoadingPage() {
  return (
    <>
    <Navbar />
    <div className={styles['loading-page']}>
        <h2>Loading</h2>
        <div>
            <Spinner />
        </div>
    </div>
    </>
  )
};