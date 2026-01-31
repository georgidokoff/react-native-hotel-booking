import {
    View,
    Text,
    FlatList,
} from 'react-native';

import { styles } from './styles'

export default function HomeScreen({ navigation }) {
const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Hotel',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Hotel',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Hotel',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

    return (
            <View>
                {/* --- Header --- */}
                <View>
                    <Text>Header</Text>

                </View>
                {/* --- Welcome Text --- for authenticate user*/}
                <Text>Welcome</Text>
                {/* --- Categories --- */}
                <Text>Categories</Text>
                {/* --- Featured Card (Emeralda De Hotel) --- */}
                <Text>Fetured</Text>
                {/* --- Recently Booked Section --- */}
                <View>
                    <Text>Booked</Text>

                    <FlatList
                        data={data}
                        renderItem={({ item }) => <Item title={item.title} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
    );
}