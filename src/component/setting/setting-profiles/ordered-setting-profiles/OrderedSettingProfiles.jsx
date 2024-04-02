import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { SettingProfile } from '../setting-profile/SettingProfile'
import { useProfiles, useSetProfiles } from '../../../../data/provider/jotai-provider'

export const OrderedSettingProfiles = () => {
    const profiles = useProfiles()
    const setProfiles = useSetProfiles()

    const onDragEnd = (result) => {
        if (!result.destination) {
            return
        }

        if (result.destination.index === result.source.index) {
            return
        }

        const orderedProfiles = reorder(
            profiles,
            result.source.index,
            result.destination.index
        )

        setProfiles(orderedProfiles)
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }

    const ProfileList = React.memo(function ({ profiles }) {
        return profiles.map((profile, index) => (
            <Draggable draggableId={ profile.id } index={ index }>
                { provided => (
                    <div ref={ provided.innerRef } { ...provided.draggableProps } { ...provided.dragHandleProps }>
                        <SettingProfile
                            key={ profile.id }
                            id={ profile.id }
                            index={ index }
                            profile={ profile }
                        />
                    </div>
                ) }
            </Draggable>
        ))
    })

    return (
        <DragDropContext onDragEnd={ onDragEnd }>
            <Droppable droppableId="list">
                { provided => (
                    <div ref={ provided.innerRef } { ...provided.droppableProps }>
                        <ProfileList profiles={ profiles }/>
                        { provided.placeholder }
                    </div>
                ) }
            </Droppable>
        </DragDropContext>
    )
}