import { UserButton } from '@clerk/nextjs'

const Header = () => {
  return (
    <div className='shadow-md flex justify-end p-2'>
        <UserButton />
    </div>
  )
}

export default Header
