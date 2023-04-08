import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const App = () => {
  const [item, setItem] = useState("");
  const [edit, setEdit] = useState(0);
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (item && !edit) {
      setTodos([...todos, {id: Date.now().toString(), text: item}]);
      setItem("");
    } else if (item && edit) {
      const newTodos = todos.map(todo => {
        if (todo.id === edit) {
          return {...todo, text: item};
        }
        return todo;
      });
      setTodos(newTodos);
      setItem("");
      setEdit(0);
    }
  };

  const handleEdit = (id, text) => {
    setEdit(id);
    setItem(text);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="lightblue" />
      <Text style={mystyleSheet.header}>To do List</Text>
      <View style={mystyleSheet.inputTxt}>
      <TextInput
        mode="outlined"
        onChangeText={setItem}
        value={item}
        right={edit ? <TextInput.Icon icon="arrow-up-drop-circle-outline" /> : <TextInput.Icon icon="arrow-down-drop-circle-outline" />}
        label="Enter an Item"
        style={mystyleSheet.textField}
      />
      <View style={{justifyContent:"center", alignContent:"center", alignItems:"center"}}>
      <Button style={{padding:2,marginLeft:12,  backgroundColor: item ? "lightblue" : "lightgray"}} mode="contained" onPress={handleAdd}>{edit ? "Update" : "Add"}</Button>
      </View>
      </View>
      <View style={{marginTop: 20, width: "100%"}}>
      <ScrollView>
  {todos.map((todo, index) => (
    <View key={todo.id} style={{ alignSelf:"center", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%", padding: 10, borderColor: "lightgray", borderWidth: 2, marginTop: 8, borderRadius: 10 }}>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={mystyleSheet.setIndex}>{index + 1}</Text>
        <Text style={mystyleSheet.handleEdit} onPress={() => handleEdit(todo.id, todo.text)}>{todo.text}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(todo.id)}>
        <MaterialIcons name="delete" size={25} color="lightblue" />
      </TouchableOpacity>
    </View>
  ))}
</ScrollView>

</View>
</View>
);
};

const mystyleSheet = StyleSheet.create({
header: {
color: "white",
fontSize: 40,
backgroundColor: "lightblue",
textAlign: "center",
padding: 20,
fontWeight: "bold"
},

textField: {
width: "60%"
},

inputTxt:{
    justifyContent: "center", flexDirection: "row", width: "80%",
    alignSelf:'center', 
    marginTop:20
}, 
setIndex:{ fontSize: 15 ,padding:7, backgroundColor:"lightblue", color:"white"},
handleEdit:{ fontSize: 20, marginLeft: 10, maxWidth: "80%", width:"80%", alignSelf:"center" }



});

export default App;
