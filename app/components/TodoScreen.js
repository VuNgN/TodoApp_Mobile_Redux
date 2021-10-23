import React, {useState, useEffect} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../assets/colors/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import getMonthString from '../config/getMonthString';
import AddTodoModal from './AddTodoModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoScreen = ({
  incomplete,
  completed,
  addTodo,
  completeTodo,
  removeTodo,
  updateTodo,
}) => {
  const [date, changeDate] = useState(new Date().getDate());
  const [month, changeMonth] = useState(getMonthString(new Date().getMonth()));
  const [year, changeYear] = useState(new Date().getFullYear());
  const [incompleteNum, changeIncompleteNum] = useState(incomplete.length);
  const [completedNum, changeCompletedNum] = useState(completed.length);
  const [modalVisible, setModalVisible] = useState(false);
  const isIncomplete = incomplete.length > 0;
  const isCompleted = completed.length > 0;
  const isIncompleteAndCompleted = isIncomplete || isCompleted;

  useEffect(() => {
    (async () => {
      try {
        const todosData = await AsyncStorage.getItem('todosData');
        updateTodo(JSON.parse(todosData));
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    changeDate(new Date().getDate());
    changeMonth(getMonthString(new Date().getMonth()));
    changeYear(new Date().getFullYear());
  }, [date, month, year]);

  useEffect(() => {
    changeIncompleteNum(incomplete.length);
    changeCompletedNum(completed.length);
  }, [incomplete.length, completed.length]);

  const onPressDoneBtn = id => {
    removeTodo(id);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        {/* ADD bottom button */}
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => setModalVisible(!modalVisible)}>
          <AntDesign name="plus" color={colors.light} size={30} />
        </TouchableOpacity>
        {/* Todo */}
        <View style={styles.header}>
          <Text style={styles.h1date}>
            {month} {date}, {year}
          </Text>
          <Text style={styles.todoInfo}>
            {incompleteNum} incomplete, {completedNum} completed
          </Text>
        </View>
        {isIncompleteAndCompleted ? (
          <ScrollView
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {isIncomplete && (
              <View style={styles.todoWrapper}>
                <Text style={styles.H2Title}>Incomplete</Text>
                {incomplete.map(todo => (
                  <Pressable
                    style={styles.incomplete}
                    key={todo.id}
                    onPress={() => completeTodo(todo.id)}>
                    <BouncyCheckbox
                      size={24}
                      fillColor={colors.light}
                      unfillColor={colors.light}
                      disableText
                      iconStyle={{
                        borderColor: colors.whiteText,
                        borderRadius: 6,
                        borderWidth: 2,
                      }}
                      isChecked={todo.isCompleted}
                      disableBuiltInState
                      onPress={() => completeTodo(todo.id)}
                    />
                    <View style={styles.incompleteContentWrapper}>
                      <Text style={styles.incompleteContent} numberOfLines={1}>
                        {todo.content}
                      </Text>
                      <Text style={styles.incompleteType} numberOfLines={1}>
                        {todo.type}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => onPressDoneBtn(todo.id)}
                      style={styles.doneButton}>
                      <Text style={styles.doneButtonText}>done</Text>
                    </Pressable>
                  </Pressable>
                ))}
              </View>
            )}
            {isCompleted && (
              <View style={styles.todoWrapper}>
                <Text style={styles.H2Title}>Completed</Text>
                {completed.map(todo => (
                  <Pressable
                    style={styles.completed}
                    key={todo.id}
                    onPress={() => completeTodo(todo.id)}>
                    <BouncyCheckbox
                      size={24}
                      fillColor={colors.whiteText}
                      unfillColor={colors.light}
                      disableText
                      iconStyle={{
                        borderColor: colors.whiteText,
                        borderRadius: 6,
                        borderWidth: 2,
                      }}
                      isChecked={todo.isCompleted}
                      disableBuiltInState
                      onPress={() => completeTodo(todo.id)}
                    />
                    <View style={styles.completedContentWrapper}>
                      <Text style={styles.completedContent} numberOfLines={2}>
                        {todo.content}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => onPressDoneBtn(todo.id)}
                      style={[
                        styles.doneButton,
                        {
                          borderColor: colors.buttonBorderColor,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.doneButtonText,
                          {
                            color: colors.buttonBackgroundColor,
                          },
                        ]}>
                        done
                      </Text>
                    </Pressable>
                  </Pressable>
                ))}
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={styles.emptyTodoSwrapper}>
            <Text style={styles.emptyTodoText}>“To-do list : to-do list!”</Text>
            <Text style={styles.emptyTodoTextDesc}>
              Click the '+' button to change your life.
            </Text>
          </View>
        )}
        <AddTodoModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          addTodo={addTodo}
        />
      </SafeAreaView>
      <StatusBar />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.light,
  },
  addButton: {
    backgroundColor: colors.buttonBackgroundColor,
    width: 56,
    height: 56,
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.buttonBorderColor,
    borderWidth: 2,
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginBottom: 40,
    marginRight: 15,
    zIndex: 10000,
  },
  header: {
    marginTop: 50,
    marginHorizontal: 20,
    paddingBottom: 16,
    borderBottomColor: colors.borderLight,
    borderBottomWidth: 2,
  },
  h1date: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: colors.titleText,
  },
  todoInfo: {
    marginTop: 8,
    fontSize: 14,
    color: colors.blackText,
    fontFamily: 'Inter-SemiBold',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  todoWrapper: {
    marginVertical: 16,
  },
  H2Title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.blackText,
  },
  incomplete: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'flex-start',
  },
  incompleteContentWrapper: {
    marginHorizontal: 16,
    flex: 1,
  },
  incompleteContent: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: colors.blackText,
    overflow: 'hidden',
  },
  incompleteType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.grayTextLight,
  },
  completed: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'flex-start',
  },
  completedContentWrapper: {
    marginHorizontal: 16,
    flex: 1,
  },
  completedContent: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: colors.grayTextLight,
  },
  doneButton: {
    alignSelf: 'flex-start',
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 46,
  },
  doneButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: colors.grayTextLight,
  },
  emptyTodoSwrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTodoText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.titleText,
  },
  emptyTodoTextDesc: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: colors.grayTextLight,
    marginTop: 5,
  },
});
