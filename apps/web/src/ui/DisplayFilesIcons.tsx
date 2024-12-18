import useOnClickOutside from '@/components/hooks/useOnclickOutside';
import { FileT, FolderT } from '@/redux/features/explorer/explorerSlice';
import cn from '@/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useRef } from 'react';


interface DisplayFilesIconsT {
    children?: React.ReactNode;
    className?: string;
    item: FileT | FolderT;
    Icon: ({ className }: { className: string }) => JSX.Element;
    onClick?: () => void;
    onContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    view?: 'grid' | 'row';
    onDoubleClick?: () => void;
    rename: {
        editing: boolean;
        name: string;
        setEditing: React.Dispatch<React.SetStateAction<boolean>>;
        setName: React.Dispatch<React.SetStateAction<string>>;
    },
    saveNewNameToStore: () => void;
}


export const DisplayItemsIcons: FC<DisplayFilesIconsT> =
    ({ rename, item, Icon, onContextMenu, view = 'grid', onDoubleClick, saveNewNameToStore }) => {
        const [clicked, setClicked] = React.useState(false)

        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const iconRef = useRef<HTMLDivElement>(null);
        useOnClickOutside(iconRef, () => {
            rename.editing && saveNewNameToStore();
            rename.setEditing(false);
        })

        useEffect(() => {
            if (rename.editing) {
                textareaRef.current?.focus();
            }
        }, [rename.editing])

        useEffect(() => {
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        }, [rename.name]);

        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter') {
                rename.setEditing(false);
                saveNewNameToStore();
            }
        }

        return <>
            <AnimatePresence>
                {view === 'grid' &&
                    (<motion.div ref={iconRef} className={cn(' relative w-fit flex flex-col justify-center items-center p-1 rounded-md hover:bg-gray-400/40', clicked && 'bg-gray-400/10 border')}
                        id={item.id}
                        whileTap={{ scale: 0.9 }}
                        onContextMenu={onContextMenu}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        title={item.name}
                        onDoubleClick={onDoubleClick}
                    // onClick={() => setClicked(!clicked)}
                    >
                        <Icon className=" w-16" />
                        {rename.editing ? (
                            <textarea
                                ref={textareaRef}
                                rows={1}
                                className={cn(' resize-none w-14 p-0 text-[14px] text-center break-words min-h-1')}
                                value={rename.name}
                                onChange={(e) => rename.setName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        ) : (
                            <p className={cn('text-[14px] cursor-default text-center select-none ', clicked ? 'w-16 break-words ' : 'truncate h-7 w-[10ch] overflow-hidden')}>{rename.name}</p>
                        )}
                    </motion.div>)
                }
            </AnimatePresence>
            <AnimatePresence>
                {view === 'row' &&
                    (<motion.div className=' hover:bg-gray-400/40 text-xs relative w-full flex justify-start items-center p-1 gap-2 rounded-md'
                        id={item.id}
                        whileTap={{ scale: 0.95 }}
                        onContextMenu={onContextMenu}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        title={item.name}
                        onDoubleClick={onDoubleClick}
                    >
                        <Icon className=" w-6" />
                        <p className='cursor-default select-none text-center'>{item.name}</p>
                        {/* <div>{file.fileDetails.type}</div>
                    <div>{file.fileDetails.lastModified.split(' ').slice(1, 4).join()}</div>
                    <div>{file.fileDetails.size}</div> */}
                    </motion.div>)
                }
            </AnimatePresence>

        </>
    }
