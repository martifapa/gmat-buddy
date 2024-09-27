import React, { useState } from 'react';

import { ACCEPTED_FILE_FORMATS } from '../../../common/constants';
import LabeledIcon from './LabeledIcon';

import styles from '../styles/NavBar.module.css';


interface Props {
    onClick: () => void,
    className: string,
}

export default function AddInBulkPopup({ onClick, className }: Props) {
    const [fileName, setFileName] = useState('');
    
    const dropHandler = (event: React.DragEvent) => {
        event.preventDefault(); // Prevent file from being opened

        if (event.dataTransfer.items) { // Access ITEMS
            const item = [...event.dataTransfer.items][0];
            if (item.kind === 'file') { // reject if NON-FILE files
                const file = item.getAsFile();
                if (file) {
                    console.log(file.name); // process file and upload questions
                    setFileName(file.name);
                }
            };
        } else { // Access the FILES
            const file = [...event.dataTransfer.files][0];
            console.log(file.name);
            setFileName(file.name)
          }
    }
    
    const dragOverHandler = (event: React.DragEvent) => {
        event.preventDefault(); // Prevent file from being opened
    }

    const handleBulkUpload = () => {

    }

    return (
    <div className={`${styles['popup-container']} ${styles[className]}`}>
        <div className={styles.popup}>
            <button className={styles.close} onClick={onClick}>
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
                className={styles['drop-zone']}
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
                : <button className={styles.button} onClick={handleBulkUpload}>Upload</button>
            }
        </div>
    </div>
    )
};