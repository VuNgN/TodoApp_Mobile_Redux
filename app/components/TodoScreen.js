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

const TodoScreen = ({
  incomplete,
  completed,
  addTodo,
  completeTodo,
  removeTodo,
}) => {
  const [date, changeDate] = useState(new Date().getDate());
  const [month, changeMonth] = useState(getMonthString(new Date().getMonth()));
  const [year, changeYear] = useState(new Date().getFullYear());
  const [incompleteNum, changeIncompleteNum] = useState(incomplete.length);
  const [completedNum, changeCompletedNum] = useState(completed.length);
  const [modalVisible, setModalVisible] = useState(false);

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
        <ScrollView style={styles.scrollView}>
          <View style={styles.todoWrapper}>
            <Text style={styles.H2Title}>Incomplete</Text>
            {incomplete.map(todo => (
              <View style={styles.incomplete} key={todo.id}>
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
                  <Text style={styles.incompleteContent}>{todo.content}</Text>
                  <Text style={styles.incompleteType}>{todo.type}</Text>
                </View>
                <Pressable
                  onPress={() => onPressDoneBtn(todo.id)}
                  style={styles.doneButton}>
                  <Text style={styles.doneButtonText}>done</Text>
                </Pressable>
              </View>
            ))}
          </View>
          <View style={styles.todoWrapper}>
            <Text style={styles.H2Title}>Completed</Text>
            {completed.map(todo => (
              <View style={styles.completed} key={todo.id}>
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
                  <Text style={styles.completedContent}>{todo.content}</Text>
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
              </View>
            ))}
          </View>
        </ScrollView>
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
    marginTop: 70,
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
    marginLeft: 16,
  },
  incompleteContent: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: colors.blackText,
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
    marginLeft: 16,
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
});
