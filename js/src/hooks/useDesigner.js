import { useContext } from 'react'
import { DesignerContext } from '@/context'

export const useDesigner = () => {
    const designer = useContext(DesignerContext);
    return designer;
}