import Dock from '@components/Dock/Dock'
import "@repo/ui/styles"
import CheckDevice from '@/components/CheckDevice'
import MenuBar from '@/components/Bar/MenuBar'
import Terminal from '@/components/Apps/Terminal'



function App() {
  const handleContext = (e: any) => {
    // e.preventDefault()
    console.log(e.target)
  }
  return (
    <main className=' h-screen pb-4' onContextMenu={handleContext}>
      <CheckDevice />
      <div className=' flex flex-col gap-2 items-center justify-between h-full'>
        <div className=' w-full'>
          <MenuBar />
        </div>
        <div className='flex-1'>
          <Terminal />
        </div>
        <div className=' justify-self-end'>
          <Dock />
        </div>
      </div>
    </main>
  )
}

export default App