import { createFileRoute } from '@tanstack/react-router'
import {motion} from "motion/react"

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='bg-red-400'>
    <motion.div
        animate = {{
            scale : 2,
            transition : {duration : 2}
        }}
        className='h-44 w-44 bg-orange-500'
    >
        alright
    </motion.div>

  </div>    
}
