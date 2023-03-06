// import { useAtom } from "jotai";
import { atomWithStore } from "jotai/zustand";
import create from 'zustand/vanilla';

const store = create(() => ({ count: 0 }));
export const stateAtom = atomWithStore(store);

function StoreItemCartUser({item = []}) {
    // const [state, setState] = useAtom(stateAtom)
    
}

export default StoreItemCartUser;