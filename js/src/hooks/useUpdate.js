import { useState } from "react"

export const useUpdate = () => {
    const [_, setInit] = useState(false);

    return () => {
        setInit(true);
    }
}