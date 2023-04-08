import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export function Main() {
    const [item, setItem] = useState("");
const [list, setList] = useState([]);
const [edit, setEdit] = useState(null);
const addItem = () => {
    setList([...list, { id: list.length, value: item }]);
    setItem('');  
};

const deleteItem = (id) => {
    setList(list.filter(item => item.id !== id));
};

const updateItem = (id, newItem) => {
    setEdit(id);
    setItem(newItem);
};

const handleUpdate = () => {
    const newList = [...list];
    const index = newList.findIndex(item => item.id === edit);
    newList[index].value = item;
    setList(newList);
    setItem('');
    setEdit(null);
};

return (

    <View style={{ backgroundColor: "white", flex: 1 }}>
        <StatusBar
            backgroundColor="thistle"
        />
        <Text style={mystyle.header}>To do List</Text>
        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", alignSelf: "center", width: "80%", marginTop: 20, marginBottom : 20}}>
            <TextInput
                mode='outlined'
                style={mystyle.input}
                label="Enter an item"
                outlineColor="thistle"
                activeOutlineColor="darkgray"
                textColor="gray"
                value={item}
                onChangeText={text => setItem(text)}
                right={<TextInput.Icon style={{ paddingTop: 5 }} icon="arrow-down-drop-circle-outline" />}
            >
            </TextInput>
            <View style={{ marginLeft: 15 }}>
                <Button mode='contained' buttonColor={item ? "thistle" : "lightgray"} style={{ paddingLeft: 5, paddingRight: 5 }} onPress={edit != null ? handleUpdate : addItem}>
                    <Text style={{ fontSize: 15 }}> {edit != null ? 'Update Item' : 'Add Item'}</Text>
                </Button>
            </View>

        </View>


        <ScrollView>
            {list.map(item => (
                <View key={item.id} style={mystyle.itemsList}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={mystyle.itemNo}>{item.id + 1}</Text>
                        <TouchableOpacity key={item.id} onPress={() => updateItem(item.id, item.value)}>
                            <Text key={item.id} style={{ color: 'grey', fontSize: 16,maxWidth:230, fontStyle:"italic"}}>
{item.value}
</Text>
</TouchableOpacity>
</View>
<TouchableOpacity onPress={() => deleteItem(item.id)}>
<MaterialIcons name="delete" size={25} color="thistle" style={{ padding:10}}/>
</TouchableOpacity>
</View>
))}</ScrollView>
    </View>

)

}

const mystyle = StyleSheet.create({ header: {
textAlign: "center",
color: "white",
fontSize: 30,
fontWeight: "bold",
padding: 25,
backgroundColor: "thistle"
},
input: {
    height: 40,
    width: "60%"
},

itemsList: {
    borderWidth: 0.7,
    borderColor: "gray",
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:"center",
    borderRadius: 5,
    justifyContent: 'space-between',
    width: "80%",
    padding:5,
    marginBottom:20, },

itemNo: {
    color: 'white',
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'thistle'
}
}
)
