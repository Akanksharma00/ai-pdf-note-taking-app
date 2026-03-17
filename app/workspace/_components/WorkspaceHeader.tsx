import { UserButton } from "@clerk/nextjs"
import Image from "next/image"

const WorkspaceHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b shadow-md">
        <Image 
            src='/logo.svg'
            alt='Logo'
            width={140}
            height={100}
        />
        <UserButton />
    </div>
  )
}

export default WorkspaceHeader
