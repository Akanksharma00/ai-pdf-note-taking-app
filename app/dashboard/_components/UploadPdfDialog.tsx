'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useAction, useMutation } from "convex/react"
import { Loader2Icon } from "lucide-react"
import { ChangeEvent, ReactNode, useState } from "react"
import { v4 as uuid4 } from "uuid"

const UploadPdfDialog = ({children}: {children: ReactNode}) => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('');
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const {user} = useUser();

    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const addFileEntryToDb = useMutation(api.fileStorage.addFileEntryToDb);
    const getFileUrl = useMutation(api.fileStorage.getFileUrl);

    const embeddDocument = useAction(api.myAction.ingest)

    const onFileSelect = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    }

    const handleUpload = async () => {
        setIsLoading(true);

        // Step 1 : Generate a short lived upload URL
        const uploadUrl = await generateUploadUrl();

        // Step 2: POST the file to the URL
        const result = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": file!.type },
            body: file,
        });
        const { storageId } = await result.json();

        const fileId = uuid4();

        const fileUrl = await getFileUrl({storageId: storageId});

        // Step 3: Save the newly allocated storage id to the database
        const dbResult = await addFileEntryToDb({
            fileId: fileId,
            storageId:storageId,
            fileName: fileName || 'Untitled PDF',
            fileUrl: fileUrl || '',
            createdBy: user?.primaryEmailAddress?.emailAddress || '',

        });

        // Step 4: API call to fetch PDF process data
        const apiResponse = await axios.get('/api/pdf-loader?pdfURL=' + fileUrl);
        await embeddDocument({
            splitText: apiResponse.data.result,
            fileId: fileId,
        });

        setIsLoading(false);
        setOpenDialog(false);
    }

  return (
    <Dialog open={openDialog}>
    <DialogTrigger asChild>
        <Button onClick={() => setOpenDialog(true)} className="w-full">+ Upload PDF File</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Upload PDF File</DialogTitle>
        <DialogDescription>
            <div>
                <h2 className="mt-2">Select file to upload</h2>
                <div className="border p-1 rounded-md">
                    <input 
                        type="file" 
                        accept="application/pdf" 
                        className="pl-2 hover:border cursor-pointer"
                        onChange={(e) => onFileSelect(e)}
                    />
                </div>
                <div className="mt-2">
                    <label>File Name *</label>
                    <Input 
                        placeholder="Enter file name"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                    />
                </div>
            </div>
        </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
            <Button 
                variant="default"
                onClick={handleUpload}
                disabled={!file || !fileName || isLoading}
            >
                {isLoading ? <Loader2Icon className="animate-spin" /> : 'Upload'}
            </Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>
  )
}

export default UploadPdfDialog

