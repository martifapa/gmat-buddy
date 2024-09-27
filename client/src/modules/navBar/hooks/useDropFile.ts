import React, { useState } from 'react';
import Papa from 'papaparse';

import { ERROR, SUCCESS } from '../../../common/constants';
import { showToastMessage } from '../../../common/utils';
import { BaseQuestion } from '../../../common/types/question';


export default function useDropFile() {
    const [fileName, setFileName] = useState('');
    const [fileLoaded, setFileLoaded] = useState(false);
    const [parsedData, setParsedData] = useState<BaseQuestion[]>([]);

    const dropHandler = (event: React.DragEvent) => {
        event.preventDefault(); // Prevent file from being opened

        const processFile = (file: File) => {
            const fileExtension = file.name.split('.').pop()?.toLowerCase();

            if (fileExtension === 'csv') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const csvData = e.target?.result as string;
                    Papa.parse(csvData, {
                        header: true,
                        complete: (result) => {
                            const data = result.data as BaseQuestion[];
                            setParsedData(data)
                            setFileLoaded(true);
                        }
                    });
                };
                reader.readAsText(file);
            } else {
                console.error('Unsupported file format. Only CSV files are allowed.');
            }
        }
        if (event.dataTransfer.items) { // Access ITEMS
            const item = [...event.dataTransfer.items][0];
            if (item.kind === 'file') { // reject if NON-FILE files
                const file = item.getAsFile();
                if (file) {
                    processFile(file);
                    setFileName(file.name);
                }
            };
        } else { // Access the FILES
            const file = [...event.dataTransfer.files][0];
            processFile(file);
            setFileName(file.name);
          }
    }
    
    const dragOverHandler = (event: React.DragEvent) => {
        event.preventDefault(); // Prevent file from being opened
    }

    const clearFile = () => {
        setFileName('');
        setFileLoaded(false);
        setParsedData([]);
    }

    const handleBulkUpload = () => {
        if (parsedData.length > 0) {
            // UPLOAD DATA
            console.log(parsedData)
            showToastMessage('Data uploaded successfully', SUCCESS);
            clearFile();
        } else {
            showToastMessage('Data could not be parsed correctly', ERROR);
        }
    }
    return ({
        fileName,
        fileLoaded,
        dropHandler,
        dragOverHandler,
        handleBulkUpload,
    })
};