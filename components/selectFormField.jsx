import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet } from 'react-native'
const emojisWithIcons = [
    { key: 'MALE', value: 'Male' },
    { key: 'FEMALE', value: 'Female' },
    { key: 'OTHERS', value: 'Others' },
];

const SelectFormField = () => {
    return (
        <View>
            <SelectDropdown
                data={emojisWithIcons}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                }}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View style={styles.dropdownButtonStyle}>
                           
                            <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.value) || 'Select'}
                            </Text>
                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                        </View>
                    );
                }}
                renderItem={(item, index, isSelected) => {
                    return (
                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#414a4c' }) }}>
                            <Text style={styles.dropdownItemTxtStyle}>{item.value}</Text>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: 320,
        height: 55,
        backgroundColor: '#000',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#212121',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 14,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
        color: '#fff',
    },
    dropdownMenuStyle: {
        backgroundColor: '#343434',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
    },

});
export default SelectFormField
