import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {Names} from '../names/names';
const {height, width} = Dimensions.get('window');

const Main_Screen = () => {
  const [expandedSections, setexpandedSections] = useState({});
  const [gender, setgender] = useState(true);
  const [boycolor, setboycolor] = useState(true);
  const [girlcolor, setgirlcolor] = useState(false);
  const boy_button = () => {
    setboycolor(true);
    setgirlcolor(false);
    setgender(true); 
    setexpandedSections({}); // optional: collapse all sections on switch
  };

  const girl_button = () => {
    setgirlcolor(true);
    setboycolor(false);
    setgender(false);
    setexpandedSections({});
  };
  const getflatdata = () => {
    const flatData = [];

    {
      gender
        ? Object.entries(Names.boys).forEach(([letter, names]) => {
            flatData.push({type: 'header', letter});

            if (expandedSections[letter]) {
              names.forEach(namesobj => {
                flatData.push({type: 'item', ...namesobj, letter});
              });
            }
          })
        : Object.entries(Names.girls).forEach(([letter, names]) => {
            flatData.push({type: 'header', letter});

            if (expandedSections[letter]) {
              names.forEach(namesobj => {
                flatData.push({type: 'item', ...namesobj, letter});
              });
            }
          });
    }

    return flatData;
  };

  const toggleSection = letter => {
    setexpandedSections(prev => ({
      [letter]: !prev[letter],
    }));
  };

  const renderItem = ({item}) => {
    if (item.type === 'header') {
      return (
        <TouchableOpacity
          style={styles.button_flatlist_content_view}
          onPress={() => toggleSection(item.letter)}>
          <Text style={styles.button_flatlist_content}>{item.letter}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.flatlist_container}>
        <Text style={styles.flatlist_content}>{item.name}</Text>
        <Text style={styles.flatlist_content}>{item.meaning}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* Content Holder */}
      <View style={styles.contents_container}>
        {/* Welcome */}
        <Text style={styles.welcome_text}>Welcome Back</Text>
        {/* Select Gender */}
        <Text style={styles.gender_decide_text}>Select Gender</Text>
        {/* Gender Button  */}
        <View style={styles.gender_box}>
          <TouchableOpacity
            style={[
              styles.Boy_Button,
              {backgroundColor: boycolor ? '#b3dce6' : '#fff'},
            ]}
            onPress={boy_button}>
            <Text style={styles.Boy_Button_text}>Boy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.Girl_Button,
              {backgroundColor: girlcolor ? 'pink' : '#fff'},
            ]}
            onPress={girl_button}>
            <Text style={styles.Girl_Button_text}>Girl</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={getflatdata()}
          keyExtractor={(item, index) =>
            item.type === 'header' ? `header-${item.letter}` : `${item.name}-${index}`
          }
          renderItem={renderItem}
          style={styles.flatlist}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  contents_container: {
    flex: 1,
    marginTop: height * 0.05,
    marginHorizontal: width * 0.03,
  },
  welcome_text: {
    color: '#fff',
    fontSize: 24,
  },
  gender_decide_text: {
    color: 'lightgray',
    marginTop: height * 0.04,
    marginBottom: 6,
  },
  gender_box: {
    height: height * 0.08,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: '7%',
  },
  Boy_Button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  Boy_Button_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a5d8f',
  },
  Girl_Button: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
    height: 'auto',
    width: '50%',
  },
  Girl_Button_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D186BA',
  },
  flatlist: {
    marginBottom: 3,
  },
  flatlist_container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#b3dce6',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#000',
  },
  flatlist_content: {
    color: '#2a5d8f',
    padding: 2,
  },
  button_flatlist_content_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#000',
  },
  button_flatlist_content: {
    color: '#000',
    padding: 1,
  },
});
export default Main_Screen;
