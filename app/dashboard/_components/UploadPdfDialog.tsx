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
import { ReactNode } from "react"

const UploadPdfDialog = ({children}: {children: ReactNode}) => {
  return (
    <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Upload PDF File</DialogTitle>
        <DialogDescription>
            <div>
                <h2 className="mt-2">Select file to upload</h2>
                <div className="border p-1 rounded-md">
                    <input type="file" accept="application/pdf" className="pl-2 hover:border cursor-pointer"/>
                </div>
                <div className="mt-2">
                    <label>File Name *</label>
                    <Input placeholder="Enter file name"/>
                </div>
            </div>
        </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
            <Button variant="default">Upload</Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>
  )
}

export default UploadPdfDialog
