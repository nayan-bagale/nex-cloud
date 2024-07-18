import { Icons } from "@repo/ui/icons"
import { AnimatePresence, motion } from "framer-motion"
import { FC, forwardRef, ReactNode, useState } from "react"
import cn from "../utils"
import { Button } from "./button"

interface ContextMenuT {
    children?: ReactNode
    className?: string
    position?: { x: number, y: number }
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuT>(
    ({ children, className, position }, ref) => {

        return (
            <AnimatePresence>
                <motion.div className={cn(" z-10 absolute bg-gray-50 py-1 px-0.5 text-xs min-w-[10rem] gap-1 shadow-md flex flex-col rounded", className,
                )}
                    ref={ref}
                    style={{
                        x: position?.x,
                        y: position?.y
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        )
    })

export const ContextMenuSeparator = () => {
    return (
        <div className=" w-[calc(100%-1rem)] mx-auto border-b border-gray-400 " ></div>
    )
}

interface ContextMenuSubT {
    children: ReactNode
    name: string
    position?: 'left' | 'right' | 'bottom'
}

export const ContextMenuSub: FC<ContextMenuSubT> = ({
    children,
    name,
    position = 'left'
}) => {
    const [show, setShow] = useState(false);

    let pos = '';
    switch (position) {
        case 'left':
            pos = 'top-0 -right-[9.5rem]'
            break;
        case 'right':
            pos = ' top-0 -left-[9.5rem] '
            break;
        case 'bottom':
            pos = 'top-5'
            break;
    }

    return (
        <div className=" relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} >
            <Button size={'menu'} isActive={show} >
                <div>{name}</div>
                <Icons.Right_Arrow className=" h-4" />
            </Button>
            {show && (
                <AnimatePresence>
                    <motion.div className={cn(
                        "z-10 absolute  bg-gray-100 border py-1 px-0.5 text-xs min-w-[10rem] gap-1 shadow-md flex flex-col rounded",
                        pos
                    )}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    )
}

