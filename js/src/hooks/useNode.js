import { useRef, useEffect } from "react"
import { useDesigner, useUpdate } from '@/hooks'

export const useNode = (id) => {
    const designer = useDesigner();
    const node = useRef();
    const update = useUpdate();

    useEffect(() => {
        node.current = designer.findNodeById(id)

        designer.selected(node.current.id);
        update();

        return () => {
            designer.clear(node.current.id);
        }
    }, []);

    return node.current && designer.findNodeById(node.current.id);
}