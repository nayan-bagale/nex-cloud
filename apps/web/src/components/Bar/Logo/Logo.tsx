import useOutsideAlerter from "@/components/hooks/useOnclickOutside"
import { process } from "@/redux/features/apps/app/terminalSlice"
import { useAppDispatch } from "@/redux/hooks"
import { Button, MainDropDownMenu, MainMenuSeparator, SubDropDownMenu } from "@repo/ui"
import { Icons } from "@repo/ui/icons"
import { useRef, useState } from "react"

const Logo = () => {
    const [show, setShow] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch();

    useOutsideAlerter(ref, () => setShow(false));

    const apps = {
        terminal: () => (dispatch(process('on')), setShow(false)),
    }


    return (
        <>
            <Button className=" p-0 hover:bg-transparent hover:drop-shadow-[0px_0px_5px_#ffffff]"
                onClick={() => setShow(true)}
            >
                <Icons.Logo className=" h-7" />
            </Button>
            {show && (
                <MainDropDownMenu ref={ref} className=" left-3">
                    <Button size={'menu'}>
                        About CatOs
                    </Button>
                    <MainMenuSeparator />
                    <Button size={'menu'}>
                        MainDropDownMenu
                    </Button>
                    <SubDropDownMenu name="Recent.." >
                        <Button size={'menu'} onClick={apps.terminal} >
                            Terminal
                        </Button>
                        <MainMenuSeparator />
                        <Button size={'menu'}>
                            System Preference..
                        </Button>
                    </SubDropDownMenu>
                    <MainMenuSeparator />
                    <Button size={'menu'}>
                        System Preference..
                    </Button>
                </MainDropDownMenu>
            )}

        </>
    )
}

export default Logo