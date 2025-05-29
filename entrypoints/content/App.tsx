import { useState, Fragment, useEffect } from "react";

import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import Draggable, {
    type Position,
    defaultPosition
} from '@/components/dnd/draggable';

import {
    Card,
    CardContent
} from "@/components/ui/card"

import logo from '@/assets/logo.png';

import { sendMessage } from '@/lib/utils';

import { storage } from '#imports';

export default function App() {

    const [isOpen, setIsOpen] = useState(false);

    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const [position, setPosition] = useState<Position>(defaultPosition);

    const [isHovered, setIsHovered] = useState(false);

    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        (async () => {
            const position = await storage.getItem('local:draggable-position') ?? defaultPosition;
            console.log(position);
            setPosition(position);
            setIsInitialized(true);
        })();
    }, [])

    const handleClick = async () => {
        try {
            const isAlive = await sendMessage('sidePanel:isAlive', {});
            if (isAlive) {
                await sendMessage('sidePanel:close', {});
                setIsOpen(false);
            } else {
                await sendMessage('sidePanel:open', {});
                setIsOpen(true);
            }
        } catch (error) {
            await sendMessage('sidePanel:open', {});
            setIsOpen(true);
        }
    };

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
                        <div className="relative group">
                            <Card
                                className={`
                                    w-12 h-12 cursor-pointer
                                    bg-white/90 dark:bg-gray-800/90
                                    border border-gray-200 dark:border-gray-700
                                    rounded-xl
                                    backdrop-blur-sm
                                    shadow-md shadow-black/5 dark:shadow-black/20
                                    transition-all duration-200 ease-out
                                    hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/30
                                    hover:scale-105
                                    active:scale-95
                                    ${isOpen 
                                        ? 'bg-emerald-50/90 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-600 shadow-emerald-200/20' 
                                        : ''
                                    }
                                `}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onMouseDown={() => setIsPressed(true)}
                                onMouseUp={() => setIsPressed(false)}
                                onClick={handleClick}
                            >
                                <CardContent className="p-0 w-full h-full flex items-center justify-center relative">
                                    <img 
                                        src={logo} 
                                        alt="DeepWiki" 
                                        className={`
                                            w-6 h-6 object-contain
                                            transition-transform duration-150 ease-out
                                            ${isPressed ? 'scale-90' : ''}
                                        `}
                                    />
                                    
                                    {/* 状态指示器 */}
                                    {isOpen && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border border-white dark:border-gray-800" />
                                    )}
                                </CardContent>
                            </Card>
                            
                            {/* 简洁工具提示 */}
                            <div className={`
                                absolute -top-10 left-1/2 transform -translate-x-1/2
                                px-2 py-1 bg-gray-900 dark:bg-gray-100 
                                text-white dark:text-gray-900 text-xs
                                rounded shadow-lg
                                transition-all duration-150 ease-out
                                pointer-events-none select-none whitespace-nowrap
                                ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
                            `}>
                                {isOpen ? 'Close' : 'Open'}
                            </div>
                        </div>
                    </Draggable>
                </Fragment>
            }
        </Fragment>
    );
}
