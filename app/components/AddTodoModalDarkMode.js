import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../assets/colors/colors';

const AddTodoModal = ({modalVisible, setModalVisible, addTodo}) => {
  const [todoText, onChangeTodoText] = useState('');
  const [typeText, onChangeTypeText] = useState('');
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>NEW TASK</Text>
              <View style={styles.inputSwrapper}>
                <SimpleLineIcons
                  name="note"
                  color={colors.blackText}
                  size={30}
                />
                <TextInput
                  style={styles.todoInput}
                  onChangeText={onChangeTodoText}
                  value={todoText}
                  placeholder="To do ..."
                  placeholderTextColor={colors.whiteText}
                  keyboardType="default"
                />
              </View>
              <View style={styles.inputSwrapper}>
                <TextInput
                  style={styles.typeInput}
                  onChangeText={onChangeTypeText}
                  value={typeText}
                  placeholder="Type"
                  placeholderTextColor={colors.whiteText}
                  keyboardType="default"
                />
                <SimpleLineIcons
                  name="directions"
                  color={colors.blackText}
                  size={30}
                  style={styles.typeInputIcon}
                />
              </View>
              <View style={styles.buttonSwrapper}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <SimpleLineIcons
                    name="close"
                    color={colors.whiteText}
                    size={30}
                  />
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonAdd]}
                  onPress={() => {
                    addTodo(todoText, typeText);
                    onChangeTodoText('');
                    onChangeTypeText('');
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textButton}>Add task</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddTodoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.dark,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: colors.whiteText,
    marginBottom: '20%',
  },
  inputSwrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 35,
    marginTop: 20,
  },
  todoInput: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: colors.whiteText,
    borderBottomColor: colors.borderLight,
    borderBottomWidth: 1,
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  typeInput: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: colors.whiteText,
    borderBottomColor: colors.borderLight,
    borderBottomWidth: 1,
    flex: 1,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  typeInputIcon: {
    marginRight: 40,
  },
  buttonSwrapper: {
    flexDirection: 'row',
    marginTop: '40%',
    marginBottom: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonClose: {
    width: 60,
    height: 60,
    backgroundColor: colors.dark,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAdd: {
    flex: 1,
    height: 60,
    backgroundColor: colors.whiteText,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  textButton: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.blackText,
  },
});
