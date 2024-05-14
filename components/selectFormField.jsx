import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet } from 'react-native'

const SelectFormField = ({ title, selectedItem, handleSelect, error, touched, otherStyle, data }) => {
    return (
        <View style={otherStyle}>
            <Text style={styles.titleStyle}>{title}</Text>
            <SelectDropdown
                data={data}
                onSelect={(selectedItem, index) => {
                    handleSelect(selectedItem, index);
                }}
                defaultValueByIndex={selectedItem}
                buttonStyle={styles.dropdownButtonStyle}
                dropdownStyle={styles.dropdownMenuStyle} // Add this line
                renderButton={(selectedItem, isOpened) => (
                    <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.value) || 'Select'}
                        </Text>
                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                    </View>
                )}
                renderItem={(item, index, isSelected) => (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#414a4c' }) }}>
                        <Text style={styles.dropdownItemTxtStyle}>{item.value}</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={true}
                
            />
            {touched && error && (
                <Text style={styles.errorStyle}>{error}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    errorStyle: {
        color: "#F56565",
        fontSize: 14,
        marginTop: 8,
        marginLeft: 12

    },
    titleStyle: {
        color: '#e0e0e0',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        marginTop: 16
    },
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
        backgroundColor: '#424242',
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
