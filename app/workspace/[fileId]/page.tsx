'use client'
import React, { useEffect } from 'react';

import { useParams } from 'next/navigation';
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextEditor from '../_components/TextEditor';

const Workspace = () => {
    const {fileId} = useParams();
    const fileIdString = Array.isArray(fileId) ? fileId[0] : fileId ?? '';

    const fileInfo = useQuery(api.fileStorage.getFileRecords, {
        fileId: fileIdString,
    });

    useEffect(()=>{
        console.log('File info from Convex DB: ', fileInfo);
    },[fileInfo])

    return (
        <div>
            <WorkspaceHeader />

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <PdfViewer
                        fileUrl = {fileInfo?.fileUrl ?? null}
                    />
                </div>
                <div>
                    <TextEditor />
                </div>
            </div>
        </div>
    )
}

export default Workspace;
