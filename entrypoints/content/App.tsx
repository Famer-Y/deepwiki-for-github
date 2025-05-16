
import { useState, useRef, Fragment } from "react";

import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import Draggable, {
    type Position,
    defaultPosition
} from '@/components/dnd/draggable';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import logo from '@/assets/logo.png';

import { sendMessage } from '@/lib/utils';

import { storage } from '#imports';

export default function App() {

    const [isOpen, setIsOpen] = useState(false);

    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const [position, setPosition] = useState<Position>(defaultPosition);

    useEffect(() => {
        (async () => {
            const position = await storage.getItem('local:draggable-position') ?? defaultPosition;
            console.log(position);
            setPosition(position);
            setIsInitialized(true);
        })();
    }, [])

    return (
        <Fragment>
            {isInitialized &&
                <Fragment>
                    <Draggable
                        initPosition={position}
                        modifiers={[restrictToWindowEdges]}
                        onPositionChange={async (position) => {
                            console.log(position);
                            await storage.setItem('local:draggable-position', position);
                        }}
                        activationConstraint={{
                            distance: 5,
                        }}
                    >
                        <Card
                            className="w-8 h-8 rounded-full p-0 m-0 cursor-pointer"
                            onClick={async () => {
                                try {
                                    const isAlive = await sendMessage('sidePanel:isAlive', {});
                                    if (isAlive) {
                                        sendMessage('sidePanel:close', {});
                                    }
                                    return;
                                } catch (error) {
                                    
                                }
                                sendMessage('sidePanel:open', {});
                            }}
                        >
                            <CardContent className="p-0 m-0">
                                <img src={logo} alt="logo" className="w-8 h-8 rounded-full p-0 m-0" />
                            </CardContent>
                        </Card>

                    </Draggable>
                </Fragment>
            }
        </Fragment>
    );
}
