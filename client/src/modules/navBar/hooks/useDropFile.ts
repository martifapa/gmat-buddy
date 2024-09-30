import React, { useState } from 'react';
import Papa from 'papaparse';

import { ERROR, MANDATORY_COLUMNS, SUCCESS } from '../../../common/constants';
import { isBulkQuestionsResponse, toCamelCase } from '../../../common/utils';
import { QuestionRequest } from '../../../common/types/question';
import useToast from '../../../common/hooks/useToast';
import { saveQuestionsBulk } from '../../../redux/slices/question';
import { useAppDispatch } from '../../../common/hooks/redux';


export default function useDropFile() {
    const dispatch = useAppDispatch();

    const [fileName, setFileName] = useState('');
    const [fileLoaded, setFileLoaded] = useState(false);
    const [parsedData, setParsedData] = useState<QuestionRequest[]>([]);

    const { toast } = useToast();

    const dropHandler = (event: React.DragEvent) => {
        event.preventDefault(); // Prevent file from being opened

        const processFile = (file: File) => {
            const fileExtension = file.name.split('.').pop()?.toLowerCase();

            const standardizeHeaders = (header: string) => {
                const standardHeader = toCamelCase(header);
                if (!MANDATORY_COLUMNS.includes(standardHeader)) {
                    return false;
                }
                return standardHeader;
            }

            if (fileExtension === 'csv') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const csvData = event.target?.result as string;
                    Papa.parse(csvData, {
                        header: true,
                        transformHeader: (header) => {
                            const standardizedHeader = standardizeHeaders(header);
                            if (!standardizedHeader) {
                                toast(ERROR, `Invalid header: ${header}.`, 4000);
                                throw new Error(`Invalid header: ${header}`);
                            }
                            return standardizedHeader;
                        },
                        transform: (value, header) => {
                            if (header === 'answers') {
                                return value.split(';');
                            }
                            return value;
                        },
                        complete: (result) => {
                            const data = result.data as QuestionRequest[]; // Reading-questions not supported
                            
                            setParsedData(data)
                            setFileLoaded(true);
                            setFileName(file.name);
                        }
                    });
                };
                reader.readAsText(file);

                return true;
            } else {
                toast(ERROR, 'Only CSV files are allowed.');
            }
        }

        if (event.dataTransfer.items) { // Access ITEMS
            const item = [...event.dataTransfer.items][0];
            if (item.kind === 'file') { // reject if NON-FILE files
                const file = item.getAsFile();
                if (file) {
                    processFile(file);
                }
            };
        } else { // Access the FILES
            const file = [...event.dataTransfer.files][0];
            processFile(file);
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

    const handleBulkUpload = async () => {
        if (parsedData.length > 0) {
            try {
                const result = await dispatch(saveQuestionsBulk(parsedData));

                if (!isBulkQuestionsResponse(result.payload)) {
                    toast(ERROR, 'There was an error uploading your data. Please try again.', 4000);
                } else if (result.payload.errors.length > 0) {
                    toast(ERROR, `${result.payload.errors.length} questions could not be uploaded.`);
                } else {
                    toast(SUCCESS, 'Data uploaded successfully.');
                }
            } catch (error) {
                toast(ERROR, 'Data could not be parsed correctly.', 4000);
            } finally {
                clearFile();
            }
        } else {
            toast(ERROR, 'Data could not be parsed correctly.');
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