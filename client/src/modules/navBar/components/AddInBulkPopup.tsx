import LabeledIcon from './LabeledIcon';
import { ACCEPTED_FILE_FORMATS } from '../../../common/constants';
import useDropFile from '../hooks/useDropFile';

import styles from '../styles/NavBar.module.css';


interface Props {
    togglePopup: () => void,
    className: string,
}

export default function AddInBulkPopup({ togglePopup, className }: Props) {
    const {
        fileName,
        fileLoaded,
        dropHandler,
        dragOverHandler,
        handleBulkUpload,
    } = useDropFile();    

    const handleBulkUploadAndTogglePopup = () => {
        togglePopup();
        handleBulkUpload();
    }

    return (
    <div className={`${styles['popup-container']} ${styles[className]}`}>
        <div className={styles.popup}>
            <button className={styles.close} onClick={togglePopup}>
                <img src="/close.svg" alt="Close icon" />
            </button>
            <h2>Question bulk upload</h2>
            <div className={styles['info-container']}>
                <div className={styles['info-tag']}>
                    <img src="/info.svg" alt="Info icon" />
                    <p>File specifications. Supported extensions: {ACCEPTED_FILE_FORMATS.map(f => f.toLowerCase()).join(', ')}.</p>
                </div>
                <div className={styles.table}>
                    <div className={`${styles.row} ${styles.header}`}>
                        <p className={styles.cell}>Question</p>
                        <p className={styles.cell}>Answers</p>
                        <p className={styles.cell}>Question type</p>
                        <p className={styles.cell}>Difficulty</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.cell}>Question example</p>
                        <p className={styles.cell}>5 answers, semicolon separated</p>
                        <p className={styles.cell}>Problem solving</p>
                        <p className={styles.cell}>Challenging</p>
                    </div>
                </div>
            </div>
            <div
                className={`${styles['drop-zone']} ${fileLoaded ? styles.loaded : ''}`}
                onDrop={dropHandler}
                onDragOver={dragOverHandler}
            >
                
                {
                    fileName === ''
                        ? <LabeledIcon src='/upload.svg' label='Drop your file here' />
                        : <LabeledIcon src='/check.svg' label={fileName} />
                }                    
                
            </div>

            {
                fileName === ''
                ? null
                : <button className={styles.button} onClick={handleBulkUploadAndTogglePopup}>Upload</button>
            }
        </div>
    </div>
    )
};