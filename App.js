import {useFetch} from "./hooks/useFetch";
import {FlatList, View, Text, StyleSheet, SafeAreaView, TextInput} from "react-native";
import {useEffect, useState} from "react";
import {useInfiniteScroll} from "./hooks/useInfiniteScroll";
import {useDebounce} from "./hooks/useDebounce";

export default function App() {
    const [searchValue, setSearchValue] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const [debouncedSearchValue] = useDebounce(searchValue, 500);
    const [data, loading, error] = useFetch(debouncedSearchValue);
    const [newData] = useInfiniteScroll(pageIndex, data);

    const Item = ({title}) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )

    return (<SafeAreaView style={styles.container}>
        {loading ? <View style={styles.center}>
            <Text>Loading..</Text>
        </View> : null}
        {error ? <View style={styles.center}>
            <Text style={styles.error}>{error}</Text>
        </View>: null}
        <>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Search ..."
                    style={styles.input}
                    onChangeText={setSearchValue}
                />
            </View>
            {
                (!loading && !error && data.length) ? (<FlatList
                    data={newData}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        return (<Item title={item.title} key={item.id} />)
                    }}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (data.length !== newData.length) {
                            setPageIndex(pageIndex + 1)
                        }
                    }}
                />) : <View style={styles.center}>
                    <Text style={styles.text}>There are no datas</Text>
                </View>
            }
        </>
    </SafeAreaView>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    },
    center: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    error: {
        fontSize: 25,
        color: "red"
    },
    item: {
        padding: 20,
        backgroundColor: '#f9c2ff',
        marginBottom: 10,
    },
    text: {
        fontSize: 20
    },
    inputContainer: {
        padding: 10,
        marginBottom: 10,
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderBottomColor: "#8C8F94"
    }
})
