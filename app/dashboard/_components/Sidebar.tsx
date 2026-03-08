import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LayoutList, Shield } from "lucide-react"
import Image from "next/image"
import UploadPdfDialog from "./UploadPdfDialog"

const Sidebar = () => {
  return (
    <div className='h-screen shadow-md p-7'>
      <Image src={'/logo.svg'} alt='Logo' width={140} height={100} />

      <div className="mt-10">
        <UploadPdfDialog>
          <Button variant='default' className="w-full mb-4">+ Upload PDF</Button>
        </UploadPdfDialog>

        <div className="p-2 mt-1 flex items-center gap-2 hover:bg-slate-200 rounded-md cursor-pointer">
            <LayoutList/>
            <h2>Workspace</h2>
        </div>
        <div className="p-2 mt-1 flex items-center gap-2 hover:bg-slate-200 rounded-md cursor-pointer">
            <Shield/>
            <h2>Upgrade</h2>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 w-full p-7">
        <Progress value={5}/>
        <p className="text-sm mt-1">2 out of 5 PDF uploaded</p>
        <p className="text-xs text-gray-400 mt-3">Upgrade to upload more PDF</p>
      </div>
    </div>
  )
}

export default Sidebar
