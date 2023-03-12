import {useEffect, useState} from "react";
const PAGE_ITEM = 20;

const useInfiniteScroll = (pageIndex, data) => {
    const [newData, setNewData] = useState([]);

    useEffect(() => {
        if (data.length) {
            const currentPageItems = data?.slice(pageIndex * PAGE_ITEM, (pageIndex + 1) * PAGE_ITEM)
            if (newData.length) {
                setNewData([...newData, ...currentPageItems]);
            } else {
                setNewData(data.slice(0, PAGE_ITEM));
            }
        } else {
            setNewData([]);
        }
    }, [data, pageIndex]);

    return [newData];
};
export {useInfiniteScroll};
