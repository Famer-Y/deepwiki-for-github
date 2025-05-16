import React, { useState, forwardRef, useCallback } from 'react';

import {
    DndContext,
    useDraggable,
    useSensor,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    PointerActivationConstraint,
    Modifiers,
    useSensors,
    useDndMonitor,
    type DraggableSyntheticListeners,
    type Active,
    type DragPendingEvent,
} from '@dnd-kit/core';
import {
    CSS,
    type Transform,
} from '@dnd-kit/utilities';
import { useWindowSize } from 'usehooks-ts';

export enum Axis {
    All,
    Vertical,
    Horizontal,
}

export const defaultPosition: Position = {
    top: window.innerHeight / 2,
    right: 0,
};

export interface Position {
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
}

interface DraggableProps {
    activationConstraint?: PointerActivationConstraint;
    axis?: Axis;
    modifiers?: Modifiers;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export default function Draggable({
    activationConstraint,
    axis,
    modifiers,
    style,
    children,
    initPosition,
    onPositionChange,
}: DraggableProps & { initPosition?: Position, onPositionChange?: (position: Position) => void }) {
    const [position, setPosition] = useState<Position>(initPosition || defaultPosition);
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint,
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint,
    });
    const keyboardSensor = useSensor(KeyboardSensor, {});
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
    const Item = DraggableItem;
    const { width: winWidth, height: winHeight } = useWindowSize({
        debounceDelay: 500
    });

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={({ active }: { active: Active }) => {
                const x = active.rect.current.translated?.left || 0;
                const y = active.rect.current.translated?.top || 0;

                const pos: Position = {};
                if (y > winHeight / 2) {
                    pos.bottom = winHeight - y - (active.rect.current.translated?.height || 0);
                } else {
                    pos.top = y;
                }
                if (x > winWidth / 2) {
                    pos.right = 0;
                } else {
                    pos.left = 0;
                }

                setPosition(pos);
                onPositionChange && onPositionChange(pos);
            }}
            modifiers={modifiers}
        >
            <Item
                axis={axis}
                position={position}
                style={style}
            >
                {children}
            </Item>
        </DndContext>
    );
}



export interface DraggableItemProps {
    style?: React.CSSProperties;
    axis?: Axis;
    position?: React.CSSProperties;
    children?: React.ReactNode;
}

function DraggableItem({
    axis,
    style,
    position,
    children,
}: DraggableItemProps) {
    const {
        attributes,
        isDragging,
        listeners,
        node,
        setNodeRef,
        transform,
    } = useDraggable({
        id: 'draggable',
    });

    const [isPending, setIsPending] = useState(false);

    const handlePending = useCallback((event: DragPendingEvent) => {
        setIsPending(true);
    }, [node]);

    const handlePendingEnd = useCallback(() => {
        setIsPending(false);
    }, []);

    useDndMonitor({
        onDragPending: handlePending,
        onDragAbort: handlePendingEnd,
        onDragCancel: handlePendingEnd,
        onDragEnd: handlePendingEnd,
    });

    return (
        <DraggableContent
            ref={setNodeRef}
            listeners={listeners}
            style={{ ...style, ...position }}
            transform={transform}
            axis={axis}
        >
            {children}
        </DraggableContent>
    );
}

interface DraggableContentProps {
    axis?: Axis;
    listeners?: DraggableSyntheticListeners;
    style?: React.CSSProperties;
    transform?: Transform | null;
    children?: React.ReactNode;
}

export const DraggableContent = forwardRef<HTMLDivElement, DraggableContentProps>(
    function DraggableContent(
        {
            axis,
            listeners,
            transform,
            style,
            ...props
        },
        ref
    ) {
        return (
            <div
                style={
                    {
                        position: "fixed",
                        ...style,
                        '--translate-x': `${transform?.x ?? 0}px`,
                        '--translate-y': `${transform?.y ?? 0}px`,
                        transform: CSS.Translate.toString(transform ?? null),
                    } as React.CSSProperties
                }
                ref={ref}
                {...listeners}
                {...props}
            >
                {props.children}
            </div>
        );
    }
);
